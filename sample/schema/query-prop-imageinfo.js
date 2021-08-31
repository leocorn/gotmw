'use strict';

/**
 * prompt schema for
 *   action=query, prop=imageinfo
 */
const schema = {

    properties: {
        titles: {
            description: [
                "A list of titles to work on",
                "Separate values with |",
            ].join('\n'),
        },
        iiprop: {
            description: [
                "Set which file information to get, separate with '|'",
                "iiprop",
            ].join("\n"),
            required: true,
        },
        iiurlwidth: {
            description: [
                "Set the scale with for the image",
                "iiurlwidth",
            ].join("\n"),
        }
    },
};

module.exports = schema;
