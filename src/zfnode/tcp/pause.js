const net = require('net')

let server = net.createServer(scoket => {
  scoket.pause() // 暂停触发data事件
  // 超时  当客户端多长时间不访问，也可以触发一个函数，一般情况下 当时间到达后可以关闭客户端
  scoket.setTimeout(5000)
  scoket.on('data', data => {
    console.log(data.toString())
  })

  scoket.on('timeout', () => {
    scoket.resume()
  })
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
