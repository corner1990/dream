const puppeteer = require('puppeteer');

let getPage = async (url) => {
  const browser = await puppeteer.launch({
  	headless: false,
  	timeout: 5000
  });
  const page = await browser.newPage();
  // 设置宽度
  // page.setViewport({
  //     width: 1366,
  //     height: 768,
  // });
  await page.goto(url);
  let res = await page.screenshot({path: 'example.png'});
  console.log('load', res)
  page.on('error', (err) => console.log('err!', err));
  await page.reload()
  page.on('load', () => console.log('Page loaded!'));
  // await browser.close();
}
module.exports = function () {
	getPage('https://www.1395p.com/pk10/kaijiang')
	// getPage('http://www.baidu.com')
	return async (ctx, next) => {
		next()
	}
}
