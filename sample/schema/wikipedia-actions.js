const schema = {
    properties: {
        params: {
            description: [
                "",
                "b - back to previous prompt",
                "",
                "Wiki API action parameters, for example:",
                // query image information,
                "* action=query prop=imageinfo titles=File:JUA0680291.pdf iiprop=url|size iiurlwidth=120",
                // query list members or a category.
                "* action=query list=categorymembers cmtitle=Category:UEFA_Euro_2020' cmtype=page cmlimit=20",
                // query search action
                "* action=query list=search srsearch=benji srlimit=3 srnamespace=6|14",
                "",
            ].join("\n"),
        },
    },
};

module.exports = schema;
