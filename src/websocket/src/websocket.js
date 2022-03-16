const net = require('net');
const { EventEmitter } = require('events')
const crypto = require('crypto');

// websocket 默认code
const CODE = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
const OPER_CODE = {
    TEXT: 0,
    BINARY: 1,
}


// 处理accept key
const toAcceptKey = (wsKey) => {
    return crypto.createHash('sha1').update(`${wsKey}${CODE}`).digest('base64');
}


// 处理头部
const toHeaders = (rows) => {
    const headers = {};
    rows.forEach(row => {
        let [key, val] = row.split(': ');
        headers[key] = val;
    })
    return headers;
}
// websocket 服务
class SocketServe extends EventEmitter {
    constructor(options) {
        this.options = options;
        // 创建服务
        this.server = net.createServer(this.listener)
        // 监听端口
        this.server.listen(options.port)

    }

    // 服务处理函数
    listener = (socket) => {
        // 设置为长连接
        socket.setKeepAlive(true);
        // 发送消息
        socket.send = payload => {
            let _opcode ;
            // 处理数据 如果是字符串，需要转化为buf
            if(Buffer.isBuffer(payload)) {
                _opcode = OPER_CODE.BINARY;
            } else {
                _opcode = OPER_CODE.TEXT;
                payload = Buffer.from(payload);
            }

            // 处理长度
            let length = payload.length;
            // 创建一个指定长度的buf
            let buf = Buffer.alloc(2+length)
            buf[0] = 0b10000000 | _opcode;
            buf[1] = length;

            
        }

        socket.on('data', (chunk) => {
            if (chunk.toString().math(/Upgrade: websocket/)) {
                // 首次创建链接 升级协议
                this.upgrade(socket, chunk.toString())
            } else {
                // 处理消息
                this.onmessage(socket, chunk)
            }
        })
        this.emit('connection', socket)
    }

    // 升级协议
    upgrade = (socket, chunk) => {
        let rows = chunk.split('\r\n'); // 用分隔符分开头部和内容
        let headers = toHeaders(rows[1, -2]); // 去掉请求行和尾部的2个分隔符

        let wsKey = headers['Sec-WebSocket-key'];
        let acceptKey = toAcceptKey(wsKey);

        let response = [
            'HTTP/1.1 101 Switching Protocols',
            'Upgrade: websocket',
            `Sec-WebSocket-Accept: ${acceptKey}`,
            'Connection: Upgrade',
            '\r\n'
        ].join('\r\n')

        socket.write(response);

    }

    // 处理消息
    onmessage = (socket, chunk) => {
        let FIN = (chunk[0] & 0b10000000) === 0b10000000; // 根据FIN是否等于1， 1则表示结束，最后一份数据
        let opcode = chunk[0] & 0b00001111; // 取一个字节的后四位,得到的一个是十进制数
        let masked = (chunk[1] & 0b10000000) === 0b10000000; // 第一位是否是1
        let playloadLendth = chunk[1] & 0b01111111;// 取得内容数据的长度
        let payload;
        // 掩码处理
        if (masked) {
            let masteringKey = chunk.slice(2, 6); // 掩码
            payload = chunk.slice(6, playloadLendth);
            unmask(payload, masteringKey);
        }
        // if (FIN) {
        //     switch(opcode) {
        //         case OPER_CODE.TEXT:
        //             socket.emit('message', payload.toString());
        //             break;
        //         case OPER_CODE.BINARY:
        //             socket.emit('message', payload);
        //             break;
        //         default:
        //             break;
        //     }
        // }
        // 简单处理
        if (FIN) {
            let message = opcode === OPER_CODE.BINARY ? payload : payload.toString();
            socket.emit('message', message)
        }
    }
}

module.exports = SocketServe;