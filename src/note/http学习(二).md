# http学习(二)

> 这里使用node自带的HTTP模块写一个简单的HTTP服务，用来理解服务端接到请求之后到响应客户端的简单的流程

### 新建一个HTTP服务

```javascript
const http = require('http')
const fs = require('fs')
const path = require('path')

// 这里可以使用浏览器方法当前服务器 http://localhost:3000/?name=leo&age=7#hea
// 或者使用curl 
// 在终端输入命令：curl http://localhost:3000/?name=leo&age=7#hea

// 创建一个服务
const server = http.createServer((req, res) => {
  // req 请求对象
  // res 响应对象
}) // 写法与下边相同

// 写法同上
// const server = http.createServer()
// server.on('request', (req, res) => {})
// 监听3000端口
// server.listen(port,[host],[backlog],[callback]);
// port 监听的端口号
// host 监听的地址
// backlog 指定位于等待队列中的客户端连接数
server.listen(3000)

```

### 启动HTTP服务

```javascript
const http = require('http')
const fs = require('fs')
const path = require('path')

// 这里可以使用浏览器方法当前服务器 http://localhost:3000/?name=leo&age=7#hea
// 或者使用curl 
// 在终端输入命令：curl http://localhost:3000/?name=leo&age=7#hea

// 创建一个服务
const server = http.createServer((req, res) => {
  // req 请求对象
    // method 请求的方法
    // url 请求的路径
    // headers 请求头对象
    // httpVersion 客户端的http版本
    // socket 监听客户端请求的socket对象
  // res 响应对象
    // res.setHeader('Content-Type', 'text/html;charset=utf-8');
    // res.getHeader('Content-Type');
    // res.removeHeader('Content-Type');
    // res.headersSent 判断响应头是否已经发送
  req.on('end', () => {
    // 这里设置响应内容
    res.setHeader('Content-Type','text/html;charset=utf-8');
    res.write('hello')
    res.end('world')
  })
}) // 写法与下边相同

// 写法同上
// const server = http.createServer()
// server.on('request', (req, res) => {})
// 监听3000端口
// server.listen(port,[host],[backlog],[callback]);
// port 监听的端口号
// host 监听的地址
// backlog 指定位于等待队列中的客户端连接数
server.listen(3000)

// server启动成功
server.on('listening', () => {
  console.log('http启动完成')
  // 3秒后关闭服务器
  // setTimeout(() => server.close(), 3000)
})

```

### 监听服务器关闭，错误，连接(connection)

```javascript
const http = require('http')
const fs = require('fs')
const path = require('path')

// 这里可以使用浏览器方法当前服务器 http://localhost:3000/?name=leo&age=7#hea
// 或者使用curl 
// 在终端输入命令：curl http://localhost:3000/?name=leo&age=7#hea

// 创建一个服务
const server = http.createServer((req, res) => {
  // req 请求对象
    // method 请求的方法
    // url 请求的路径
    // headers 请求头对象
    // httpVersion 客户端的http版本
    // socket 监听客户端请求的socket对象
  // res 响应对象
    // res.setHeader('Content-Type', 'text/html;charset=utf-8');
    // res.getHeader('Content-Type');
    // res.removeHeader('Content-Type');
    // res.headersSent 判断响应头是否已经发送
  req.on('end', () => {
    let result = Buffer.concat(body)
    // 这里设置响应内容
    res.write('hello')
    res.end('world')
    console.log(result.toString())
  })
}) // 写法与下边相同

// 写法同上
// const server = http.createServer()
// server.on('request', (req, res) => {})
// 监听3000端口
// server.listen(port,[host],[backlog],[callback]);
// port 监听的端口号
// host 监听的地址
// backlog 指定位于等待队列中的客户端连接数
server.listen(3000)

// server启动成功
server.on('listening', () => {
  console.log('http启动完成')
  // 3秒后关闭服务器
  // setTimeout(() => server.close(), 3000)
})

// 关闭HTTP服务器
// server.close();
// server.on('close', function () { });
server.on('close', () => {
  console.log('服务器关闭')
})


// 服务器监听错误
server.on('error', e => {
  console.log(e)
  // e 打印结果如下
  // {
  //   Error: listen EADDRINUSE::: 3000
  //   at Object._errnoException(util.js: 1024: 11)
  //   at _exceptionWithHostPort(util.js: 1046: 20)
  //   at Server.setupListenHandle[as _listen2](net.js: 1352: 14)
  //   at listenInCluster(net.js: 1393: 12)
  //   at Server.listen(net.js: 1477: 7)
  //   at Object.<anonymous>(/Users/a002 / Documents / dream / src / zfnode / tcp / http.js: 16: 8)
  //   at Module._compile(module.js: 612: 30)
  //   at Object.Module._extensions..js(module.js: 623: 10)
  //   at Module.load(module.js: 531: 32)
  //   at tryModuleLoad(module.js: 494: 12)
  //   code: 'EADDRINUSE',
  //   errno: 'EADDRINUSE',
  //   syscall: 'listen',
  //   address: '::',
  //   port: 3000 
  // }
  if (e.code == 'EADDRINUSE') console.log('端口号已经被占用!')
})

// 建立连接 connection
server.on('connection', e => {
  // e 是一个scoket对象
  // console.log(e)
  console.log('客户端连接已经建立')
});

// 设置超时
// setTimeout 设置超时时间，超时后不可再复用已经建立的连接，需要发请求需要重新建立连接。默认超时时间时2分钟
// server.setTimeout(msecs, callback);
server.on('timeout', () => console.log('连接已经超时'))


```

### 获取客户端请求内容

```javascript
const http = require('http')
const fs = require('fs')
const path = require('path')

// 这里可以使用浏览器方法当前服务器 http://localhost:3000/?name=leo&age=7#hea
// 或者使用curl 
// 在终端输入命令：curl http://localhost:3000/?name=leo&age=7#hea

// 创建一个服务
const server = http.createServer((req, res) => {
  // req 请求对象
    // method 请求的方法
    // url 请求的路径
    // headers 请求头对象
    // httpVersion 客户端的http版本
    // socket 监听客户端请求的socket对象
  // res 响应对象
    // res.setHeader('Content-Type', 'text/html;charset=utf-8');
    // res.getHeader('Content-Type');
    // res.removeHeader('Content-Type');
    // res.headersSent 判断响应头是否已经发送

  // 获取客户端请求信息
  if (req.url != '/favicon.ico') {
    let out = fs.createWriteStream(path.join(__dirname, 'request.log'));
    out.write('method=' + req.method + '\r\n')
    out.write('url=' + req.url + '\r\n')
    out.write('headers=' + JSON.stringify(req.headers) + '\r\n')
    out.write('httpVersion=' + req.httpVersion + '\r\n')
    //  写入效果大致如下
    // method = GET
    // url = /?name=leo&age=7
    // headers = { "host": "localhost:3000", "connection": "keep-alive", "cache-control": "max-age=0", "upgrade-insecure-requests": "1", "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36", "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8", "accept-encoding": "gzip, deflate, br", "accept-language": "zh-CN,zh;q=0.9,en;q=0.8" }
    // httpVersion = 1.1
  }

  let body = []
  req.on('data', data => {
    body.push(data)
  })
  req.on('end', () => {
    let result = Buffer.concat(body)
    // 这里设置响应内容
    res.setHeader('Content-Type','text/html;charset=utf-8')
    res.write('hello')
    res.end('world')
    console.log(result.toString())
  })
}) // 写法与下边相同

// 写法同上
// const server = http.createServer()
// server.on('request', (req, res) => {})
// 监听3000端口
// server.listen(port,[host],[backlog],[callback]);
// port 监听的端口号
// host 监听的地址
// backlog 指定位于等待队列中的客户端连接数
server.listen(3000)

// server启动成功
server.on('listening', () => {
  console.log('http启动完成')
  // 3秒后关闭服务器
  // setTimeout(() => server.close(), 3000)
})

// 关闭HTTP服务器
// server.close();
// server.on('close', function () { });
server.on('close', () => {
  console.log('服务器关闭')
})


// 服务器监听错误
server.on('error', e => {
  console.log(e)
  // e 打印结果如下
  // {
  //   Error: listen EADDRINUSE::: 3000
  //   at Object._errnoException(util.js: 1024: 11)
  //   at _exceptionWithHostPort(util.js: 1046: 20)
  //   at Server.setupListenHandle[as _listen2](net.js: 1352: 14)
  //   at listenInCluster(net.js: 1393: 12)
  //   at Server.listen(net.js: 1477: 7)
  //   at Object.<anonymous>(/Users/a002 / Documents / dream / src / zfnode / tcp / http.js: 16: 8)
  //   at Module._compile(module.js: 612: 30)
  //   at Object.Module._extensions..js(module.js: 623: 10)
  //   at Module.load(module.js: 531: 32)
  //   at tryModuleLoad(module.js: 494: 12)
  //   code: 'EADDRINUSE',
  //   errno: 'EADDRINUSE',
  //   syscall: 'listen',
  //   address: '::',
  //   port: 3000 
  // }
  if (e.code == 'EADDRINUSE') console.log('端口号已经被占用!')
})

// 建立连接 connection
server.on('connection', e => {
  // e 是一个scoket对象
  // console.log(e)
  console.log('客户端连接已经建立')
});

// 设置超时
// setTimeout 设置超时时间，超时后不可再复用已经建立的连接，需要发请求需要重新建立连接。默认超时时间时2分钟
// server.setTimeout(msecs, callback);
server.on('timeout', () => console.log('连接已经超时'))


```

### 总结

> 通过上边几十行代码，我们写了一个简单的HTTP服务，并认识到了我们拿到的req，和res是两个scoket对象，以及简单的几种情况监听，在下一节将模拟写一个http的实现，方便跟深入的理解http，为之后学习框架打好基础