const wiki = require('gotmw');

let wikipedia = {

    // the default site will be wikipedia.org.
    client: new wiki(),

    /**
     * get the poster for the given film title.
     */
    filmPoster: async function(filmTitle) {

        try {

            var res = await this.client.opensearch( tweakTitle(filmTitle) );
            //console.log(res);
            //console.log(res[1]);

            // try to find article title from the search results.
            const articleTitle = extractTitle( res, tweakTitle(filmTitle) );
            // query all images for the article title.
            const articleImgs = await this.client.articleImages( articleTitle.title );
            //console.log(articleImgs);

            // get the image title.
            // get all image titles in an array:
            const imgTitle = extractPoster( articleImgs.map( img => img.title ),
                                            articleTitle.title );

            // get the image URL.
            const imgInfo = await this.client.imageInfo( imgTitle );
            //console.log(imgInfo);

            return imgInfo[0].url;
        } catch( error ) {
            console.log( error );
            return null;
        }
    },

    /**
     * get the excerpt for the given film title.
     */
    filmExcerpt: async function(filmTitle) {
        try {

            var res = await this.client.opensearch( tweakTitle(filmTitle) );
            //console.log(res);
            //console.log(res[1]);

            // try to find article title from the search results.
            const articleTitle = extractTitle( res, tweakTitle(filmTitle) );

            // get the article excerpt.
            const excerpt = await this.client.articleExcerpt( articleTitle.title );
            //console.log(excerpt);

            return [excerpt, articleTitle.titleUrl];
        } catch( error ) {
            console.log( error );
            return null;
        }
    }
}

module.exports = wikipedia;

/**
 * tweak title.
 */
function tweakTitle(givenTitle) {

    //console.log(channel);
    // remove the PPV.
    let title = givenTitle.split(" - ")[1];

    // remove the (ES)
    if( title.endsWith("(ES)") ) {
        title = title.slice(0, -5);
        console.log("tweakTitle: ", title);
    }

    // special case for Ava.
    if( title == 'Ava' ) {
        title = "Ava 2020 film";
    } else if( title == "One Night in Miami" ) {
        // special case for One Night in Miami
        title = title + "...";
    } else if( title.includes(":") ) {
        // handle the colon :
        // for cases: Honey Boy: un niC1o encantador
        title = title.split(":")[0];
    }

    return title;
}

/**
 * extract the title article ttile from the given wiki opensearch results.
 */
function extractTitle(results, queryStr) {

    let title = '';
    if( results[1].length == 1 ) {
        // there is only one result.
        title = results[1][0];
    } else {
        // set the search pattern.
        const filmPattern = new RegExp('20\\d{2} film');
        // filter by film, f(ilm)Titles
        let fTitles = results[1].filter( t => filmPattern.test(t) );
        //console.log(fTitles);
        if( fTitles.length == 1 ) {
            title = fTitles[0]
        } else {
            title = results[1].find( t => t.includes( 'film' ) );
        }
    }
    // case: Godmothered
    // this should have less priority
    //console.log("extractTitle, queryStr:", queryStr);
    // TODO: We have use !title here, as the title is undefined here for some reason.
    // the following are not working:
    // - title === ''
    // - title.length < 1
    if( !title && results[1].includes(queryStr) ) {
        // there is a exact match in the result.
        title = queryStr;
    }
    //console.log("extractTitle, title:", title);

    const index = results[1].indexOf(title);
    const titleUrl = results[3][index];

    return {
        title: title,
        titleUrl: titleUrl
    }
}

/**
 * extract the image from the given article images.
 */
function extractPoster(imgTitles, articleTitle) {

    // if there is only one result.
    if( imgTitles.length == 1 ) {
        return imgTitles[0];
    }

    // remove all svg images.
    const nosvgs = imgTitles.filter( img => !img.endsWith("svg") );
    // if only one image left, we will return it.
    if( nosvgs.length == 1 ) {

        return nosvgs[0];
    }

    // TODO: find the img title which is the most close match to article title.
    // Try to find the first poster image.
    let poster = nosvgs.find( item => item.includes("poster") );
    if( !poster ) {

        // no poster find.
        // try to find the file match the article title.
        poster = nosvgs.find( item => item.includes(articleTitle) );

        if( !poster ) {
            poster = nosvgs[0];
        }
    }

    return poster;
}
