/**
 * configuration file for wiki-agent to access a wiki site.
 * This is a example to show all options to access any wiki site.
 */

const config = {

    // wiki options 
    wikiOptions: {
        apiUrl: 'https://en.wikipedia.org/w/api.php',
        privateWiki: false,
        // get username and password from
        // page Special:BotPasswords of your wiki site.
        username: '',
        password: ''
    },

    // full path to the action samples json file.
    actionExamples: '~/gotmw/sample/action-examples.json',
};

module.exports = config;
