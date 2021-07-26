'use strict';

const querystring = require('querystring');
const got = require('got');
const toughCookie = require('tough-cookie');

// set up a Got instance with cookie jar, using the default MemoryCookieStore
// Got will handle all cookie related work.
const cookieJar = new toughCookie.CookieJar();
const gotInstance = got.extend( {
    cookieJar
} );

// define the wiki options.
const wikiOptions = {

    /**
     * the api URL for your wiki site.
     * You could check the api url from special page:
     * - Special:Versions
     */
    apiUrl: 'https://en.wikipedia.org/w/api.php',

    /**
     * The username and password to access private wiki site.
     * For public wiki site you don't need username and passowrd to
     * read any wiki content.
     * You do need username and password to write to a wiki site.
     * Username and password could get from wiki site special page
     * - Speical:BotPassword
     */
    username: '',
    password: ''
};

/**
 * define the wiki client as singleton object.
 * So each api call will share the same cookie jar!
 */
const wikiClient = {

    /**
     * utility function to set up the wiki options.
     */
    setWikiOptions: function(options) {

        Object.assign(wikiOptions, options);
    },

    /**
     * The login request.
     */
    login: async function() {

        // STEP 1: Get request to fetch login token
        var params_0 = {
            action: "query",
            meta: "tokens",
            type: "login",
            format: "json"
        };

        // use querystring to build the HTTP query string
        let query = wikiOptions.apiUrl + "?" + querystring.encode(params_0);
        //console.log(query);

        try {

            const tokenRes = await gotInstance.get( query );
            //console.log( JSON.parse(tokenRes.body) );

            // get ready the loging POST request.
            var params_1 = {
                action: "login",
                // we need use bot user account here.
                lgname: wikiOptions.username,
                lgpassword: wikiOptions.password,
                lgtoken: JSON.parse(tokenRes.body).query.tokens.logintoken,
                format: "json"
            };

            const loginRes = await gotInstance.post( wikiOptions.apiUrl,
                { form: params_1 } );

            console.log(loginRes.body);
            console.table( cookieJar.getCookiesSync( wikiOptions.apiUrl ) );

        } catch (error) {

            console.log( error );
            throw new Error('Login Failed');
        }
    }
};

module.exports = wikiClient;

wikiClient.apiCall = async function( params, method, callback ) {

    let self = this;

    // make sure this is authenticated connection.
    if( cookieJar.getCookiesSync( wikiOptions.serverUrl ).length < 2 ) {

        await self.login();
    }

    // TODO: verify paramemeters.

    // Check the request method.
    method = method || 'GET';

    try {
        let res = null;
        switch( method ) {
            case 'GET':
                // setup the full URL for query.
                const query = wikiOptions.apiUrl + "?" + querystring.encode( params );
                console.log('apiCall: ', query);
                let queryRes = await gotInstance.get( query );
                res = JSON.parse( queryRes.body );
                break;
            case 'POST':
                let postRes = await gotInstance.post(
                    wikiOptions.apiUrl, { form: params }
                );
                res = JSON.parse( postRes.body );
                console.log( 'API call POST: ', res );
                break;
            default:
                break;
        }

        // bind the reaponse body as data.
        return {
            data: res,
            error: null
        };
    } catch ( error ) {
        return {
            data: null,
            error: error
        };
    }
};
