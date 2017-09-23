# LessWrong Portable

Download the current version of The Codex [[EPUB](https://github.com/AABoyles/LessWrong-Portable/raw/master/output/codex.epub)] [[MOBI]()]

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

In the `output/` directory. Yes, in the `master` branch.

## I want to make my own version! What should I do?

First, [Clone this Repository](https://github.com/AABoyles/LessWrong-Portable.git)

```bash
git clone https://github.com/AABoyles/LessWrong-Portable.git
cd LessWrong-Portable/
```

Now, do you use [Python](#python) or [Javascript](#no-javascript)?

### Python!

OK, set up your environment:

```bash
pip3 install -r requirements.txt
```

(If you use venv or whatever, good for you.)

Finally, run `build.py`.

```bash
python3 build.py
```

That will download all of the content of [the Codex](https://www.lesserwrong.com/codex) into the `cache/` directory, and then assemble them all into an EPUB file (`outputs/codex.epub`). Warning: It runs pretty slowly.

### No, Javascript!

OK, set up your environment:

```bash
npm install
```

Finally, run `build.js`.

```bash
nodejs build.js
```

That will download all of the content of [the Codex](https://www.lesserwrong.com/codex) into the `cache/` directory, and then assemble them all into an EPUB file (`outputs/codex.epub`). LW2.0 is pretty slow, but otherwise the script runs pretty fast :)

### OK, back to platform-agnostic text

I'm sure I'm forgetting stuff. [Let me know](https://github.com/AABoyles/LessWrong-Portable/issues/new).

## Why is the output mostly blank pages?

[The Links](https://github.com/AABoyles/LessWrong-Portable/blob/master/urls/codex) for [the Codex](https://www.lesserwrong.com/codex) aren't all up and running yet. I [mentioned this](https://www.lesserwrong.com/posts/vtZsEerABCjhtgizX/beta-first-impressions/z5CwCreiFve2K3H8Z) in [the appropriate venue](https://www.lesserwrong.com/posts/vtZsEerABCjhtgizX/beta-first-impressions).

## How did you make the MOBI version?

Turns out that programatically generating [Kindle Formats](https://kdp.amazon.com/en_US/help/topic/A2GF0UFHIYG9VQ) (e.g. [AZW](https://calibre-ebook.com/), [MOBI](https://en.wikipedia.org/wiki/Mobipocket)) is weirdly difficult.
Use [Calibre](https://calibre-ebook.com/) or [this Weird Script from Amazon](https://www.amazon.com/gp/feature.html?docId=1000765211).

## How do you make a PDF/Text/Markdown/[Whatever] Version?

I haven't gotten there yet. Feel free to [fork this repo](https://help.github.com/articles/fork-a-repo/) and figure it out yourself.

## How do you make a Word Version?

Go away.

## Why two separate platforms?

I [started this project in Python](https://github.com/AABoyles/LessWrong-Portable/commit/34ed9329ad95f6ae42b21b73808a4c64b30b6648), but the [EPUB library](https://github.com/aerkalov/ebooklib) was irritating me and I couldn't find a good ([Python](https://github.com/kcartlidge/nodepub)) alternative.

## Which version created the output in the Repo?

Javascript.

## Why does the Javascript verion call curl, instead of using an http library?

I went through four different libraries to try to make synchronous http requests, and they all did this super annoying thing where they would return a page that hadn't rendered the text content yet. Weirdly, when I made (what I thought was) the same request in curl, it gave me the content I needed. So, instead of figuring out the right way to do it, I just did the thing that worked.

## Why is the Javascript version synchronous?

Because this doesn't need to be done fast, but it does need to be done in a precise sequence.

## What's the roadmap?

1. Wait patiently for the LW2.0 devs to fix the Codex.
2. Re-run the script and push the output upstream.
3. Read the Codex on my Kindle, 'cuz that's the real reason I started this thing.
4. Add infrastructure to make the content switchable (e.g. pass an argument to build the Codex, a different one to build HPMOR, a third for R:A-Z, etc.)
5. Maybe organize some new sequences in a way that I find useful and add them.

If you want anything else, [let me know](https://github.com/AABoyles/LessWrong-Portable/issues/new) and I'll tackle it when I've got some spare time. HAHAHAHA.
