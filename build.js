#!/usr/bin/env nodejs

const cheerio = require('cheerio');
const makepub = require('nodepub');
const jetpack = require('fs-jetpack');
const { request } = require('graphql-request')
const { execSync } = require('child_process');
var sanitizeHtml = require('sanitize-html');

var version = process.argv.length > 2 ? process.argv[2] : 'default';

const config = JSON.parse(jetpack.read('meta/' + version + '.json'));

var scrapeError = false;

var epub = makepub.document(config.metadata, config.img);

epub.addCSS(jetpack.read('style/base.css'));

epub.addSection('Title Page', "<h1>[[TITLE]]</h1><h3>by [[AUTHOR]]</h3>", true, true);

var base_content = jetpack.read('template.xhtml');

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
  let newDoc = cheerio.load(base_content);
  newDoc('body').append('<div id="'+safe_title+'"></div>');
  newDoc('div').append('<h1>'+title+'</h1>').append(content);
  epub.addSection(title, newDoc('body').html());
}

function buildEbookFromCollection(collection) {
  collection.books.forEach((book, bookCount) => {
    const bookDoc = createDocFromLWContents(book.title || bookCount, book)
    book.posts && book.posts.forEach((post, bookPostCount) => {
      createDocFromLWContents(post.title || `${bookCount}.posts.${bookPostCount}`, post)
    })
    book.sequences && book.sequences.forEach(sequence => {
      buildEbookFromSequence(sequence)
    })
  })
}

function buildEbookFromSequence(sequence) {
  createDocFromLWContents(sequence.title, sequence)
  sequence.chapters && sequence.chapters.forEach((chapter) => {
    if (chapter.title) {
      createDocFromLWContents(chapter.title, chapter)
    }
    chapter.posts && chapter.posts.forEach((post, postCount) => {
      createDocFromLWContents(post.title, post)
    })
  })
}

function createDocFromLWContents(title, content) {
  let newDoc = cheerio.load(base_content)
  if (content.title) {
    let safe_title = content.title.toLowerCase().replace(/ /g, '-');
    newDoc('body').append('<div id="'+safe_title+'"></div>');
    newDoc('div').append('<h1>'+content.title+'</h1>')
  }
  newDoc('div').append(content.contents.html)
  epub.addSection(title, sanitizeHtml(newDoc('body').html(), {parser: {xmlMode: true}}))
}

if (config.urls) {
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
  if(scrapeError){
    console.log('Scrape errors occurred: No book produced.');
  } else {
    epub.writeEPUB(console.error, 'output', config.shorttitle, ()=>{
      console.log('Book successfully written to output/' + config.shorttitle + '.epub');
    });
  }
} else if (config.collectionId) {
  const query = `{
    collection(input: {selector: {_id: "${config.collectionId}"}}) {
      result {
        books {
          title
          contents { 
            html
          }
          sequences {
            title
            contents {
              html
            }
            _id
            chapters {
              title
              contents {
                html
              }
              posts {
                title
                contents {
                  html
                }
                _id
              }
            }
          }
        }
      }
    }
  }`
  request('https://www.lessestwrong.com/graphql?', query)
    .then(data => {
      buildEbookFromCollection(data.collection.result)
      epub.writeEPUB(console.error, 'output', config.shorttitle, ()=>{
        console.log('Book successfully written to output/' + config.shorttitle + '.epub');
      });
    })
    .catch(err => {
      console.log(err)
    })  
} else if (config.sequenceId) {
  const query = `{
    sequence(input: {selector: {_id: "${config.sequenceId}"}}) {
      result {
        title
          contents {
            html
          }
          chapters {
            title
            contents {
              html
            }
            posts {
              title
              contents {
                html
              }
              _id
            }
          }
      }
    }
  }
  `
  request('https://www.lessestwrong.com/graphql?', query)
    .then(data => {
      buildEbookFromSequence(data.sequence.result)
      epub.writeEPUB(console.error, 'output', config.shorttitle, ()=>{
        console.log('Book successfully written to output/' + config.shorttitle + '.epub');
      });
    })
    .catch(err => {
      console.log(err)
    })  
}





