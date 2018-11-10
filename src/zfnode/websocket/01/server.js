let express = require('express')
let app = express()
app.use(express.static(__dirname))
app.listen(8080)


// =============================  //
// websocket 服务器分为两个部分，分别是服务端和客户端
let Server = require('ws').Server
// 创建一个websocket服务器示例， 监听的端口是8888
let server = new Server({port: 8888})

// 监听客户端的链接和发送过来的消息, socket 代表客户端的链接
// 例如a给b拨打电话，如果b接通了，则相当于他们之间建立的链接，connection
// 接通之后开始说话
server.on('connection', (socket) => {
    // 监听客户端发送过来的消息，相当于a的耳朵听到了b说的话
    scoket.on('message', (message) => {
        console.log(message)
        scoket.send(`服务器对你说：${message}`)
    })
})