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

List all pages for a wiki category.
```bash
node sample/wikipdia/wikipedia-cli.js -a query -l categorymembers --cmtitle 'Category:UEFA Euro 2020' --cmtype page --cmlimit 20
```
The option --cmtype could be

- **subcat** for sub categories
- **file** for files
- **page** for wiki pages

Execute a simple search.
```bash
sample/wikipedia/wikipedia-cli.js -a query -l search --srsearch='intitle:Ava film'
```

The details options could find on page [API:Search](https://www.mediawiki.org/wiki/API:Search)
[Wikipedia](https://www.wikipedia.org) is using CirrusSearch.
The advanced search syntax could be found on page [Help:CirrusSearch](https://www.mediawiki.org/wiki/Help:CirrusSearch).
