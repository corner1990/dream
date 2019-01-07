const cheerio = require('cheerio')

const html = '<h2 class="title">hello world</h2>'

let $ = cheerio.load(html)

let title = $('h2.title')

title.text('test')
console.log($('h2.title').html())
