const net = require('net')
const path = require('path')
let ws = require('fs').createWriteStream(path.join(__dirname, './1.txt'))
// http req,res
// pipe (readale， data不能同时使用)
let server = net.createServer(scoket => {
  // 监听客户端输入时， 将客户端输入的内容写入文件内容
  scoket.pipe(ws) // 客户端关闭以后，可写流也会被关闭
  // scoket.pipe(ws, {end: false}) // 这个可写流不关闭
  setTimeout(() => {
    ws.end() // 关闭可写流饿
    // 关闭管道
    scoket.unpipe(ws)
  }, 10000);
})

// 如果端口号被占用了怎么办
let port = 3000
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

// telnet IP地址 端口号 ： 可以连接服务器
