# LessWrong Portable

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

I haven't finished writing the script yet, so I don't have any live EBooks yet. Watch this space.

## I want to make my own version! What should I do?

First, [Clone this Repository](https://github.com/AABoyles/LessWrong-Portable.git)

```bash
git clone https://github.com/AABoyles/LessWrong-Portable.git
```

Next, set up your environment.

```bash
cd LessWrong-Portable/
pip3 install -r requirements.txt
```

(If you use venv or whatever, good for you.)

Finally, run `build.py`.

```bash
python3 build.py
```

That will download all of the content of [the Codex]() into the `cache/` directory, and then assemble them all into an EPUB file (`outputs/codex.epub`).

I'm sure I'm forgetting stuff. [Let me know](https://github.com/AABoyles/LessWrong-Portable/issues/new).

## How do you make a version for Kindle?

Turns out that programatically generating [Kindle Formats](https://kdp.amazon.com/en_US/help/topic/A2GF0UFHIYG9VQ) (e.g. [AZW](https://calibre-ebook.com/), [MOBI](https://en.wikipedia.org/wiki/Mobipocket)) is weirdly difficult.
Use [Calibre](https://calibre-ebook.com/) or [this Weird Script from Amazon](https://www.amazon.com/gp/feature.html?docId=1000765211).

## How do you make a PDF/Text/Markdown/[Whatever] Version?

I haven't gotten there yet. Feel free to [fork this repo](#fork-destination-box) and figure it out yourself.

## How do you make a Word Version?

Go away.

## What's the roadmap?

1. Get it working.
2. Read the Codex on my Kindle, 'cuz that's the real reason I started this thing.

If you want anything else, [let me know](https://github.com/AABoyles/LessWrong-Portable/issues/new) and I'll tackle it when I've got some spare time.
