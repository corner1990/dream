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

