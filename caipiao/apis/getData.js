const puppeteer = require('puppeteer');
const browser = await puppeteer.launch();

(async () => {
  const page = await browser.newPage();
  await page.goto('http://beijingsaiche.com/pk10/index.html?PageSize=175&SearchDate=2019-03-30');
  page.once('load', () => {
    console.log(page)
    console.log('Page loaded!')
  });

  await browser.close();
})();