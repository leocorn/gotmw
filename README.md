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
node sample/wikipdia/wikipedia-cli.js -a query -l categorymembers --cmtitle 'Category:UEFA Euro 2020' --cmtype page cmlimit 20
```
The option --cmtype could be
- subcat for sub categories
- file for files
- page for wiki pages
