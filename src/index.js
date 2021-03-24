'use strict';

/**
 * Some utility function to access a public wiki.
 * The most popular one will be wikipedia: https://en.wikipedia.org
 */

const axios = require('axios')
const querystring = require('querystring')

let wiki = function wiki(options) {

    let opts = options || {};

    this.baseUrl = opts.baseUrl || 'https://en.wikipedia.org';

    this.api = this.baseUrl + "/w/api.php";
};

module.exports = wiki;

/**
 * details:
 * - API:Opensearch https://www.mediawiki.org/wiki/API:Opensearch
 */
wiki.prototype.opensearch = async function(queryTerm) {

    let params = {
        action: 'opensearch',
        search: queryTerm,
        // set the redirects to resolve to return the target page,
        // example:
        // - node wiki/a-test-opensearch.js https://en.wikipedia.org "The Buddy Games"
        redirects: "resolve",
        format: 'json'
    };

    const query = this.api + "?" + querystring.encode(params);
    //console.log("wikir.opensearch:", query);
    const res = await axios.get(query);

    return res.data;
};

/**
 * Details on page:
 * - https://www.mediawiki.org/wiki/API:Images
 */
wiki.prototype.articleImages = async function(articleTitle) {

    var params = {
        action: "query",
        prop: "images",
        titles: articleTitle,
        format: "json"
    };

    let query = this.api + "?" + querystring.encode(params);
    //console.log(query);
    const res = await axios.get(query);
    //console.log(JSON.stringify(res.data, null, '  '));

    return Object.values(res.data.query.pages)[0].images;
    //    imageinfo(imgs[0].title)
};

/**
 * get image info.
 * details: https://www.mediawiki.org/wiki/API:Imageinfo
 */
wiki.prototype.imageInfo = async function(imgTitle) {

    var params = {
        action: "query",
        prop: "imageinfo",
        titles: imgTitle,
        iiprop: "url",
        //iiurlwidth: "150",
        format: "json"
    };

    const query = this.api + "?" + querystring.encode(params);
    //console.log(query);
    const res = await axios.get(query)
    // show the full data.
    //console.log(JSON.stringify(res.data, null, '  '));
    return Object.values(res.data.query.pages)[0].imageinfo;
    //console.log("Poster: ", infos[0].url);
};

/**
 * return the article excerpt.
 * details:
 * - https://en.wikipedia.org/w/api.php?action=help&modules=query%2Bextracts
 */
wiki.prototype.articleExcerpt = async function(articleTitle) {

    var params = {
        action: "query",
        prop: "extracts",
        titles: articleTitle,
        exsentences: 2,
        explaintext: true,
        format: "json"
    };

    const query = this.api + "?" + querystring.encode(params);
    console.log(query);
    const res = await axios.get(query)
    // show the full data.
    //console.log(JSON.stringify(res.data, null, '  '));
    return Object.values(res.data.query.pages)[0].extract;
};
