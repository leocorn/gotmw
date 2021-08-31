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
                    "settings - show current API settings",
                    "action - perform the MediaWiki API query action",
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
            case "settings":
                console.log("Show the current wiki API settings:");
                break;
            case "action":
                console.log("Start to perform action");
                await handleApiAction();
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
 * the main function to process api actions.
 */
async function handleApiAction() {

    // set the prompt schema.
    const schema = require('./../schema/wikipedia-actions.js');

    let userInput = await prompt.get( schema );
    while( userInput.params != "b" ) {

        console.table(userInput);

        // parse the params from user input.
        let request = {};
        //console.table( userInput.params.split(" ") );
        userInput.params.split(" ").forEach( param => {
            // split the first as the name.
            const name = param.split("=", 1)[0];
            const value = param.split(name + "=")[1];
            request[name] = value;
        } );

        // force the return format to json
        request.format = 'json';
        //console.table(request);
        console.dir(request);

        // send request and process response.
        await showResult( wikipediaApi, request);

        userInput = await prompt.get( schema );
    }
}

/**
 * utility function to show the action result.
 */
async function showResult( url, params ) {

    const data = await wikipedia.doAction( url, params );
    console.log("Wiki action API result:");
    console.log(JSON.stringify(data, null, 2));
    //console.dir(data);
}
