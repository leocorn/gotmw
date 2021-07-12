# gotmw.js
MediaWiki client on top of Got.js and many others.

## Examples
Here are some examples to using **gotmw.js**.

### Interactive command line interface to en.wikipedia.org

List options for the command line interface:
```bash
node sample/wikipedia/wikipedia-cli.js
```

Get all categories for a wiki page:
```bash
node sample/wikipdia/wikipedia-cli.js -a query -p categories --titles 'UEFA Euro 2020'
```
