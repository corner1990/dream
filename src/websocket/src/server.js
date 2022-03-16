const { Server } = require('ws');

// 创建服务
const wsServer = new Server({
    port: 8888
});

// 监听连接
wsServer.on('connection', (socket) => {
    socket.on('message', (msg) => {
        console.log('msg', msg);
        //  给客户端发送消息
        socket.send(msg.toString())
    })
})