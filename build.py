import requests
from bs4 import BeautifulSoup
from ebooklib import epub
import csv
import os

baseurl = 'https://www.lesserwrong.com'

book = epub.EpubBook()

# set metadata
book.set_identifier('theCodex')
book.set_title('The Codex')
book.set_language('en')

book.add_author('Scott Alexander')

book.set_cover('codex.jpg', open('images/codex.jpg', 'rb').read())

toc = []
spine = ['nav']

base_html = open('template.xhtml').read()

f = open('urls/codex', 'r')
for path in f:
    cache_path = 'cache/' + path.split('/').pop().strip() + '.html'
    if os.path.isfile(cache_path):
        text = open(cache_path, 'r').read()
    else:
        print(baseurl + path)
        r = requests.get(baseurl + path)
        if r.status_code == requests.codes.ok:
            text = r.text
            f = open(cache_path, 'w')
            f.write(text)
        else:
            print('Oops, the server barfed on', path)
            continue
    soup = BeautifulSoup(text, 'html.parser')
    base_content = BeautifulSoup(base_html, 'html.parser')
    # Scrape the title
    header = soup.find('div', attrs={'class': 'posts-page-content-header-title'})
    if header == None:
        print("Oops, server didn't send the content of the post with id", path)
        if os.path.isfile(cache_path): os.remove(cache_path)
        continue
    title = header.get_text()
    safe_title = title.lower().replace(' ', '-')
    h1 = soup.new_tag('h1')
    h1.string = title
    base_content.body.append(h1)
    # Scrape the content
    content = soup.find('div', attrs={'class': 'posts-page-content-body-html'})
    for x in content.children: base_content.body.append(x)
    # Write it into a Chapter
    chapter = epub.EpubHtml(title=title, file_name=safe_title+'.xhtml', lang='hr')
    chapter.content = base_content.prettify(formatter='html')
    # Add the chapter to the book
    book.add_item(chapter)
    toc.append(epub.Link(safe_title + '.xhtml', title, safe_title))
    spine.append(chapter)

book.toc = tuple(toc)

# add default NCX and Nav file
book.add_item(epub.EpubNcx())
book.add_item(epub.EpubNav())

with open('style/base.css') as style_file:
    css = epub.EpubItem(uid='style_nav', file_name='style/base.css', media_type='text/css', content=style_file.read())
    book.add_item(css)

# basic spine
book.spine = spine

# write to the file
epub.write_epub('output/codex.epub', book, {})
