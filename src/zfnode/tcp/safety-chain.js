// // 防盗链实现
// //  这里主要是通过reffer和host做对比，如果不是当前域，则给一张无用的图片
// // 实现读取
// let fs = require('fs')
// let path = require('path')
// let url = require('url')

// let getHostName = referStr => {
// 	let { hostname } = url.parse(referStr)
// 	return hostname
// }
// const server = require('http').createServer((req, res) => {
// 	// 拿到refer
// 	let refer = req.headers['referer'] || req.headers['referrer']

// 	// 判断是否又refer，有可能没有refer
// 	// 读取文件，返回给浏览器
// 	let { pathname } = url.parse(req.url)
// 	// p代表我们要找的文件
// 	let p = path.join(__dirname, 'public', '.' + pathname) // 这里是请求文件

// 	// 判断请求的文件有没有，没有的话直接结束，有的话在读取文件
// 	fs.stat(p, err => {
// 		if (!err) {
// 			if (refer) {
// 				// 先看一下refer的值，还要看图片的请求路径
// 				let referHostName = getHostName(refer)
// 				let host = req.headers['host'].split(':')[0]

// 				if (referHostName != host) {
// 					// 防盗链
// 					fs.createReadStream(path.join(__dirname, 'public', './timg.jpeg')).pipe(res)
// 				} else {
// 					// 正常展示
// 					fs.createReadStream(p).pipe(res)
// 				}
// 			} else {
// 				// 正常展示
// 				fs.createReadStream(p).pipe(res)
// 			}
// 		} else {
// 			res.end()
// 		}
// 	})
// }).listen(5000)

// server.on('error', err => {
// 	if (err.code == 'EADDRINUSE') server.listen(++port)
// 	if (err) console.log(err)
// })

// // 当服务器错误时
// server.on('close', () => {
// 	console.log('服务端关闭')
// })


// 添加白名单，可以允许某个站点访问当前站点
// 防盗链实现
//  这里主要是通过reffer和host做对比，如果不是当前域，则给一张无用的图片
// 实现读取
let fs = require('fs')
let path = require('path')
let url = require('url')

let getHostName = referStr => {
	let { hostname } = url.parse(referStr)
	return hostname
}

let whiteList = ['www.demo.com']
const server = require('http').createServer((req, res) => {
	// 拿到refer
	let refer = req.headers['referer'] || req.headers['referrer']

	// 判断是否又refer，有可能没有refer
	// 读取文件，返回给浏览器
	let { pathname } = url.parse(req.url)
	// p代表我们要找的文件
	let p = path.join(__dirname, 'public', '.' + pathname) // 这里是请求文件

	// 判断请求的文件有没有，没有的话直接结束，有的话在读取文件
	fs.stat(p, err => {
		if (!err) {
			if (refer) {
				// 先看一下refer的值，还要看图片的请求路径
				let referHostName = getHostName(refer)
				let host = req.headers['host'].split(':')[0]
				// 这里判断， referHostName ！= host
				// 白名单 加入判断
				if (referHostName != host && !whiteList.includes(referHostName)) {
					// 防盗链
					fs.createReadStream(path.join(__dirname, 'public', './timg.jpeg')).pipe(res)
				} else {
					// 正常展示
					fs.createReadStream(p).pipe(res)
				}
			} else {
				// 正常展示
				fs.createReadStream(p).pipe(res)
			}
		} else {
			res.end()
		}
	})
}).listen(5000)

server.on('error', err => {
	if (err.code == 'EADDRINUSE') server.listen(++port)
	if (err) console.log(err)
})

// 当服务器错误时
server.on('close', () => {
	console.log('服务端关闭')
})


