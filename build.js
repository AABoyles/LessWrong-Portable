#!/usr/bin/env node

const cheerio = require('cheerio');
const nodepub = require('nodepub');
const jetpack = require('fs-jetpack');
const { execSync } = require('child_process');
const archiver = require('archiver');

let version = process.argv.length > 2 ? process.argv[2] : 'default';
const buildMobi = process.argv.includes('--mobi');

const config = JSON.parse(jetpack.read('meta/' + version + '.json'));
config.metadata = Object.assign({
    title: version,
    author: 'LessWrong',
    authorUrl: 'https://www.lesswrong.com/',
    modified: new Date(),
    source: 'https://www.lesswrong.com/',
    description: 'LessWrong 2.0 exists to give the rationality community the tools to make intellectual progress on important problems.',
    publisher: 'LessWrong',
    subject: 'Non-fiction, Rationality',
    includeTOC: false
  }, config.metadata);

let scrapeError = false;

let epub = nodepub.document(config.metadata, config.img, writeTOC);

function addChapterToBook(html, url, cache_path){
  const urlObj = typeof url === 'object' ? url : {};
  const urlPath = urlObj.url || url;

  // Per-URL overrides fall back to top-level config values.
  const titleSelector  = urlObj.titleSelector  || config.titleSelector;
  const contentSelector = urlObj.contentSelector || config.contentSelector;
  const withoutSelector = urlObj.withoutSelector !== undefined
    ? urlObj.withoutSelector
    : config.withoutSelector;

  let $ = cheerio.load(html);
  let title = urlObj.title || $(titleSelector).first().text();
  console.log('Adding "' + title + '" to the book.');
  if(withoutSelector) $(withoutSelector).remove();
  $('[async]').removeAttr('async');
  // epub:type uses the epub: namespace prefix, which is not declared in the XHTML
  // wrapper nodepub generates, causing XML parsers to reject the file.
  $('*').each((_, el) => { if (el.attribs) delete el.attribs['epub:type']; });
  let content = $(contentSelector);
  if(title === ''){
    console.log('Couldn\'t correctly scrape', urlPath);
    jetpack.remove(cache_path);
    scrapeError = true;
  }
  // Serialize and make void elements XHTML self-closing so the EPUB passes
  // XML validation. cheerio HTML mode strips closing slashes on serialisation,
  // so we apply the fixes as string replacements after extraction.
  let contentHtml = (typeof content === 'string' ? content : content.html()) || '';
  ['br', 'hr', 'img', 'input', 'col', 'area', 'embed', 'source', 'wbr'].forEach(tag => {
    contentHtml = contentHtml.replace(
      new RegExp(`<${tag}([^>]*?)\\s*/?>`, 'gi'),
      (_, attrs) => `<${tag}${attrs.trimEnd()}/>`
    );
  });
  let newDoc = `
    <h1 style="margin: 1rem auto;">${title}</h1>
    <div style="">
      ${contentHtml}
    </div>
`;
  epub.addSection(title, newDoc);
}

function writeTOC(links){
  let toc = cheerio.load(jetpack.read('templates/nav.xhtml'));
  let list = toc('#list');
  links.forEach(link => {
    if (link.itemType !== "contents") {
      list.append(`\n    <li><a href="${link.link}">${link.title}</a></li>`);
    }
  });
  list.append('\n');
  return toc('body').html();
}

config.urls.forEach(url => {
  const urlPath = typeof url === 'string' ? url : url.url;
  const source  = (typeof url === 'object' && url.source) ? url.source : config.metadata.source;
  let stem = urlPath.trim().split('/').pop();
  const cache_path = './cache/' + stem + (stem.split('.').pop() !== 'html' ? '.html' : '');
  if(!jetpack.exists(cache_path)){
    console.log('Scraping', source + urlPath);
    execSync('wget --user-agent="Mozilla" ' + source + urlPath + ' -nc -q -O ' + cache_path);
  }
  addChapterToBook(jetpack.read(cache_path), url, cache_path);
});

const archive = archiver('zip', { store: false });
const output = jetpack.createWriteStream(`${__dirname}/output/${version}.epub`);
archive.pipe(output);
epub.writeFilesForEPUB('./temp', err => { if (err) { console.log(err) } });
archive.directory('./temp/', false);
output.on('close', () => {
  console.log(archive.pointer() + ' total bytes');
  if (buildMobi) {
    const epubPath = `${__dirname}/output/${version}.epub`;
    const mobiPath = `${__dirname}/output/${version}.mobi`;
    try {
      execSync(`ebook-convert "${epubPath}" "${mobiPath}"`, { stdio: 'inherit' });
      console.log('MOBI written to', mobiPath);
    } catch (_) {
      console.error('MOBI conversion failed. Install Calibre and ensure ebook-convert is on your PATH.');
    }
  }
});
archive.finalize();
