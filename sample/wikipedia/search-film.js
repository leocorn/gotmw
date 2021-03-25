/**
 * test search film from wikipedia.
 */

const wiki = require('./client');

// we will execute the script by using nvm, for example:
// $ nvm run node search-film.js crisis
const rawParams = process.argv.slice(2);
console.log(rawParams);
if( rawParams.length < 1 ) {

    console.log("Need 1 parameters: film_title");
    console.log("For Example:");
    console.log("node search-film.js 'prefix - crisis'");
    console.log("=======================================================");

    process.exit()
}

testSearch(rawParams[0]);

async function testSearch(filmTitle) {

    let poster = await wiki.filmPoster( filmTitle );
    let excerpt = await wiki.filmExcerpt( filmTitle );

    console.log(`Poster: ${poster}`);
    console.log("=======");
    console.log(`Excerpt: ${excerpt[0]}`);
    console.log("=======");
    console.log(`Article: ${excerpt[1]}`);
}
