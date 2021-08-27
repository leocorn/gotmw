/**
 * The interactive command line client to access en.wikipedia.org.
 * It is using the prompt (https://github.com/flatiron/prompt) package to
 * provide the capability to talk to end users.
 */

const prompt = require('prompt');

const wikipedia = require('../../src/api');

// the API url for wikipedia site.
const wikipediaApi= "https://en.wikipedia.org/w/api.php";
// all API url for mediawiki site.
// We could find the meidawiki API documentation from here.
const mediawikiApi = "https://www.mediawiki.org/w/api.php";

// All binary files for wikipedia.org is stored on site commons.wikimedia.org
// Sometime, we will use this for testing.
//const wikipediaApi= "https://commons.wikimedia.org/w/api.php";

async function main() {

    // preparing the prompt message for end user to get started.
    const msgStart = [
        "",
        "Welcome to Wikipedia API Smart Agent",
        "====================================",
        "Please choose the following option to get started:",
        "s - show current API settings",
        "a - set the MediaWiki API action",
        "q - quit",
        "",
    ].join('\n');

    let userInput = await prompt.get( [msgStart] );
    //console.log(userInput);
    while( userInput[msgStart] != "q" ) {

        switch( userInput[msgStart] ) {
            case "s":
                console.log("Show the current wiki API settings:");
                break;
            case "a":
                console.log("Start to perform action");
                break;
            default:
                console.log("Not Supported option:", userInput[msgStart]);
                break;
        }

        userInput = await prompt.get( [msgStart] );
    }
}

// 
main().catch( e => {
    console.error(e);
    throw e;
} );

