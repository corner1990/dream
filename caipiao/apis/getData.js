const axios = require('axios')
const cheerio=require('cheerio');
/**
 * @desc 获取html字符串
 * @param  {string} 请求地址
 * @param  {object} 请求携带的参数
 * @return {promise} promise对象
 */
async function getHtml (url, options) {
	return axios.get(url, options)
		.then(checkSatus)
		.then(parseHtml)
}
let checkSatus = ({status, data, config}) => {
	if (status === 200) return data
	console.log('抓取页面失败', config)
}
/**
 * @desc 将html 字符串转换为dom树
 * @param  {string} 获取到的HTML字符串
 * @return {dom} 返回加载后的dom
 */
let parseHtml = (html) => (cheerio.load(html));
/**
 * @desc 获取文件
 * @param  {string} dom选择器
 * @return {object} 获取到的dom文档
 */
let getWrap = (...args) => $ => $(...args);
module.exports = function () {
	getHtml('https://juejin.im/')
		.then(getWrap('#juejin'))
		.then(res => {
			console.log('res', res.text())
		})

	return async (ctx, next) => {
		next()
	}
}
