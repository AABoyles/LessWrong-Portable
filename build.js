#!/usr/bin/env nodejs

const cheerio = require('cheerio');
const makepub = require('nodepub');
const jetpack = require('fs-jetpack');
const { execSync } = require('child_process');

var version = process.argv.length > 2 ? process.argv[2] : 'default';

const config = JSON.parse(jetpack.read('meta/' + version + '.json'));

var epub = makepub.document(config.metadata, config.img);

epub.addCSS(jetpack.read('style/base.css'));

epub.addSection('Title Page', "<h1>[[TITLE]]</h1><h3>by [[AUTHOR]]</h3>", true, true);

var base_content = jetpack.read('template.xhtml');

function addChapterToBook(html, url){
  let $ = cheerio.load(html);
  let title = $(config.titleSelector).text();
  let content = $(config.contentSelector).html();
  let path = url;
  if(typeof url === 'object'){
    path = url.url;
    if(url.titleSelector) title = $(url.titleSelector).text();
    if(url.contentSelector) content = $(url.contentSelector).text();
  }
  if(title === ''){
    console.log('Server barfed on', path);
    jetpack.remove('cache/' + path.trim().split('/').pop() + '.html');
  }
  let safe_title = title.toLowerCase().replace(/ /g, '-');
  let newDoc = cheerio.load(base_content);
  newDoc('body').append('<div id="'+safe_title+'"></div>');
  newDoc('div').append('<h1>'+title+'</h1>').append(content);
  epub.addSection(title, newDoc('body').html());
}

config.urls.forEach(url => {
  if(typeof url === 'string'){
    path = url;
  } else {
    path = url.url;
  }
  cache_path = 'cache/' + path.trim().split('/').pop() + '.html';
  if(jetpack.exists(cache_path)){
    var html = jetpack.read(cache_path);
  } else {
    console.log('Scraping', config.metadata.source + path);
    var r = execSync('curl ' + config.metadata.source + path);
    var html = r.toString();
    jetpack.write(cache_path, html);
  }
  addChapterToBook(html, url);
});

epub.writeEPUB(()=>{}, 'output', config.shorttitle, ()=>{});
