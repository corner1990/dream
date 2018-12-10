let net = require('net')
let code = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
let crypto = require('crypto')

let express = require('express')
let app = express()
app.use(express.static(__dirname))
app.listen(8080)
/* 
基于.net开发一个websocket服务器，基于tcp服务器
*/
// 第一步 拿到header，就是请求头
// let server = net.createServer(( socket ) => {
//     // 监听客户端发来的信息
//     socket.once('data', data => {
//         data = data.toString()
//         // data 内容大概如下
//         /*  请求头
//             Request Method: GET
//             Connection: Upgrade // 请求升级协议
//             Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits
//             Sec-WebSocket-Key: BdHBU6Vo/0OMycVshRE3iQ== 
//             Sec-WebSocket-Version: 13 // 升级的版本
//             Upgrade: websocket // 升级的类型

//             */
//         let lines = data.split('\r\n')
//         let headers = lines.slice(1, -2)
//         // 处理字符串为一个对象
//         headers = headers.reduce((headers, line) => {
//             let [ key, val ] = line.split(': ')
//             headers[key] = val
//             return headers
//         }, {})
//         console.log('headers', headers)
//     })
// })

//  第二部 判断是否升级协议
let server = net.createServer(( socket ) => {
    // 监听客户端发来的信息
    socket.once('data', data => {
        data = data.toString();
        // data 内容大概如下
        /*  请求头
            Request Method: GET
            Connection: Upgrade // 请求升级协议
            Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits
            Sec-WebSocket-Key: BdHBU6Vo/0OMycVshRE3iQ== 
            Sec-WebSocket-Version: 13 // 升级的版本
            Upgrade: websocket // 升级的类型

            */
        let lines = data.split('\r\n')
        let headers = lines.slice(1, -2)
        // 处理字符串为一个对象 获取请求头
        headers = headers.reduce((headers, line) => {
            let [ key, val ] = line.split(': ')
            headers[key] = val
            return headers
        }, {});
        // console.log('headers', headers)
        /* 
        { Host: 'localhost:9999',
            Connection: 'Upgrade',
            Pragma: 'no-cache',
            'Cache-Control': 'no-cache',
            'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36',
            Upgrade: 'websocket',
            Origin: 'http://localhost:8080',
            'Sec-WebSocket-Version': '13',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'zh,zh-CN;q=0.9,en;q=0.8,en-AU;q=0.7',
            Cookie:
            'visit=10; visit.sig=VVIZcIDkunpRwQDicJGbWKrQhTE; hello=bf5b7610-d783-11e8-aa65-354f8f3423d3',
            'Sec-WebSocket-Key': 'qmuFW2gfEl4prcOwCqg7tA==',
            'Sec-WebSocket-Extensions': 'permessage-deflate; client_max_window_bits' }
         */
        // 判断是否升级协议
        // 如果Upgrade的知识websocket的话，则需要升级协议
        if (headers.Upgrade === 'websocket') {
            let key = headers['Sec-WebSocket-Key']
            let accept = crypto.createHash('sha1').update(key + code).digest('base64')
            // 处理响应头
            let response = [
                "HTTP/1.1 101 Switching Protocols",
                "Upgrade: websocket",
                "Connection: Upgrade",
                `Sec-WebSocket-Accept: ${accept}`,
                '\r\n'
            ].join('\r\n')
           
            socket.write(response)
            // 切换协议成功，开始监听客户端发来的消息
            socket.on('data', function (bufs)  {
                let FIN = (bufs[0] & 0b10000000) === 0b10000000 // 是否最后一帧
                let opcode = bufs[0] & 0b00001111 // 操作码 1文本，
                let isMasked = (bufs[1] & 0b100000000) === 0b100000000 // 对方是否掩码
                let payloadLength = bufs[1] & 0b01111111;//取得负载数据的长度
                let mask = bufs.slice(2, 6);//掩码 4个字节
                let payload = bufs.slice(6);//负载数据
                // console.log('FIN', FIN) // true
                // console.log('opcode', opcode) // 1
                // console.log(FIN, opcode, isMasked, payloadLength, mask, payload) 
                // true 1 false 6 <Buffer 04 6e 75 fe> <Buffer e0 d3 d5 1b a1 d3>

                for (let i = 0; i < payload.length; i++) {
                    payload[i] ^= mask[i % 4] // 为运算 相同是0， 不想同是1
                }

                // 处理返回值
                // console.log(FIN, opcode, isMasked, payloadLength, mask, payload.toString()) 
                let response = Buffer.alloc( 2 + payload.length )
                response[0] = 0b10000001
                response[1] = payload.length
                // 将payload buf对象从下标2开始拷贝到response中
                payload.copy(response, 2)
                socket.write(response)
            })
        }
    })
})
server.listen(9999)
