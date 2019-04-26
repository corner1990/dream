// promisify
/*
需求： 我们现在经常使用promise方法，但是并不是所有的方法都支持promise回调，
我们就可以自己封装一个promsieify函数，将方法变成promsie函数
1. 使用fs.readFile左右做demoe、
 */
const fs = require('fs')
/**
 * @desc 将普通函数转化为promsie
 * @return {function} 返回包装后的promise函数
 */
function promisify (fn) {
	return function (...args) {
		return new Promise(function (resolve, reject) {
			fn(...args, function (err, ...args) {
				if (err) reject(err)
				resolve(res)
			})
		})
	}

}

let readFile = promisify(fs.readfile)
(async function read () {
	let one = await readFile('1.txt', 'utf8')
	let two = await readFile('2.txt', 'utf8')
	let three = await readFile('3.txt', 'utf8')

	console.log(one, two, three)
})()
