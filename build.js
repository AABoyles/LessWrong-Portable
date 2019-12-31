#!/usr/bin/env nodejs

const cheerio = require('cheerio');
const Streampub = require('streampub');
const jetpack = require('fs-jetpack');
const { execSync } = require('child_process');

var version = process.argv.length > 2 ? process.argv[2] : 'default';

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

var scrapeError = false;

var epub = new Streampub(config.metadata);
var epubPath = `output/${version}.epub`
epub.pipe(jetpack.createWriteStream(epubPath));

let cover = cheerio.load(jetpack.read('templates/cover.xhtml'));
cover('h1#title').text(config.metadata.title);
cover('figure#cover').append(`<img alt="Cover" src="${config.img}" />`);
cover('span#author').text(config.metadata.author);
epub.write(Streampub.newChapter(config.metadata.title, cover.html(), 0));

let toc = cheerio.load(jetpack.read('templates/nav.xhtml'));

var chapterNumber = 2;

function addChapterToBook(html, url, cache_path){
  let $ = cheerio.load(html);
  let title = $(config.titleSelector).first().text();
  let content = $(config.contentSelector).html();
  if(config.withoutSelector) $(config.withoutSelector).remove();
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
  let newDoc = cheerio.load(jetpack.read('templates/chapter.xhtml'));
  newDoc('#chapter')
    .append('<h1>'+title+'</h1>')
    .append(content);
  epub.write(Streampub.newChapter(title, newDoc('body').html(), chapterNumber));
  toc('#list').append(`<li><a href="chapter-${chapterNumber++}.xhtml">${title}</a></li>`);
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
    execSync('wget ' + config.metadata.source + path + ' -nc -q -O ' + cache_path);
  }
  addChapterToBook(jetpack.read(cache_path), url, cache_path);
});

epub.write(Streampub.newChapter("Table of Contents", toc.html(), 1));

epub.write(Streampub.newFile('style/blitz.css', jetpack.createReadStream('style/blitz.css')));
epub.write(Streampub.newFile('style/blitz-kindle.css', jetpack.createReadStream('style/blitz-kindle.css')));
epub.write(Streampub.newFile(config.img, jetpack.createReadStream(config.img)));

if(scrapeError){
  console.error('Scrape errors occurred: No epub produced.');
} else {
  epub.end();
  console.log(`Book successfully written to ${epubPath}`);
}
