let express = require('express')
let http = require('http')

let app = express()
app.use(express.static(__dirname))
app.get('/', function (res, req) {
    res.header('Content-Type', 'text/html;charset=utf8')
    res.sendFile(path.resolve('index.html'))
})
let server = http.createServer(app)

// 因为websocket协议是要依赖http协议实现握手的，所以需要把httpServer的实例传递给socket.io
let socketIo = require('socket.io')
let io = socketIo(server)
// 在服务器监听客户端的链接
io.on('connection', socket => {
    console.log('客户端连接到服务器')
    // 监听接受客户端发过来的消息
    socket.on('message', msg => {
        console.log('客户端等候扫服务器的消息', msg)
        // 像客户端发送数据
        socket.send(`服务器说：${msg}`)
    })
    socket.on('disconect', function () {
        console.log('断开连接')
    })
    socket.on('error', () => {
        console.log('连接错误')
    })
})

server.listen(9999)