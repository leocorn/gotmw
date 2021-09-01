/**
 * The interactive command line client to access en.wikipedia.org.
 * It is using the prompt (https://github.com/flatiron/prompt) package to
 * provide the capability to talk to end users.
 */

const prompt = require('prompt');

//const wikipedia = require('../../src/api');
const wikipedia = require('./../src/index.js');

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
                    "config { } - setup API settings",
                    "login - login to a private wiki",
                    "action { } - perform the MediaWiki API query action",
                    "q - quit",
                    "",
                ].join('\n'),
            },
        },
    };

    let userInput = await prompt.get( schema );
    while( userInput.action != "q" ) {

        // show user's input.
        //console.table(userInput);
        if( userInput.action.startsWith("config") ) {
            userInput.value = userInput.action.split("config ")[1];
            userInput.action = "config";
        } else if( userInput.action.startsWith("action") ) {
            userInput.value = userInput.action.split("action ")[1];
            userInput.action = "action";
        }

        switch( userInput.action ) {
            case "config":
                console.log("Setup wiki API settings");
                // set new properties
                wikipedia.setWikiOptions( JSON.parse( userInput.value ) );
                // show all settings.
                console.dir(wikipedia.getWikiOptions());
                break;
            case "settings":
                console.log("Show the current wiki API settings:");
                console.dir(wikipedia.getWikiOptions());
                break;
            case "action":
                console.log("Start to perform action");
                await handleApiAction( JSON.parse(userInput.value) );
                break;
            case "login":
                console.log("Log into a private wiki site");
                await wikipedia.login();
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
async function handleApiAction(actionParams) {

    // force the return format to json
    actionParams.format = 'json';
    //console.table(request);
    console.dir(actionParams);

    // send request and process response.
    await showResult( actionParams );
}

/**
 * utility function to show the action result.
 */
async function showResult( params ) {

    const data = await wikipedia.apiCall( params );
    console.log("Wiki action API result:");
    console.log(JSON.stringify(data, null, 2));
    //console.dir(data);
}
