'use strict';

const mwclient = require('../../src/index');

// we will execute the script by using nvm, for example:
// $ nvm run node test-login-got.js
const rawParams = process.argv.slice(2);
console.log(rawParams);

mwclient.setWikiOptions( {
    apiUrl: "https://" + rawParams[0] + "/w/api.php",
    username: rawParams[1],
    password: rawParams[2]
} );

mwclient.login();
