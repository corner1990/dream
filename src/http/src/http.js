// 实现http协议
const net = require('net');
const path = require('path');
const Parser = require('./Parser')

const server = net.createServer(socket => {
    // 监听客户端数据
    socket.on('data', data => {
        const request = data.toString();
        // const [ requestLine, ...headerRows ] = request.split('\r\n');
        // const [ method, url ] = requestLine.split(' ');
        // // 处理请求头
        // const headers = headerRows.slice(0, -2).reduce((memo, row) => {
        //     const [ key, val ] = row.split(': ');
        //     memo[key] = val;
        //     return memo;
        // }, {})

        const parser = new Parser();
        const {method, url, body} = parser.parser(request)

        console.log('method', method);
        console.log('url', url);
        console.log('headers', headers)

        // 构建响应
        const rows = [];
        rows.push('HTTP/1.1 200 OK');
        rows.push('Connect-Type: text/plain');
        rows.push(`Date: ${new Date().toGMTString()}`);
        rows.push('Connection: keep-alive');
        rows.push('Transfer-Encoding: chunked');
        // rows.push('')
        const body = 'get requst';
        
        rows.push(`Content-Length: ${Buffer.byteLength(body)}`);
        rows.push(`\r\n${Buffer.byteLength(body).toString(16)}\r\n${body}\r\n0`)
        
        const respnse = rows.join('\r\n');
        console.log('response', respnse);

        socket.end(respnse)


    })

})

server.listen(3333);

// HTTP/1.1 200 OK
// Connect-Type: text/plain
// Date: Sun, 27 Feb 2022 09:30:44 GMT
// Connection: keep-alive
// Keep-Alive: timeout=5
// Transfer-Encoding: chunked

