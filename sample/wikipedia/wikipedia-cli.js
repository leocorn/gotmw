/**
 * This is the interactive command line utility to access wikipedia.org.
 * It is using the yargs (https://github.com/yargs/yargs) for
 * parsing arguments from command line.
 *
 * Some samples:
 *
 * Get all categories for the wiki page API:Main page.
 * - node wikipedia-cli.js -a query -p categories --titles 'API:Mmain page'
 */

const yargs = require('yargs');

const wikipedia = require('../../src/api');

const mediawikiApi = "https://www.mediawiki.org/w/api.php";

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
    // set default values.
    .default( {
        prop: 'info'
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
console.dir(options);
const params = buildParams( options );
console.dir(params);

showResult( mediawikiApi, params );

/**
 * utility function to show the action result.
 */
async function showResult( url, params ) {

    const data = await wikipedia.doAction( url, params );
    console.log(JSON.stringify(data, null, 2));
}

/**
 * utility function to build the query parameters from the given yargs options.
 */
function buildParams( opts ) {

    return {
        action: opts.action,
        prop: opts.prop,
        titles: opts.titles,
        format: opts.format ? options.format : 'json'
    };
}

