# HTTP之proxy

> Web 代理是一种存在于网络中间的实体，提供各式各样的功能。现代网络系统中，Web 代理无处不在。

### 提高访问速度。

> 因为客户要求的数据存于代理服务器的硬盘中，因此下次这个客户或其它客户再要求相同目的站点的数据时，就会直接从代理服务器的硬盘中读取，代理服务器起到了缓存的作用，对热门站点有很多客户访问时，代理服务器的优势更为明显。

### Proxy可以起到防火墙的作用。

> 因为所有使用代理服务器的用户都必须通过代理服务器访问远程站点，因此在代理服务器上就可以设置相应的限制，以过滤或屏蔽掉某些信息。这是局域网网管对局域网用户访问范围限制最常用的办法，也是局域网用户为什么不能浏览某些网站的原因。拨号用户如果使用代理服务器，同样必须服从代理服务器的访问限制，除非你不使用这个代理服务器。

### 通过代理服务器访问一些不能直接访问的网站。

> 互联网上有许多开放的代理服务器，客户在访问权限受到限制时，而这些代理服务器的访问权限是不受限制的，刚好代理服务器在客户的访问范围之内，那么客户通过代理服务器访问目标网站就成为可能。国内的高校多使用教育网，不能出国，但通过代理服务器，就能实现访问因特网，这就是高校内代理服务器热的原因所在。

### 安全性得到提高。

> 无论是上聊天室还是浏览网站，目的网站只能知道你来自于代理服务器，而你的真实IP就无法测知，这就使得使用者的安全性得以提高。

###  代理服务器工作流程

1. 当客户端A对web服务器请求时,此端提出请求时,此请求会首先发送到代理服务器.
2. 代理服务器接收到客户端请求后,会检查缓存中是否存有客户端所需要的数据.
3. 如果代理服务器没有客户端A所请求的数据,它将会向WEB器提交请求.
4. WEB服务器响应请求的数据.
5. 代理服务器向客户端A转发Web服务器的数据.
6. 客户端B访问web服务器,向代理服务器发出请求.
7. 代理服务器查找缓存记录,确认已经存在WEB服务器的相关数据.
8. 代理服务器直接回应查询的信息,而不需要再去服务器进行查询,从而达到节约网络流量和提高访问的速度目的.

### 正向代理

> 正向代理通常用户知道的，比如我们使用google，或者访问公司内部网络的时候。。。
>
> 这里使用一个node的模块http-proxy展示一个简单正向代理示例

```javascript
// 新建一个demo文件加
// 新建一个server.js 8000.js

// server.js内容
// 正向代理 ：如axios，http.proxy 用户直到，类似于梯子
// 反向代理 ：nginx 解决用户请求的，用户不知道

// 使用http-proxy 进行正向代理
var http = require('http');
var httpProxy = require('http-proxy')

// 创建代理服务器
let proxy = httpProxy.createProxyServer()

let server = http.createServer((req, res) => {
  proxy.web(req, res, {
    target: 'http://localhost:8000'
  })
})

 server.listen(3000)
// server启动成功
server.on('listening', () => {
  console.log('http启动完成')
})

// 关闭HTTP服务器

server.on('close', () => {
  console.log('服务器关闭')
})


// 8000.js 内容
let http = require('http')

let server = http.createServer((req, res) => {
  res.write('this is port 8000')
  res.end()
})

server.listen(8000)

// server启动成功
server.on('listening', () => {
  console.log('http启动完成')
})

// 关闭HTTP服务器
server.on('close', () => {
  console.log('服务器关闭')
})

// 配置host文件 把www.test.com www.demo.com配置为本地
// 启动server.js的服务
// 启动8000的服务
// 我们在客户端访问localhost:3000就会拿到服务器返回的结果 this is port 8000

```

### 反向代理

> 用户是无感知的，主要是为了减轻服务器压力，或者做cdn缓存，
>
> 对用用户来说，他访问www.baidu.com只知道访问的是这个域名，并不知道具体是那个服务器做的处理，通常在项目中我们回使用nginx配置代理，实现负载均衡...
>
> 下边是一个简单的demo

```javascript
// 在当前目录新建一个proxy.js, 新建一个5000.js

/*
* proxy.js内容
*/
// 反向代理
let httpProxy = require('http-proxy')
let http = require('http');
// 这是我们配置的域名，我们可以访问这些域名，拿到对应的结果
let hosts = {
  'www.test.com': 'http://localhost:5000',
  'www.demo.com': 'http://localhost:8000',
}

// 创建代理服务器
let proxy = httpProxy.createProxyServer()

let server = http.createServer((req, res) => {
  // 拿到host 访问对应的服务器
  let host = req.headers['host'].split(':')[0]
  proxy.web(req, res, {
    target: hosts[host]
  })
})

server.listen(3000)
// server启动成功
server.on('listening', () => {
  console.log('http启动完成')
})

// 关闭HTTP服务器
server.on('close', () => {
  console.log('服务器关闭')
})


/*
* 5000.js
*/
let http = require('http')

let server = http.createServer((req, res) => {
  res.write('this is port 5000')
  res.end()
})

server.listen(5000)

// server启动成功
server.on('listening', () => {
  console.log('http启动完成')
})

// 关闭HTTP服务
server.on('close', () => {
  console.log('服务器关闭')
})

// 启动8000.js的服务
// 启动5000.js的服务
// 启动proxy.js的服务
//在浏览器访问 www.test.com:3000， www.demo.com:3000 

```

### 总结

> 以上就是简单的代理的利用，方便自己对代理的理解和认识，做一个引子。。。。