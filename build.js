#!/usr/bin/env node

const cheerio = require('cheerio');
const nodepub = require('nodepub');
const jetpack = require('fs-jetpack');
const { execSync } = require('child_process');
const archiver = require('archiver');

let version = process.argv.length > 2 ? process.argv[2] : 'default';

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
  let $ = cheerio.load(html);
  let title = $(config.titleSelector).first().text();
  console.log('Adding "' + title + '" to the book.')
  if(config.withoutSelector) $(config.withoutSelector).remove();
  $('br').replaceWith('\n');
  $('img').insertAfter('</img>');
  $('hr').insertAfter('</hr>');
  $('[async]').removeAttr('async')
  let content = $(config.contentSelector);
  let path = url;
  if(typeof url === 'object'){
    path = url.url;
    if(url.titleSelector) title = $(url.titleSelector).text();
    if(url.contentSelector) content = $(url.contentSelector).text();
  }
  if(title === ''){
    console.log('Couldn\'t correctly scrape', path);
    jetpack.remove(cache_path);
    scrapeError = true;
  }
  let safe_title = title.toLowerCase().replace(/ /g, '-');
  let newDoc = `
    <h1 style="margin: 1rem auto;">${title}</h1>
    <div style="">
      ${content.html()}
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
  if(typeof url === 'string'){
    path = url;
  } else {
    path = url.url;
  }
  let stem = path.trim().split('/').pop();
  cache_path = './cache/' + stem + (stem.split('.').pop() !== 'html' ? '.html' : '');
  if(!jetpack.exists(cache_path)){
    console.log('Scraping', config.metadata.source + path);
    execSync('wget --user-agent="Mozilla" ' + config.metadata.source + path + ' -nc -q -O ' + cache_path);
  }
  addChapterToBook(jetpack.read(cache_path), url, cache_path);
});

const archive = archiver('zip', { store: false });
const output = jetpack.createWriteStream(`${__dirname}/output/${version}.epub`);
archive.pipe(output);
epub.writeFilesForEPUB('./temp', err => { if (err) { console.log(err) } });
archive.directory('./temp/', false);
output.on('close', () => console.log(archive.pointer() + ' total bytes'));
archive.finalize();
