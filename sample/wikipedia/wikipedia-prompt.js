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
    const schema = {
        properties: {
            action: {
                description: [
                    "",
                    "Welcome to Wikipedia API Smart Agent",
                    "====================================",
                    "Please choose the following option to get started:",
                    "settings",
                    "s - show current API settings",
                    "qp",
                    "query prop - perform the MediaWiki API query action",
                    "q - quit",
                    "",
                ].join('\n'),
            },
        },
    };

    let userInput = await prompt.get( schema );
    while( userInput.action != "q" ) {

        console.table(userInput);
        switch( userInput.action ) {
            case "s":
            case "settings":
                console.log("Show the current wiki API settings:");
                break;
            case "query prop":
            case "qp":
                console.log("Start to perform query action");
                await handleQueryProp();
                break;
            default:
                console.log("");
                console.log("Not Supported option:", userInput.action);
                console.log("");
                break;
        }

        userInput = await prompt.get( schema );
    }
}

// 
main().catch( e => {
    console.error(e);
    throw e;
} );

/**
 * the function to hadle query prop action.
 */
async function handleQueryProp() {

    // set up the query action schema.
    const schema = {
        properties: {
            //titles: {
            //    description: [
            //        "A list of titles to work on",
            //        "Separate values with |",
            //    ].join('\n'),
            //},
            prop: {
                description: [
                    "Set which properties to query, using '|' to separate",
                    "For example: categories, images, imageinfo, extracts",
                    "back - go back to action selection",
                ].join("\n"),
                required: true,
            },
        },
    };

    let userInput = await prompt.get( schema );
    console.table(userInput);
    while( userInput.prop != 'back' ) {
        switch( userInput.prop ) {
            case "imageinfo":
                // handle query prop=imageinfo
                await handleQueryPropImageinfo();
                break;
            default:
                console.log("");
                console.log("Not Supported prop:", userInput.prop);
                console.log("");
                break;
        }
        userInput = await prompt.get( schema );
    }

    return userInput;
}

/**
 * the function to handle query prop imageinfo action.
 */
async function handleQueryPropImageinfo() {

    // set up the query action schema for prop=imageinfo
    const schema = require('./../schema/query-prop-imageinfo.js');

    let userInput = await prompt.get( schema );
    console.table(userInput);
    return userInput;
}
