/**
 * test search film from wikipedia.
 */

const wiki = require('./client');

// we will execute the script by using nvm, for example:
// $ nvm run node search-film.js crisis
const rawParams = process.argv.slice(2);
//console.log(rawParams);
if( rawParams.length < 1 ) {

    console.log("Need 1 parameters: film_title");
    console.log("For Example:");
    console.log("node search-film.js 'Ava'");
    console.log("=======================================================");

    process.exit()
}

// query in sequence.
//testSearch(rawParams[0]);
// query in parallel
testSearchAll( rawParams[0] );

/**
 * this test function will do exactly the same work as the following
 * function, except it is using Promise.all to run all query in parallel.
 */
async function testSearchAll( filmTitle ) {

    const [poster, excerpt] = await Promise.all([
        wiki.filmPoster( filmTitle ),
        wiki.filmExcerpt( filmTitle )
    ]);

    console.log(`Poster: ${poster}`);
    console.log("=======");
    console.log(`Excerpt: ${excerpt[0]}`);
    console.log("=======");
    console.log(`Article: ${excerpt[1]}`);
}

/**
 * quick test to get the poster, excerpt and article url for the
 * given file title.
 */
async function testSearch( filmTitle ) {

    let poster = await wiki.filmPoster( filmTitle );
    let excerpt = await wiki.filmExcerpt( filmTitle );

    console.log(`Poster: ${poster}`);
    console.log("=======");
    console.log(`Excerpt: ${excerpt[0]}`);
    console.log("=======");
    console.log(`Article: ${excerpt[1]}`);
}
