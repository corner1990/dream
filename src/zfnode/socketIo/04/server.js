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

io.on('connection', socket => {
    console.log('客户端连接到服务器')
    // 监听接受客户端发过来的消息
    socket.on('message', msg => {
        if (!socket.name) {
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
        }
        
    })
    socket.on('disconect', function () {
        console.log('断开连接')
    })
    socket.on('error', () => {
        console.log('连接错误')
    })
})

server.listen(9999)