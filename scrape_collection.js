#!/usr/bin/env node

const cheerio = require('cheerio');

const collectionUri = process.argv.length > 2 ? process.argv[2] : 'https://www.lesswrong.com/bestoflesswrong';

async function run() {
  const html = await fetch(collectionUri).then(x => x.text());
  const $ = cheerio.load(html);
  const title = $(".CollectionsPage-title").first().text();
  const sections = $(".CollectionsPage-section").slice(1)
    .map((_, _section) => {
      const section = $(_section);
      const sectionTitle = section.find('.SectionTitle-root > h1').text();
      const urls = $(".SequencesSmallPostLink-title > span > a", section)
        .map((_i, el) => $(el).prop('href'))
        .toArray();
      return { title: sectionTitle, urls: urls };
    })
    .toArray();

  console.log(JSON.stringify({
    title: title,
    sections: sections
  }));
}

run()
