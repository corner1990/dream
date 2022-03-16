//  创建一个服务器
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path')

const server = http.createServer((req, res) => {
    const { pathname } = url.parse(req.url)

    if (['/index.html', '/index-post.html'].includes(pathname)) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        // 读取文件内容
        let content = fs.readFileSync(path.join(__dirname, 'static', pathname))

        res.write(content)
        res.end();
    } else if (pathname === '/get') {
        res.statusCode = 200;
        res.setHeader('Connect-Type', 'text/plain');
        res.write('get request');
        res.end();
    } else if (pathname === '/getList') {
        let buffers = [];

        // 处理分片上传
        req.on('data', data => {
            buffers.push(data);
        })
        req.on('end', (data) => {
            let body = Buffer.concat(buffers, data);
            console.log('body', body.toString())
            res.statusCode = 200;
            res.setHeader('Connect-Type', 'application/json');
            const arr = [1, 2, 3, 4, 5, 6]
            // res.write(Buffer.from(arr.toString()));
            // res.write(body);
            res.write(Buffer.from(JSON.stringify(arr)))
            res.end();
            
        })
        
    } else {
        res.statusCode = 404;
        res.end();
    }
})
// 监听端口
server.listen(3333)
