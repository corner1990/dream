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
let SYS = '系统提示'
let t = new Date()
//命名是用来实现隔离的
let sockets = {};

io.on('connection', socket => {
    console.log('客户端连接到服务器')
    let rooms = []
    let username;
    // 监听接受客户端发过来的消息
    socket.on('message', msg => {
        if (!username) { // 第一次进入聊天
            username = msg
            let message = {
                name: SYS,
                timer: t.getTime(),
                msg: `${msg} 进入聊天`
            }
            sockets[username] = socket
            socket.broadcast.emit('message', JSON.stringify(message))
        } else {
            // 像客户端发送数据
            if (rooms.length > 0) {
                for (let i = 0; i < rooms.length; i++) {
                    
                    if (msg.match(/^@([^ ]+) (\S)+/)) {
                        let [, name, m] = msg.match(/^@([^ ]+) (\S+)/)
                        if (name && sockets[username]) {
                            if (username === name) {
                                let message = {
                                    name: SYS,
                                    timer: t.getTime(),
                                    msg: '您不可以@自己！'
                                }
                                socket.emit('message', JSON.stringify(message))
                            } else {
                                let message = {
                                    name: username,
                                    timer: t.getTime(),
                                    msg: m
                                }
                                sockets[name].emit('message', JSON.stringify(message))
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
                            name: username,
                            timer: t.getTime(),
                            msg: msg
                        }
                        
                        io.in(rooms[i]).emit('message', JSON.stringify(message))
                    }
                }
            } else {
                // 解析数据，看是否又私密聊天
                if (msg.match(/^@([^ ]+) (\S)+/)) {
                    let [, name, m] = msg.match(/^@([^ ]+) (\S+)/)
                    if (name && sockets[username]) {
                        if (username === name) {
                            let message = {
                                name: SYS,
                                timer: t.getTime(),
                                msg: '您不可以@自己！'
                            }
                            socket.emit('message', JSON.stringify(message))
                        } else {
                            let message = {
                                name: username,
                                timer: t.getTime(),
                                msg: m
                            }
                            sockets[name].emit('message', JSON.stringify(message))
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
                        name: username,
                        timer: t.getTime(),
                        msg: msg
                    }
                    io.emit('message', JSON.stringify(message))
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
    socket.on('join', roomName => {
        
        let oldIndex = rooms.indexOf(roomName);
        if (oldIndex == -1) {
            socket.join(roomName);//相当于这个socket在服务器端进入了某个房间 
            rooms.push(roomName);
            let message = {
                name: SYS,
                timer: t.getTime(),
                msg: `您成功进入${roomName}房间了`
            }
            socket.emit('message', JSON.stringify(message))
        } else{ 
            let message = {
                name: SYS,
                timer: t.getTime(),
                msg: `您已经在${roomName}房间了`
            }
            socket.emit('message', JSON.stringify(message))
        }
        
       
        socket.on('joined', () => {
            let message = {
                name: SYS,
                timer: t.getTime(),
                msg: `您进入了 ${roomName} 房间`
            }
            socket.emit('message', JSON.stringify(message))
            // io.in(room).emit('message', JSON.stringify(message2));
        })
        // 通知其他用户，有新人加入房间了
        // io.in(room).emit('message', JSON.stringify(message2));
        // io.in(room).emit('message', JSON.stringify(message2))
       
    })
    socket.on('leave', roomName => {
        // 这里应该判断用户在不在该房间
        let oldIndex = rooms.indexOf(roomName);
        if (oldIndex !== -1) {
            socket.leave(roomName);//相当于这个socket在服务器端进入了某个房间 
            rooms.splice(oldIndex, 1);
            let message = {
                name: SYS,
                timer: t.getTime(),
                msg: `您离开${roomName}房间了`
            }
            socket.emit('message', JSON.stringify(message))
        } else {
            let message = {
                name: SYS,
                timer: t.getTime(),
                msg: `您已经不在${roomName}房间了`
            }
            socket.emit('message', JSON.stringify(message))
        }
        
        
    })
})

server.listen(9999)