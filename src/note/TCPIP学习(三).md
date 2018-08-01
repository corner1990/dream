# TCP/IP学习(三)

> node的tcp模块就是net，这里做一个简单的学习和api记录
>
> net模块的方法和http模块的使用方法基本上一直，这里做一个简单的记录

```javascript

const net = require('net')
// 创建一个tcp服务，里面放的是回调函数 监听函数
// scoket 套接字 是一个duplex 可以支持读操作和写操作
const server = net.createServer((scoket) => {
  // 当有请求的时候调用这个函数
  console.log('欢迎')
  // 使用telent 处理返回结果
  // scoket是一个可读写

  // 服务器最大连接数 默认是10
  server.maxConnections = 4 
  // 希望每次请求到来时都是一个提示，当前连接了多少个，一共连接了多少个
  server.getConnections ((err, count) => {
    // scoket 每次连接是都会创建一个新的scoket
    scoket.write(`当前最大容纳${server.maxConnections}, 现在${count}人`)
  })
  // 因为scoket是一个流，所以我们可以监听data事件拿到数据
  scoket.setEncoding = 'utf8'
  scoket.on('data', data => {
    console.log(data.toString())
    // close事件bio啊是服务端不在接收新的请求了，当前的还是可以用，当客户端全部关闭后会执行close事件
    // server.close()
    // 如果客户端都关闭了，服务端就关闭，如果有人进入，任然可以连接
    server.unref()
  })
  // 当客户端关闭连接的时候就会触发end事件
  scoket.on('end', () => {
    console.log('客户端关闭')
  })
})
// backlog 默认最大连接数
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
```





### 