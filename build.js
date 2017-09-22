#!/usr/bin/env nodejs

const cheerio = require('cheerio');
const makepub = require('nodepub');
const request = require('sync-request');
const jetpack = require('fs-jetpack');

const baseurl = 'https://www.lesserwrong.com';

const metadata = {
	id: Date.now(),
	title: 'The Codex',
	series: 'LessWrong',
	sequence: 1,
	author: 'Scott Alexander',
	fileAs: 'Alexander, Scott',
	genre: 'Non-Fiction',
	tags: 'Rationality',
	copyright: 'Scott Alexander, 2007-2017',
	publisher: 'LessWrong',
	published: new Date().toISOString().substr(0,10),
	language: 'en',
	description: 'The Codex',
	contents: 'Chapters',
	source: 'https://www.lesserwrong.com',
	images: []
};

var epub = makepub.document(metadata, 'images/codexsmall.jpg');

epub.addCSS(jetpack.read('style/base.css'));

epub.addSection('Title Page', "<h1>[[TITLE]]</h1><h3>by [[AUTHOR]]</h3>", true, true);

var base_content = jetpack.read('template.xhtml');

function addChapterToBook(html, path){
  let $ = cheerio.load(html);
  let title = $('div.posts-page-content-header-title').text();
  if(title == ''){
    console.log('Server barfed on', path);
    jetpack.remove('cache/' + path.trim().split('/').pop() + '.html');
    // Normally, a script would submit another request to download the missing file.
    // Unfortunately, the problem is on LW's side, so there's no point.
  }
  let safe_title = title.toLowerCase().replace(/ /g, '-');
  let newDoc = cheerio.load(base_content);
  newDoc('body').append('<div id="'+safe_title+'"></div>');
  newDoc('div').append('<h1>'+title+'</h1>').append($('div.posts-page-content-body-html').html());
  epub.addSection(title, newDoc('body').html());
}

jetpack.read('urls/codex').trim().split('\n').forEach(path => {
  cache_path = 'cache/' + path.trim().split('/').pop() + '.html';
  if(jetpack.exists(cache_path)){
    var html = jetpack.read(cache_path);
  } else {
    console.log('Scraping', baseurl + path);
    var r = request('GET', baseurl + path.trim());
    var html = r.getBody();
    jetpack.write(cache_path, html);
  }
  addChapterToBook(html, path);
});

epub.writeEPUB(()=>{}, 'output', 'codex', ()=>{});
