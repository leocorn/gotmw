/**
 * This is the interactive command line utility to access en.wikipedia.org.
 * It is using the yargs (https://github.com/yargs/yargs) for
 * parsing arguments from command line.
 *
 * Some samples:
 *
 * Get all categories for the wiki page "UEFA Euro 2020".
 * - node wikipedia-cli.js -a query -p categories --titles 'UEFA Euro 2020'
 *
 * Return the parsed html text and original wiki text for a give page.
 * - node sample/wikipedia/wikipedia-cli.js -a parse -p "text|wikitext" --page "UEFA Euro 2020"
 */

const yargs = require('yargs');

const wikipedia = require('../../src/api');

// this will be the default wiki site url.
const mediawikiApi = "https://www.mediawiki.org/w/api.php";
const wikipediaApi= "https://en.wikipedia.org/w/api.php";

/**
 * in general, the following are basic rules.
 *  - both '-' and '--' are allowed to set the options for the command line.
 *  - '-a' will only allow on character.
 *  - '--action' will allow multiple characters, word.
 */

// using the option function to append help description to usage message.
const options = yargs
    // set the help message.
    .usage("Usage: -a <action>")
    .option("u", {
        alias: "url",
        describe: `The wiki site action api url, the default value is ${mediawikiApi}`, type: "string",
        demaindOption: true
    })
    // append the help message for the action option.
    .option("a", {
        alias: "action",
        describe: "MediaWiki API action name", type: "string",
        // set action option to be required.
        demandOption: true
    })
    // append the help message for the action prop option.
    .option("p", {
        alias: "prop",
        describe: "MediaWiki API action properties. Multiple values allowed, separated with '|'.", type: "string",
        demandOption: false 
    })
    // the titles option.
    .option("titles", {
        describe: "A list of titles for action query, separated with '|'.",
        type: "string",
        demandOption: false
    })
    // the page option.
    .option("page", {
        describe: "The page title for parse action.",
        type: "string",
        demandOption: false
    })
    // set default values.
    .default( {
        // The values of prop are all different for differnt actions,
        // So it is better not set default value here!
        //prop: 'info'
        // set the default API url to mediawiki action API.
        url: wikipediaApi
    } )
    .argv;

// sample code to show how to access options.
//const greeting = `Action: ${options.action}, ${options.prop}!`;
// access 
//console.log(greeting);

// The options varilable will have all options (following th general rules)
// and the commands.
// try execute the following to see the result:
//  - nvm run node wikipedia-cli.js -a query -p abc --abcd abcd title
console.log("Command line parameters:");
console.dir(options);
const params = buildParams( options );
console.log("Wiki action API query parameters:");
console.dir(params);

showResult( options.url, params );

/**
 * utility function to show the action result.
 */
async function showResult( url, params ) {

    const data = await wikipedia.doAction( url, params );
    console.log("Wiki action API result:");
    console.log(JSON.stringify(data, null, 2));
}

/**
 * utility function to build the query parameters from the given yargs options.
 */
function buildParams( opts ) {

    let ps = {
        action: opts.action,
        format: opts.format ? options.format : 'json'
    };

    switch( opts.action ) {
        case 'query':
            ps.prop = opts.prop;
            ps.titles = opts.titles;
            break;
        case 'parse':
            // using the default values from the mediawiki API
            // text|langlinks|categories|links|templates|images|externallinks|sections|revid|displaytitle|iwlinks|properties|parsewarnings
            // Here are some properties (prop):
            // - text: return the parsed text (html format) of the wiki text.
            // - wikitext: return the original wikitext
            ps.prop = opts.prop ? opts.prop : 'text|langlinks|categories|links|templates|images|externallinks|sections|revid|displaytitle|iwlinks|properties|parsewarnings';
            ps.page = opts.page;
            break;
    }

    return ps;
}
