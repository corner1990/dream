let express = require('express')
let app = express()
app.use(express.static(__dirname))
app.listen(8080)


// =============================  //
// websocket 服务器分为两个部分，分别是服务端和客户端
let Server = require('ws').Server
// 创建一个websocket服务器示例， 监听的端口是7777
let server = new Server({port: 7777})

// 监听客户端的链接和发送过来的消息, socket 代表客户端的链接
// 例如a给b拨打电话，如果b接通了，则相当于他们之间建立的链接，connection
// 接通之后开始说话
server.on('connection', (socket) => {
    // 监听客户端发送过来的消息，相当于a的耳朵听到了b说的话
    socket.on('message', (message) => {
        console.log(message)
        socket.send(`服务器对你说：${message}`)
    })
})

/*  请求头

Connection: Upgrade // 请求升级协议
Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits
Sec-WebSocket-Key: BdHBU6Vo/0OMycVshRE3iQ== 
Sec-WebSocket-Version: 13 // 升级的版本
Upgrade: websocket // 升级的类型

*/


/*  响应头
Request URL: ws://localhost:7777/
Request Method: GET
Status Code: 101 Switching Protocols

Connection: Upgrade
Sec-WebSocket-Accept: PZtMUOJjlVV9PbrGTf6/aB9PvQo=
Upgrade: websocket

 */

