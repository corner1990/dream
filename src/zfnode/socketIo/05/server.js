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
let users = [] // 保存用户
let SYS = '系统提示'
let t = new Date()
let rooms = []
io.on('connection', socket => {
    console.log('客户端连接到服务器')
    // 监听接受客户端发过来的消息
    socket.on('message', msg => {
        if (!socket.name) { // 第一次进入聊天
            socket.name = msg
            let message = {
                name: SYS,
                timer: t.getTime(),
                msg: `${msg} 进入聊天`
            }
            users.push(socket)
            socket.broadcast.emit('message', JSON.stringify(message))
        } else {
            // 像客户端发送数据
            if (!socket.room) { // 用户不在某个房间
                // 解析数据，看是否又私密聊天
                if (msg.match(/^@([^ ]+) (\S)+/)) {
                    let [, name, m] = msg.match(/^@([^ ]+) (\S)+/)
                    let so = users.filter(item => item.name === name)[0]
                    if (so) {
                        if (so.name === socket.name) {
                            let message = {
                                name: SYS,
                                timer: t.getTime(),
                                msg: '您不可以@自己！'
                            }
                            socket.emit('message', JSON.stringify(message))
                        } else {
                            let message = {
                                name: socket.name,
                                timer: t.getTime(),
                                msg: m
                            }
                            so.emit('message', JSON.stringify(message))
                        }

                    } else { // 如果不存在，则提示用户不存在
                        let message = {
                            name: SYS,
                            timer: t.getTime(),
                            msg: '你@的用户不存在！'
                        }
                        socket.emit('message', JSON.stringify(message))
                    }
                } else {
                    let message = {
                        name: socket.name,
                        timer: t.getTime(),
                        msg: msg
                    }
                    io.emit('message', JSON.stringify(message))
                }
            } else {
                if (msg.match(/^@([^ ]+) (\S)+/)) {
                    let [, name, m] = msg.match(/^@([^ ]+) (\S)+/)
                    let so = users.filter(item => item.name === name)[0]
                    if (so) {
                        if (so.name === socket.name) {
                            let message = {
                                name: SYS,
                                timer: t.getTime(),
                                msg: '您不可以@自己！'
                            }
                            socket.emit('message', JSON.stringify(message))
                            // socket.broadcast.to('myroom').emit('message', msg);
                        } else {
                            let message = {
                                name: socket.name,
                                timer: t.getTime(),
                                msg: m
                            }
                            so.to(socket.room).emit('message', JSON.stringify(message))
                        }

                    } else { // 如果不存在，则提示用户不存在
                        let message = {
                            name: SYS,
                            timer: t.getTime(),
                            msg: '你@的用户不存在！'
                        }
                        socket.emit('message', JSON.stringify(message))
                    }
                } else {
                    let message = {
                        name: socket.name,
                        timer: t.getTime(),
                        msg: msg
                    }
                    console.log('msg', msg, socket.name)
                    io.in(socket.room).emit('message', JSON.stringify(message))
                }
            }
           
        }
        
    })
    socket.on('disconect', function () {
        console.log('断开连接')
    })
    socket.on('error', () => {
        console.log('连接错误')
    })
    socket.on('join', room => {
        let roomName = socket.room
        
        socket.room = room
        let leaveRoom = roomName ? `, 自动从${roomName}房间退出` : ''
        let message = {
            name: SYS,
            timer: t.getTime(),
            msg: `您进入了 ${room} 房间${leaveRoom}`
        }
        let message2 = {
            name: SYS,
            timer: t.getTime(),
            msg: `${socket.name}进入了 ${room} 房间`
        }
        // 通知其他用户，有新人加入房间了
        io.in(room).emit('message', JSON.stringify(message2));
        // io.in(room).emit('message', JSON.stringify(message2))
        socket.emit('message', JSON.stringify(message))
    })
    socket.on('leave', room => {
        // 这里应该判断用户在不在该房间
        socket.room = ''
        socket.leave(room)
        let message = {
            name: SYS,
            timer: t.getTime(),
            msg: `您离开了 ${room} 房间`
        }
        let message2 = {
            name: SYS,
            timer: t.getTime(),
            msg: `${socket.name}离开了 ${room} 房间`
        }
        // 告诉房间其他用户有人离开了
        io.in(room).emit('message', JSON.stringify(message2))
        socket.emit('message', JSON.stringify(message))
        
    })
})

server.listen(9999)