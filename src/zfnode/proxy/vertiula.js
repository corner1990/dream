// 反向代理
let httpProxy = require('http-proxy')
let http = require('http');
let hosts = {
  'www.test.com': 'http://localhost:5000',
  'www.demo.com': 'http://localhost:8000',
}

// 创建代理服务器
let proxy = httpProxy.createProxyServer()

let server = http.createServer((req, res) => {
  // 拿到host 访问对应的服务器
  let host = req.headers['host'].split(':')[0]
  console.log(host)
  console.log(hosts[host])
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