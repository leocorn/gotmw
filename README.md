# gotmw.js
Node.js MediaWiki client on top of Got.js and many others.

Try our wiki-agent to see how it works.

```bash
cd sample
node wiki-agent.js
```

Here is a quick demo:

![wiki agent demo](/docs/wiki-agent-demo.gif)

By default, all examples is load from file **sample/action-examples.json**.
You could prepare your own examples and store it in your local.
Then using the command **loadexamples** to load your own examples.

Here is simple query action to wikipedia.org:

```json
{
    "description":"Example to show how to get a login token",
    "action": "query",
    "meta": "tokens",
    "type": "login"
},
```
