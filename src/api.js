'use strict';

/**
 * utility functions to call MediaWiki Action API:
 * - https://www.mediawiki.org/wiki/API:Main_page
 */

const got = require('got')

const api = {

    /**
     * The main function to call MediaWiki Action API.
     */
    doAction: async function( url, params, method='GET', done ) {

        const response = await got( url, {
            searchParams: params,
            method: method,
            // the response.data will have the result object.
            responseType: 'json'
        } );

        //console.log(response);
        // by default the data will stored in body property
        return response.body;
        // set the responseType to 'json' to have data object.
        //return response.data;
    }
};

module.exports = api;
