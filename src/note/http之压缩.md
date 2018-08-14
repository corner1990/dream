# http之压缩

> 在学习HTTP的时候我们会发现所有的HTTP请求和响应头都是独立的知识点，相互之间并没有关联，只有在实际的项目中，我们可能会用到多个响应头的设置。例如缓存，我们通常会使用协议缓存，强缓存，和ETAG，为了减少数据传输报的内同，我们通常会使用压缩来节省流量，这里学习一下node的压缩模块

### zlib

> 要学习压缩，首先要了解两个头， Content-Encoding: gzip 服务端 ，Accept-Encoding: gzip, deflate, br 客户端， 我们根据客户端支持的压缩模式，进行压缩文件，然后返回给客户端，并设置响应头，告诉客户端用那种方式解压文件， 下边是zlib的使用方式

```javascript
// Content-Encoding: gzip 服务端
// Accept-Encoding: gzip, deflate, br 客户端

let fs = require('fs')
let path = require('path')
let zlib = require('zlib')
/**
 * 压缩指定的文件
 * @param {string} src 资源的路径
 */
function zip (src) {
  let pathInfo = path.parse(src) // 拿到解析后的路径信息
  // {
  //   root: '/',
  //     dir: '/Users/a002/Documents/dream/src/zfnode/cache',
  //       base: '1.txt',
  //         ext: '.txt',
  //           name: '1'
  // }
  // 压缩流， 转化流
  let gzip = zlib.createGzip()
  // 读取文件，压缩文件，保存压缩后的文件
  fs.createReadStream(src)
    .pipe(gzip)
    .pipe(fs.createWriteStream(`${pathInfo.dir}/${pathInfo.name}.gz`))
}

/**
 * 
 * @param {String} src 需要解压的资源的全部路径
 */
function unzip (src) {
  let pathInfo = path.parse(src) // 拿到解析后的路径信息
  // 创建一个转化流
  let gunzip = zlib.createGunzip()
  // 读取资源，进行转化，保存转化后的文件
  fs.createReadStream(src)
    .pipe(gunzip)
    .pipe(fs.createWriteStream(`${pathInfo.dir}/${pathInfo.name}${pathInfo.name}.txt`))
}

// 压缩文件
// zip(path.join(__dirname, './1.txt'))
// 解压文件
unzip(path.join(__dirname, './1.gz'))
```

### 这里是一个简单的服务端的用例

```javascript
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
      // 如果没有支持的压缩方式，直接返回资源
      fs.createReadStream(p)
        .pipe(res)
    }
  } else {
     // 如果没有支持的压缩方式，直接返回资源
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

```

### 总结

> 以上就是简单的服务端压缩，然后设置响应头，高速浏览器怎么解析，上边展示了使用gzip和deflate两种模式，没有特别高深的东西，就是简单的api调用