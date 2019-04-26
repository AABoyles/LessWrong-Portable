# LessWrong Portable

Download the current versions of:

| Title | Author | EPUB | MOBI |
| ----- | ------ | ---- | ---- |
| [The Codex](https://www.lesserwrong.com/codex) | Scott Alexander | [:book:](https://github.com/AABoyles/LessWrong-Portable/raw/master/output/TheCodex.epub) | [:book:](https://github.com/AABoyles/LessWrong-Portable/raw/master/output/TheCodex.mobi) |
| [Rationality Abridged](https://perpetualcanon.blogspot.nl/p/rationality.html) | Quaerendo | [:book:](https://github.com/AABoyles/LessWrong-Portable/raw/master/output/RationalityAbridged.epub) | [:book:](https://github.com/AABoyles/LessWrong-Portable/raw/master/output/RationalityAbridged.mobi) |
| [The Abridged Guide to Intelligent Characters](http://yudkowsky.tumblr.com/writing) | Eliezer Yudkowsky | [:book:](https://github.com/AABoyles/LessWrong-Portable/raw/master/output/IntelligentCharacters.epub) | [:book:](https://github.com/AABoyles/LessWrong-Portable/raw/master/output/IntelligentCharacters.mobi) |
| [Legal Systems Very Different From Ours](http://www.daviddfriedman.com/Academic/Course_Pages/legal_systems_very_different_12/LegalSystemsDraft.html) | David Friedman | [:book:](https://github.com/AABoyles/LessWrong-Portable/raw/master/output/LegalSystemsVeryDifferentFromOurs.epub) | [:book:](https://github.com/AABoyles/LessWrong-Portable/raw/master/output/LegalSystemsVeryDifferentFromOurs.mobi) |
| [Replacing Guilt](http://mindingourway.com/guilt/) | Nate Soares | [:book:](https://github.com/AABoyles/LessWrong-Portable/raw/master/output/ReplacingGuilt.epub) | [:book:](https://github.com/AABoyles/LessWrong-Portable/raw/master/output/ReplacingGuilt.mobi) |

## About this

This is started as the latest in a long history of independent, disorganized projects to scrape collections of posts from LessWrong into ebooks. A few selected examples of others:

* [jb55's lesswrong-print](https://github.com/jb55/lesswrong-print)
* [dato's lesswrong-bundle](https://github.com/dato/lesswrong-bundle)
* [OneWhoFrog's lw2ebook](https://github.com/OneWhoFrogs/lw2ebook)
* [srlee309's LessWrongEBookCreator](https://github.com/srlee309/LessWrongEBookCreator)
* [natewind's lesswrong-fb2](https://github.com/natewind/lesswrong-fb2)

...Not to mention the [official version of the Sequences](https://intelligence.org/rationality-ai-zombies/).

So, why on earth did I start another? [LessWrong 2.0](http://lesserwrong.com/). Since LessWrong 2.0 [was voted to replace LessWrong Classic](http://lesswrong.com/lw/pfl/lw_20_open_beta_live/) (see point 4), All other the existing aggregators have broken. This isn't a big deal, since they really only need to run once (correctly) in order to create the ebook, but anyone who wants to modify them and scrape new ebooks won't be able to use them.

As separate rationale, [The Codex](https://www.lesserwrong.com/codex) by Scott Alexander is open for reading. Not that all this content wasn't [available elsewhere](https://nothingismere.com/2015/09/12/library-of-scott-alexandria/) before, but this is the most intentional linearly-organized collection of his best writings I've seen. I want to read it, and as I read most things, I want to do it on my ebook reader.

## What about the non-LessWrong Content?

Oh! I realized that with a surprisingly tiny bit of refactoring, this is flexible enough to work on content outside of LW. So I did the refactoring and here we are.

## Where are the Ebook files?

In the [output directory](https://github.com/AABoyles/LessWrong-Portable/tree/master/output).

## I want to make my own version! What should I do?

First, [Clone this Repository](https://github.com/AABoyles/LessWrong-Portable.git)

```bash
git clone https://github.com/AABoyles/LessWrong-Portable.git
cd LessWrong-Portable/
```

Now set up your environment:

```bash
npm install
```

Finally, run `npm start <book>`, along with the [name of the book you want to build](https://github.com/AABoyles/LessWrong-Portable/tree/master/meta). Currently, the options include:

* `default` - A dummy package that demonstrates the JSON schema by creating an ebook containing only [this post](https://www.lesserwrong.com/posts/ANDbEKqbdDuBCQAnM/about-lesswrong-2-0).
* `codex` - [The Codex of Scott Alexander](https://www.lesserwrong.com/codex)
* `rationalityabridged` - [Rationality Abridged](https://perpetualcanon.blogspot.nl/p/rationality.html) by Quaerendo
* `inadequate` - [Inadequate Equilibria](https://equilibriabook.com/) by Eliezer Yudkowsky
* `meditation` - [LessWrong on Meditation](http://lesswrong.com/) by LessWrong Authors
* `intelligent` - [The Abridged Guide to Intelligent Characters](http://yudkowsky.tumblr.com/writing) by Eliezer Yudkowsky
* `replacingguilt` - [The Replacing Guilt Series](http://mindingourway.com/guilt/) by Nate Soares
* `parenting` - [Jeff Kaufman on Parenting](https://www.jefftk.com/p/index)

There are also meta files for some other content from outside the rationalist community:

* `hedonistic` - [The Hedonistic Imperative](https://www.hedweb.com/hedethic//tabconhi.htm) by David Pearce
* `wbwelonmusk` - [Wait but Why on Elon Musk](https://waitbutwhy.com/2017/03/elon-musk-post-series.html) by Tim Urban
* `scip` - [The Structure and Interpretation of Computer Programs](https://mitpress.mit.edu/sites/default/files/sicp/full-text/book/)

So, for example:

```bash
npm start codex
```

That will download all of the content of [the Codex](https://www.lesserwrong.com/codex) into the `cache/` directory, and then assemble them all into an EPUB file (`outputs/TheCodex.epub`).

I'm sure I'm forgetting stuff. [Let me know](https://github.com/AABoyles/LessWrong-Portable/issues/new).

## I want to make a custom book/sequence! How do I do that?

First [follow the directions to build your own version](https://github.com/AABoyles/LessWrong-Portable#i-want-to-make-my-own-version-what-should-i-do). Once you get to the build step (i.e. `npm start <whatever>`), instead of building one of the available options, copy the [default build meta file](https://github.com/AABoyles/LessWrong-Portable/blob/master/meta/default.json) to a version named for your own sequence/book.

For example, I wanted to create a book using some LessWrong posts on meditation. Here's what I did:

```bash
cp meta/default.json meta/meditation.json
```

Next, edit `meta/meditation.json`. Changing this is mostly optional, except for the URLs. That's really, really important. I used these posts as a starting point:

* [Meditation, insight, and rationality. (Part 1 of 3)](https://www.lesserwrong.com/posts/QqSNFcGSZdnARx56E/meditation-insight-and-rationality-part-1-of-3)
* [Meditation, insight, and rationality. (Part 2 of 3)](https://www.lesserwrong.com/posts/QjoTFHzvrxQg9A6j3/meditation-insight-and-rationality-part-2-of-3)

The contents of the urls array in my meta config file isn't the full url, but the path following the `source`. So, my meta config file should look like this:

```json
{
	"img": "images/lw.png",
	"shorttitle": "LessWrongOnMeditation",
	"metadata": {...},
	"titleSelector": ".PostsPageTitle-root",
	"contentSelector": ".PostsPage-postContent",
	"source": "http://lesswrong.com/",
	"urls": [
		"posts/QqSNFcGSZdnARx56E/meditation-insight-and-rationality-part-1-of-3",
		"posts/QjoTFHzvrxQg9A6j3/meditation-insight-and-rationality-part-2-of-3"
	]
}
```

If you want to make a book from content outside of LW, you're going to need to change a few more things. The fields in the `metadata` object should be more-or-less self-explanatory. The `titleSelector` and `contentSelector` fields, probably less so. If you're not familiar with [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors), this is going to take a little bit of training. Feel free to email me for help.

Now you can build your new book.

```bash
npm start meditation
```

That should generate a new file entitled `output/LessWrongOnMeditation.epub`. Enjoy!

**Best Practice**: Commit your new meta config file to your repository and push it upstream. I'm very interested in aggregating other materials, so if you can manage it, [submit a pull request](https://github.com/AABoyles/LessWrong-Portable/compare)!

## How did you make the MOBI version?

It turns out that programatically generating [Kindle Formats](https://kdp.amazon.com/en_US/help/topic/A2GF0UFHIYG9VQ) (e.g. [AZW](https://calibre-ebook.com/), [MOBI](https://en.wikipedia.org/wiki/Mobipocket)) is weirdly difficult.
Use [Calibre](https://calibre-ebook.com/) or [this Weird Script from Amazon](https://www.amazon.com/gp/feature.html?docId=1000765211). I may get around to [scripting it](https://github.com/AABoyles/LessWrong-Portable/issues/12), someday.

## How do you make a PDF/Text/Markdown/[Whatever] Version?

I'm probably not going to. Feel free to [fork this repo](https://help.github.com/articles/fork-a-repo/) and figure it out yourself.

## How do you make a Word Version?

Go away.

## Why does the script call `wget`, instead of using an [http library](https://www.npmjs.com/search?q=curl&page=1&ranking=optimal)?

I went through four different libraries to try to make synchronous http requests, and they all did this super annoying thing where they would return a page that hadn't rendered the text content yet (No, it wasn't a promise. Cut me *some* slack, please). Weirdly, when I made (what I thought was) the same request in `curl`, it gave me the content I needed. So, instead of figuring out the right way to do it, I just did the thing that worked. I switched to `wget` when I needed to run a build on a Windows machine and `wget` was easier to get running. This confers the added bonus in that Ubuntu has `wget` out of the box but `curl` must be installed.

## Why synchronous requests?

Because it doesn't need to be done fast, but it does need to be done in a precise sequence. Writing an asynchronous version might save a few seconds at runtime, but would take me at least another hour or two to code up. I strongly doubt the number of times this script will ever be run will add up to the development time cost.

## I ran the build myself, but it failed! What gives?

If the server [barfs](http://catb.org/jargon/html/B/barf.html) for some reason, the script will continue. After all, why waste bandwidth and effort? Re-run it and it will only try to download the files it didn't get the first time. There may be a couple that aren't downloading for structural, rather than essentially random reasons. To fill these in for the [canonical ebooks](https://github.com/AABoyles/LessWrong-Portable/tree/master/output), I just manually saved copies of those pages in the `cache/` directory.

If it's having trouble with a custom book you've cooked up, make sure that your the CSS selector for the title is *exactly* correct. It should be precise enough to identify the title and only the title. If the selector comes up empty, [LWP](https://github.com/AABoyles/LessWrong-Portable#lesswrong-portable) assumes it failed and won't generate a book in the end, though it will continue caching content until it reaches the end of the available URLs.

## What's the deal with *Legal Systems Very Different From Ours*?

*Legal Systems Very Different From Ours* is an unpublished manuscript by David Friedman. It's available in two formats: [Word](http://www.daviddfriedman.com/Legal%20Systems/LegalSystemsContents.htm) and [HTML](http://www.daviddfriedman.com/Academic/Course_Pages/legal_systems_very_different_12/LegalSystemsDraft.html). I decided to try to build an ebook based on the Word documents. Partly, I wanted to extend this script to crunch arbitrary Word Documents, but mostly I wanted the latest edition of the manuscript. As best as I can tell, the HTML version was last touched in late 2011, whereas the Word versions date to 2015ish.

Anyway, that turned out to be a critical error. Munging Word documents is difficult because, frankly, Word encourages the user to adopt undesirable and inconsistent typesetting practices, making it arbitrarily difficult to scrape. I finally managed to scrape *Legal Systems*, but with a significant amount of hacking and non-generalizable code. Accordingly, I'm keeping the [meta file](https://github.com/AABoyles/LessWrong-Portable/blob/master/meta/legalsystems.json) and [output](https://github.com/AABoyles/LessWrong-Portable/blob/master/output), but ditching the code I had to use to build it. If you want to try to build it yourself, please be my guest, but I'm not helping ;)

That said, if you figure out a not-crazy way that would generalize to other Word-based books, please (please please) submit a pull request!

## Why are there some meta files for books that aren't in the output folder?

This is left to the reader as an exercise in reading between the lines.

## What's the roadmap?

1. Whatever's in [the issues queue](https://github.com/AABoyles/LessWrong-Portable/issues).
2. Maybe organize some new sequences in a way that I find useful and add them.

If you want anything else, [let me know](https://github.com/AABoyles/LessWrong-Portable/issues/new) and I'll tackle it when I've got some spare time. HAHAHAHA.
