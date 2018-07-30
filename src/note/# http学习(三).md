# http学习(三)

> 为了深入理解http服务，这里简单的模拟了一个HTTP，方便自己深入理解和学习

### 创建服务

```javascript
// 模拟http服务
const net = require('net')
/**
 * @description 解析scoket对象
 * @param {*} scoket 
 * @param {*} callback 
 */
function parser(scoket, callback) {}

let server = net.createServer(function (scoket) {
	parser(scoket, (req, res) => {
		console.log('res', res)
		server.emit('request', req, res)
	})
})

server.on('request', function (req, res) {
  console.log(req.url)
  console.log(req.headers)
  console.log(req.httpVersion)
	console.log(req.method)
	// console.log('res', res)
  req.on('data', data => {
    console.log('ok', data.toString())
  })
})
server.on('connection', () => console.log('建立连接'))

server.listen(3000)
```

### 解析请求内容

```javascript
// 模拟http服务
const net = require('net')
// 处理内容没有读取完整，拿到的内容乱码
let { StringDecoder } = require('string_decoder')

/**
 * @description 解析scoket对象
 * @param {*} scoket 
 * @param {*} callback 
 */
function parser(scoket, callback) {
  // 保存每次读取的数据到数组中
  let buffers = []
  let sd = new StringDecoder()
  function fn () {
    // 默认将缓存去的内容读干，读完后如果还有，会继续触发reabable事件
	let content = scoket.read()
    buffers.push(content)
    let str = sd.write(Buffer.concat(buffers))
    // 解析请求头和请求体
    if (str.match(/\r\n\r\n/)) {
      let result = str.split('\r\n\r\n')
      let head = parserHeader(result[0])
	  let body = result[1]
    }

  }
  scoket.on('readable', fn)
}
/**
 * @description 解析请求头
 * @param {string} head 
 */
function parserHeader(head) {
}
let server = net.createServer(function (scoket) {
	parser(scoket, (req, res) => {
		console.log('res', res)
		server.emit('request', req, res)
	})
})

server.on('request', function (req, res) {
  console.log(req.url)
  console.log(req.headers)
  console.log(req.httpVersion)
	console.log(req.method)
	// console.log('res', res)
  req.on('data', data => {
    console.log('ok', data.toString())
  })
})
server.on('connection', () => console.log('建立连接'))

server.listen(3000)
```

### 实现解析请求头

```javascript
// 模拟http服务
const net = require('net')
// 处理内容没有读取完整，拿到的内容乱码
let { StringDecoder } = require('string_decoder')

/**
 * @description 解析scoket对象
 * @param {*} scoket 
 * @param {*} callback 
 */
function parser(scoket, callback) {
  // 保存每次读取的数据到数组中
  let buffers = []
  let sd = new StringDecoder()
  function fn () {
    // 默认将缓存去的内容读干，读完后如果还有，会继续触发reabable事件
		let content = scoket.read()
    buffers.push(content)
    let str = sd.write(Buffer.concat(buffers))

    // 解析请求头和请求体
    if (str.match(/\r\n\r\n/)) {
      let result = str.split('\r\n\r\n')
      let head = parserHeader(result[0])
	  let body = result[1]
	  Object.assign(scoket, head)
        
      // 移除监听 防止多次调用
      scoket.removeListener('readable', fn)
      callback(scoket)
    }

  }
  scoket.on('readable', fn)
}
/**
 * @description 解析请求头
 * @param {string} head 
 */
function parserHeader(head) {
  let lines = head.split(/\r\n/)
  let starts = lines.shift()
  let startsArr = starts.split(' ')
  let method = startsArr[0]
  let url = startsArr[1]
  let httpVersion = startsArr[2]

  let headers = {}

  lines.forEach(line => {
    let row = line.split(': ')
    headers[row[0]] = row[1]
  })

  return { lines, url, method, httpVersion, headers}
}
let server = net.createServer(function (scoket) {
	parser(scoket, (req, res) => {
		console.log('res', res)
		server.emit('request', req, res)
	})
})

server.on('request', function (req, res) {
  console.log(req.url)
  console.log(req.headers)
  console.log(req.httpVersion)
  console.log(req.method)
  req.on('data', data => {
    console.log('ok', data.toString())
  })
})
server.on('connection', () => console.log('建立连接'))

server.listen(3000)
```

### 实现res.end的方法

```javascript
// 模拟http服务
const net = require('net')
// 处理内容没有读取完整，拿到的内容乱码

// 模拟触发end事件，创建可读流
let { Readable } = require('stream')
// 创建一个自定义可读流
class IncomingMessage extends Readable{
  _read () {}
}
let {StringDecoder} = require('string_decoder')
/**
 * @description 解析scoket对象
 * @param {*} scoket 
 * @param {*} callback 
 */
function parser(scoket, callback) {
  // 保存每次读取的数据到数组中
  let buffers = []
  let sd = new StringDecoder()
	let im = new IncomingMessage()
	let res = { write: scoket.write.bind(scoket), end: scoket.end.bind(scoket) }
  function fn () {
    // 默认将缓存去的内容读干，读完后如果还有，会继续触发reabable事件
		let content = scoket.read()
    buffers.push(content)
    let str = sd.write(Buffer.concat(buffers))

    // 解析请求头和请求体
    if (str.match(/\r\n\r\n/)) {
      let result = str.split('\r\n\r\n')
      let head = parserHeader(result[0])
			let body = result[1]
      // 这里使用scoket模拟流 (内部又封装了一个可读流 IncomingMessage)
			// Object.assign(scoket, head)
			Object.assign(im, head)
      // 移除监听 防止多次调用
      scoket.removeListener('readable', fn)
      // 这里把内容的部分放回去，在后边解析
			// scoket.unshift(Buffer.from(body))
			// 当push的内容为Null的时候，会触发end事件
			// 为了触发end事件做的兼容，不出发end事件，直接使用callback即可
			if (body.length) { //说明又请求体
				// 这里把内容的部分放回去，在后边解析
				scoket.unshift(Buffer.from(body))
				scoket.on('data', data => {
					im.push(data)
					im.push(null)
					callback(im, res)
				 })
			} else {
				// 没有请求提
				im.push(null)
				callback(im, res)
			}
			// 不触发end事件的简单写法
      // callback(scoket)
    }

  }
  scoket.on('readable', fn)
}
/**
 * @description 解析请求头
 * @param {string} head 
 */
function parserHeader(head) {
  let lines = head.split(/\r\n/)
  let starts = lines.shift()
  let startsArr = starts.split(' ')
  let method = startsArr[0]
  let url = startsArr[1]
  let httpVersion = startsArr[2]

  let headers = {}

  lines.forEach(line => {
    let row = line.split(': ')
    headers[row[0]] = row[1]
  })

  return { lines, url, method, httpVersion, headers}
}
let server = net.createServer(function (scoket) {
	parser(scoket, (req, res) => {
		console.log('res', res)
		server.emit('request', req, res)
	})
})

server.on('request', function (req, res) {
  console.log(req.url)
  console.log(req.headers)
  console.log(req.httpVersion)
	console.log(req.method)
	// console.log('res', res)
  req.on('data', data => {
    console.log('ok', data.toString())
  })

  req.on('end', () => {
	 res.end(`
http/1.1 200 OK
Content-Type: text/plain
Content-Length:11

helloworld
	 `)
  })
})
server.on('connection', () => console.log('建立连接'))

server.listen(3000)
```

