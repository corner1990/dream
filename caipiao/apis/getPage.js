const puppeteer = require('puppeteer');

let getPage = async (url) => {
  const browser = await puppeteer.launch({
  	headless: false,
  	timeout: 5000
  });
  const page = await browser.newPage();
  // 设置宽度
  page.setViewport({
      width: 1366,
      height: 768,
  });
  await page.goto(url);
  page.screenshot({path: 'example.png'});
  page.on('error', (err) => console.log('err!', err));

  return page;
  // await browser.close();
}
/**
 * @desc 关闭首页弹窗
 * @param  {[type]}
 * @return {[type]}
 */
let closeDialog =  page => {
  return new Promise((resolve) => {
    setTimeout(() => {
      page.click('.ui-popup .ui-dialog-close');
      resolve(page)
    }, 3000)
  })
  // page.click('.lp_tb_more');
}
// 输入账号
let inputAccount = async page => {
  // page.$('select_date')
  let account = await page.$('#LOGIN-FORM .login-area .login-mane .input_tip')
  account.focus()
  // btn.click();
  console.log('btn')
  return page
}
module.exports = function () {
  getPage('https://www.hyl88.net/')
    .then(closeDialog)
    .then(inputAccount)
	// getPage('https://www.1395p.com/pk10/kaijiang')
	// getPage('http://www.baidu.com')
	return async (ctx, next) => {
		next()
	}
}
