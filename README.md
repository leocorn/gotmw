# gotmw.js
Node.js MediaWiki client on top of Got.js and many others.

## Wiki Agent

Try our wiki-agent to learn the MediaWiki Action APIs:

```bash
cd sample
node wiki-agent.js
```

## Examples
Here are some examples to using **gotmw.js**.

### Interactive command line interface to en.wikipedia.org

List options for the command line interface:
```bash
node sample/wikipedia/wikipedia-cli.js
```

#### categories (query prop)

Get all categories for a wiki page:
```bash
node sample/wikipdia/wikipedia-cli.js -a query -p categories --titles 'UEFA Euro 2020'
```

#### categorymembers (query list)

List all pages for a wiki category.
```bash
node sample/wikipdia/wikipedia-cli.js -a query -l categorymembers --cmtitle 'Category:UEFA Euro 2020' --cmtype page --cmlimit 20
```
The option --cmtype could be

- **subcat** for sub categories
- **file** for files
- **page** for wiki pages

#### search (query list)

Execute a simple search.
```bash
node sample/wikipedia/wikipedia-cli.js -a query -l search --srsearch='intitle:Ava film'
node sample/wikipedia/wikipedia-cli.js -a query -l search --srsearch='benji' --srlimit=3 --srnamespace="6|14"
```

The details options could find on page [API:Search](https://www.mediawiki.org/wiki/API:Search)
[Wikipedia](https://www.wikipedia.org) is using CirrusSearch.
The advanced search syntax could be found on page [Help:CirrusSearch](https://www.mediawiki.org/wiki/Help:CirrusSearch).

The option **--srprop** has the properties for snippets from page content,
page title, section title and category:

- **snippet**
- **sectiontitle**
- **sectionsnippet**

The option **--srnamespace** will set the namespaces to search in.
Here are some common namespaces:

- **0** main namespace
- **14** category
- **6** file

The default namespaces are list on page [Help:Namespaces](https://www.mediawiki.org/wiki/Help:Namespaces).

#### opensearch

The sample for [API:Opensearch](https://www.mediawiki.org/wiki/API:Opensearch) action:
```bash
node sample/wikipedia/wikipedia-cli.js -a opensearch --search="Hampi" --limit=10 --namespace="0|6"
```

#### recentchanges (query list)

List all recent changes, details on page [API:RecentChanges](https://www.mediawiki.org/wiki/API:RecentChanges).
```bash
node sample/wikipedia/wikipedia-cli.js -a query -l recentchanges --rclimit=3
```

#### imageinfo (query prop)

The action [API:Imageinfo](https://www.mediawiki.org/wiki/API:Imageinfo) could be used to get the
thumbnail url. It also could get the thumbnail image for a **pdf** file.
Here is a sample:
```bash
node sample/wikipedia/wikipedia-cli.js -a query -p imageinfo --titles='File:JUA0680291.pdf' --iiprop="url|size" --iiurlwidth=120
```

#### extracts (query prop)

The help page [Get the contents of a page](https://www.mediawiki.org/wiki/API:Get_the_contents_of_a_page) has a full list of methods for tetrieving page content by the API.
This is the only way to get excerpt from a wiki page.

The extracts action depends on the [Extension:TextExtracts](https://www.mediawiki.org/wiki/Extension:TextExtracts).

```bash
node sample/wikipedia/wikipedia-cli.js -a query -p extracts --titles='Benji' --exchars=175 --explaintext=true
```

#### parse

The [API:Parse](https://www.mediawiki.org/wiki/API:Parsing_wikitext) action has the
option to only parse one of the section.
The section **0** is the paragraphs before the first section.

```bash
node sample/wikipedia/wikipedia-cli.js -a parse --page="Benji" -p text --section=0 --preview=true
```
