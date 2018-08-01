// 断点续传

// 客户端要发一个头 Range:bytes = 0 -1
// 服务端返回一个头
// Accept-Ranges:bytes
// COntent-Ranges: 0-10/总大小

const http = require('http')
const fs = require('fs')
const path = require('path')
const {promisify} = require('util')

const stat = promisify(fs.stat)

const server = http.createServer(async (req, res) => {
    // 拼接文件路径，读取文件大小
    let p = path.join(__dirname, 'content.txt')
    let statObj = await stat(p)
    let start = 0
    let end = statObj.size //可读流是包前包后
    let total = end
    // 读取文件大小
    
    // 读取请求头
    let range = req.headers['range']
    // 如果有请求头部，则进行分片读取
    if (range) {
        // 设置请求头，告诉浏览器支持分片下载
        res.setHeader('Accept-Ranges', 'bytes')
        // 拿到起始位置和结束为止
        let result = range.match(/bytes=(\d*)-(\d*)/)
        start = result[1] ? result[1] - 0 : start
        end = result[2] ? result[2] - 1 : end
        // 获取成功 并且文件总大小告诉客户端
        res.setHeader('Content-Range', `${start}-${end}/${total}`)
    }
    res.setHeader('Content-Type', 'text/plain;charset=utf8');
    fs.createReadStream(p, {start, }).pipe(res)
})

server.listen(3000)

// server启动成功
server.on('listening', () => {
  console.log('http启动完成')
  // 3秒后关闭服务器
})

// 关闭HTTP服务器

server.on('close', () => {
  console.log('服务器关闭')
})


// 服务器监听错误
server.on('error', e => {
  console.log(e)
}
)