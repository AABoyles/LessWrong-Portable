# LessWrong Portable

Download the current version of:

* The Codex [[EPUB](https://github.com/AABoyles/LessWrong-Portable/raw/master/output/TheCodex.epub)] [[MOBI](https://github.com/AABoyles/LessWrong-Portable/raw/master/output/TheCodex.mobi)]
* Inadequate Equilibria [[EPUB](https://github.com/AABoyles/LessWrong-Portable/raw/master/output/InadequateEquilibria.epub)] [[MOBI](https://github.com/AABoyles/LessWrong-Portable/raw/master/output/InadequateEquilibria.mobi)]

## About this

This is the latest in a long history of independent, disorganized projects to scrape collections of posts from LessWrong into ebooks. A few selected examples of others:

* [jb55's lesswrong-print](https://github.com/jb55/lesswrong-print)
* [dato's lesswrong-bundle](https://github.com/dato/lesswrong-bundle)
* [OneWhoFrog's lw2ebook](https://github.com/OneWhoFrogs/lw2ebook)
* [srlee309's LessWrongEBookCreator](https://github.com/srlee309/LessWrongEBookCreator)
* [natewind's lesswrong-fb2](https://github.com/natewind/lesswrong-fb2)

...Not to mention the [official version of the Sequences](https://intelligence.org/rationality-ai-zombies/).

So, why on earth should I start another? [LessWrong 2.0](http://lesserwrong.com/). If LessWrong 2.0 [is voted to replace LessWrong Classic](http://lesswrong.com/lw/pfl/lw_20_open_beta_live/) (see point 4), All the existing aggregators will break. This isn't a big deal, since they really only need to run once (correctly) in order to create the ebook, but anyone who wants to modify them and scrape new ebooks won't be able to use them.

As separate rationale, [Scott Alexander's Codex](https://www.lesserwrong.com/codex) is open for reading now that the site is [in open beta](http://lesswrong.com/lw/pfl/lw_20_open_beta_live/). Not that all this content wasn't [available elsewhere](https://nothingismere.com/2015/09/12/library-of-scott-alexandria/) before, but this is the most intentional linearly-organized collection of his best writings I've seen. I want to read it, and as I read most things, I want to do it on my ebook reader.

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

Finally, run `build.js`, along with the [name of the book you want to build](https://github.com/AABoyles/LessWrong-Portable/tree/master/meta). Currently, the options include:

* `codex` - [The Codex of Scott Alexander](https://www.lesserwrong.com/codex)
* `inadequate` - [Inadequate Equilibria](https://equilibriabook.com/) by Eliezer Yudkowsky
* `default` - A dummy package that demonstrates the JSON schema by creating an ebook containing only [this post](https://www.lesserwrong.com/posts/ANDbEKqbdDuBCQAnM/about-lesswrong-2-0).

```bash
nodejs build.js codex
```

That will download all of the content of [the Codex](https://www.lesserwrong.com/codex) into the `cache/` directory, and then assemble them all into an EPUB file (`outputs/TheCodex.epub`). LW2.0 is pretty slow, but otherwise the script runs pretty fast :)

I'm sure I'm forgetting stuff. [Let me know](https://github.com/AABoyles/LessWrong-Portable/issues/new).

## I want to make a custom book/sequence! How do I do that?

First [follow the directions to build your own version](https://github.com/AABoyles/LessWrong-Portable#i-want-to-make-my-own-version-what-should-i-do). Once you get to the build step, instead of building one of the available options, copy the default build meta file to a version named for your own sequence/book.

Say, for example, I want to create a book using some LessWrong posts on meditation. (Note to self: develop actually go do this.) Here's what I'd do:

```bash
cp meta/default.json meta/meditation.json
```

Next, edit `meta/meditation.json`. Changing this is mostly optional, except for the URLs. That's really, really important. I want to use these posts as a starting point:

* [Meditation, insight, and rationality. (Part 1 of 3)](https://www.lesserwrong.com/posts/QqSNFcGSZdnARx56E/meditation-insight-and-rationality-part-1-of-3)
* [Meditation, insight, and rationality. (Part 2 of 3)](https://www.lesserwrong.com/posts/QjoTFHzvrxQg9A6j3/meditation-insight-and-rationality-part-2-of-3)

The contents of the urls array in my meta config file isn't the full url, but the path following "https://www.lesserwrong.com". So, my meta config file should look like this:

```json
{
	"img": "images/default.png",
	"shorttitle": "LessWrongOnMeditation",
	"metadata": {...},
	"urls": [
		"/posts/QqSNFcGSZdnARx56E/meditation-insight-and-rationality-part-1-of-3",
    "/posts/QjoTFHzvrxQg9A6j3/meditation-insight-and-rationality-part-2-of-3"
	]
}
```

Now you can build your new book.

```bash
nodejs build.js meditation
```

That should generate a new file entitled `output/LessWrongOnMeditation.epub`. Enjoy!

**Best Practice**: Commit your new meta config file to your repository and push it upstream. I'm very interested in aggregating other materials on LessWrong, so if you can manage it, [submit a pull request](https://github.com/AABoyles/LessWrong-Portable/compare)!

## How did you make the MOBI version?

Turns out that programatically generating [Kindle Formats](https://kdp.amazon.com/en_US/help/topic/A2GF0UFHIYG9VQ) (e.g. [AZW](https://calibre-ebook.com/), [MOBI](https://en.wikipedia.org/wiki/Mobipocket)) is weirdly difficult.
Use [Calibre](https://calibre-ebook.com/) or [this Weird Script from Amazon](https://www.amazon.com/gp/feature.html?docId=1000765211).

## How do you make a PDF/Text/Markdown/[Whatever] Version?

I haven't gotten there yet. Feel free to [fork this repo](https://help.github.com/articles/fork-a-repo/) and figure it out yourself.

## How do you make a Word Version?

Go away.

## Why does the script call `curl`, instead of using an [http library](https://www.npmjs.com/search?q=curl&page=1&ranking=optimal)?

I went through four different libraries to try to make synchronous http requests, and they all did this super annoying thing where they would return a page that hadn't rendered the text content yet. Weirdly, when I made (what I thought was) the same request in curl, it gave me the content I needed. So, instead of figuring out the right way to do it, I just did the thing that worked.

## Why is synchronous requests?

Because it doesn't need to be done fast, but it does need to be done in a precise sequence.

## I ran the build myself, but it missed a bunch of essays and just put blank pages where they should've been! What gives?

If the server [barfs](http://catb.org/jargon/html/B/barf.html) for some reason, the script will continue. After all, why waste bandwidth and effort? Re-run it and it will only try to download the files it didn't get the first time. There may be a couple that aren't downloading for structural, rather than probabilistic reasons. To fill these in for the [canonical ebooks](https://github.com/AABoyles/LessWrong-Portable/tree/master/output), I just manually saved copies of those pages in the `cache/` directory.

## What's the roadmap?

1. Read the Codex on my Kindle, 'cuz that's the real reason I started this thing.
2. Add infrastructure to make the content switchable (e.g. pass an argument to build the Codex, a different one to build HPMOR, a third for R:A-Z, etc.)
3. Maybe organize some new sequences in a way that I find useful and add them.

If you want anything else, [let me know](https://github.com/AABoyles/LessWrong-Portable/issues/new) and I'll tackle it when I've got some spare time. HAHAHAHA.
