const schema = {
    properties: {
        params: {
            description: [
                "",
                "b - back to previous prompt",
                "",
                "Wiki API action parameters, for example:",

                // fetch login token and login using bot user.
                "* action=query meta=tokens type=login",
                // this has to be a post request
                "* action=login lgtoken=deislfhdek13jlsj lgname=botname lgpassword=botpassword",

                // query image information,
                "* action=query prop=imageinfo titles=File:JUA0680291.pdf iiprop=url|size iiurlwidth=120",

                // query list members or a category.
                // NOTE: use "_" for " "
                "* action=query list=categorymembers cmtitle=Category:UEFA_Euro_2020' cmtype=page cmlimit=20",

                // query search action
                "* action=query list=search srsearch=benji srlimit=3 srnamespace=6|14",
                "",
            ].join("\n"),
        },
    },
};

module.exports = schema;
