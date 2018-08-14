// 写一个服务器，客户端访问的时候返回支持的压缩文件
// Content-Encoding: gzip 服务端
// Accept-Encoding: gzip, deflate, br 客户端

let fs = require('fs')
let path = require('path')
let zlib = require('zlib')
let http = require('http')

let server = http.createServer(function(req, res) {
  let p = path.join(__dirname, './1.txt')
  let header = req.headers['accept-encoding']
  res.setHeader('Content-Type', 'text/html;charset=utf8')
  // 判断如果支持，则进行编码处理，不支持，则直接返回
  if (header) {
    // 根据支持的不同的压缩类型，压缩内容，然后返回给客户端，优先使用gzip
    if (header.match(/\bgzip\b/)) {
      let gzip = zlib.createGzip()
      res.setHeader('Content-Encoding', 'gzip')
      fs.createReadStream(p)
      .pipe(gzip)
      .pipe(res)

    } else if(header.match(/\bdeflate\b/)) {

      let deflate = zlib.createDeflate()
      res.setHeader('Content-Encoding', 'deflate')
      fs.createReadStream(p)
        .pipe(deflate)
        .pipe(res)
    } else {
      fs.createReadStream(p)
        .pipe(res)
    }
  } else {
    fs.createReadStream(p)
      .pipe(res)
  }
})

server.listen(5000)

// server启动成功
server.on('listening', () => {
  console.log('http启动完成')
})

// 关闭HTTP服务器
server.on('close', () => {
  console.log('服务器关闭')
})
