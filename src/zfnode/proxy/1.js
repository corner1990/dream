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

