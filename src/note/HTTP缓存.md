# HTTP缓存

### 缓存的作用

- 减少了冗余的`数据传输`，节省了网费。
- 减少了服务器的负担， 大大提高了网站的`性能`
- 加快了客户端加载网页的`速度`

### 缓存分类

- 强制缓存如果生效，不需要再和服务器发生交互，而对比缓存不管是否生效，都需要与服务端发生交互

- 两类缓存规则可以同时存在，强制缓存优先级高于对比缓存，也就是说，当执行强制缓存的规则时，如果缓存生效，直接使用缓存，不再执行对比缓存规则

- #### 强制缓存

   > 强制缓存，在缓存数据未失效的情况下，可以直接使用缓存数据，那么浏览器是如何判断缓存数据是否失效呢？ 我们知道，在没有缓存数据的时候，浏览器向服务器请求数据时，服务器会将数据和缓存规则一并返回，缓存规则信息包含在响应header中。 

- #### 对比缓存

   - 对比缓存，顾名思义，需要进行比较判断是否可以使用缓存。
   - 浏览器第一次请求数据时，服务器会将缓存标识与数据一起返回给客户端，客户端将二者备份至缓存数据库中。
   - 再次请求数据时，客户端将备份的缓存标识发送给服务器，服务器根据缓存标识进行判断，判断成功后，返回304状态码，通知客户端比较成功，可以使用缓存数据。

### 实现缓存

- 目录结构

  ```javascript
  demo
  |___server
  |___public
  	|___index.html
  	|___xiaoxin.jpg
  	|___index.js
  ```

### 页面代码

````html
// index.js
console.log('index')

//index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h1>hello</h1>
    <img src="/xiaoxin.jpg" alt="xiaoxin">
    <script src="/index.js"></script>
</body>
</html>
````

### 强制缓存

```javascript
// server.js
// 强制缓存 设置两个头 (第一次访问的时候请求服务器，在之后的一段时间内都不请求服务器)
// Expires 设置过期时间(绝对是件)
// CaChae-contro: max-age = 25900  按秒计算

// 当访问localhost:5000/index.htlm 返回对应的文件
let http = require('http')
let url = require('url')
let path = require('path')
let fs = require('fs')
// 获取文件后缀名
let mime = require('mime')

let server = http.createServer((req, res) => {
    let { pathname } = url.parse(req.url)
    // 拼接路径的时候也使用 . + pathname 是防止访问根目录，出现 c://的情况
    let p = path.join(__dirname, '/public', '.' + pathname)
    // 读取文件
    fs.stat(p, (err, stat) => {
        // 如果有文件，就发送文件，没有就发送错误
        if (!err) {
            sendFile(req, res, p)
        } else {
            sendError(res)
        }
        
    })
})


function sendFile (req, res, p) {
    let date = new Date(Date.now()+10*1000)
    // 设置强制缓存头
    res.setHeader('Expires', date.toUTCString())
    res.setHeader('Cache-Control', 'max-age=10')
    res.setHeader('Content-Type', mime.getType(p) + ';charset=utf8')
    fs.createReadStream(p).pipe(res)
}
function sendError (res) {
    res.statusCode = 404
    res.end()
}
let port = 5000

server.listen(port, 'localhost', () => {
  console.log(`server start ${port}`)
})

// 当服务端发生错误时，会调用监听函数
server.on('error', err => {
  if (err.code == 'EADDRINUSE') server.listen(++port)
  if (err) console.log(err)
})

// 当服务器错误时
server.on('close', () => {
  console.log('服务端关闭')
})
```

### 对比缓存

```javascript
// 对比缓存 第一次访问的时候设置一个标识， 下次请求的时候会携带这个标识，
// 这次你请求的时候，我用标识做对比，有区别的话就返回新的值，如果没有，就返回304

// 当访问localhost:5000/index.htlm 返回对应的文件
let http = require('http')
let url = require('url')
let path = require('path')
let fs = require('fs')
// 获取文件后缀名
let mime = require('mime')

let server = http.createServer((req, res) => {
    let { pathname } = url.parse(req.url)
    // 拼接路径的时候也使用 . + pathname 是防止访问根目录，出现 c://的情况
    let p = path.join(__dirname, '/public', '.' + pathname)

    fs.stat(p, (err, stat) => {
        // 根据修改时间判断
        // if-modified-since Last-Modified 
        if (!err) {
            let since = req.headers['if-modified-since']
            if (since) {
                if (since == stat.ctime.toUTCString()) {
                    res.statusCode = 304
                    res.end()
                } else {
                    sendFile(req, res, p, stat)
                }
            } else {
                // 如果没有 则直接发送
                sendFile(req, res, p, stat)
            }
        } else {
            sendError(res)
        }
        
    })
})


function sendFile (req, res, p, stat) {
    let date = new Date(Date.now()+10*1000)
    // 设置 响应头 为最后的修改时间
    res.setHeader('Last-Modified', stat.ctime.toUTCString())
    // 强制不走浏览器缓存
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Content-Type', mime.getType(p) + ';charset=utf8')
    fs.createReadStream(p).pipe(res)
}
function sendError (res) {
    res.statusCode = 404
    res.end()
}
let port = 5000

server.listen(port, 'localhost', () => {
  console.log(`server start ${port}`)
})

// 当服务端发生错误时，会调用监听函数
server.on('error', err => {
  if (err.code == 'EADDRINUSE') server.listen(++port)
  if (err) console.log(err)
})

// 当服务器错误时
server.on('close', () => {
  console.log('服务端关闭')
})
```

### 对比缓存`ETag`

```javascript
// 根据文件的内容的修改，尽心缓存
// E-tag: xxx (通常会使用md5文件摘要)
// ETag: MD5加密   if-none-match
// 当访问localhost:5000/index.htlm 返回对应的文件
let http = require('http')
let url = require('url')
let path = require('path')
let fs = require('fs')
let crypto = require('crypto')
// 获取文件后缀名
let mime = require('mime')

let server = http.createServer((req, res) => {
    let { pathname } = url.parse(req.url)
    // 拼接路径的时候也使用 . + pathname 是防止访问根目录，出现 c://的情况
    let p = path.join(__dirname, '/public', '.' + pathname)
    // 处理chrome默认请求favicon报错
    if ('/favicon.ico' == pathname) {
        res.statusCode = 404
        res.end()
    } else {
        fs.stat(p, (err, stat) => {
            // 根据内容修改判断
            //  ETag: MD5加密   if-none-match
            let md5 =crypto.createHash('md5')
            let rs = fs.createReadStream(p)
            // 为了节省性能 ，可以使用修改时间和大小做摘要  stat.ctime + stat.size
            rs.on('data', data => md5.update(data))
            rs.on('end', () => {
                let r = md5.digest('hex') //当前文件唯一标识
                // 下次再拿最新文件的加密值 和客户端来比较
                let ifNoneMatch = req.headers['if-none-match'] 
                if(r === ifNoneMatch) { //如果相等 直接返回
                    res.statusCode = 304
                    res.end()
                } else sendFile(req, res, p, r)
                
            })
            
        })

    }
    
})


function sendFile (req, res, p, r) {
    let date = new Date(Date.now()+10*1000)
    // 设置 响应头
    res.setHeader('Etag', r)
    // 强制不走浏览器缓存
    // res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Content-Type', mime.getType(p) + ';charset=utf8')
    fs.createReadStream(p).pipe(res)
}
function sendError (res) {
    res.statusCode = 404
    res.end()
}
let port = 5000

server.listen(port, 'localhost', () => {
  console.log(`server start ${port}`)
})

// 当服务端发生错误时，会调用监听函数
server.on('error', err => {
  if (err.code == 'EADDRINUSE') server.listen(++port)
  if (err) console.log(err)
})

// 当服务器错误时
server.on('close', () => {
  console.log('服务端关闭')
})
```

### 总结

> 以上是简单的缓存实现，分别有强制缓存，协议缓存，测试方式就是运行server.js， 然后在浏览器访问localhost:5000/index.html, 之后可以通过请求头和响应头看对应的缓存信息，在实际应用中可能会情况比较复杂，大多数都是所有的缓存都结合起来用，不过具体还是要看场景，还有要做一定的处理方法，不会这么简单粗暴的处理，我只给一个抛砖引玉的砖头。。。至于玉什么的，以后可能会有也可能不会有