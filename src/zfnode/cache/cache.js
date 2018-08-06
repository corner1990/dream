// 对比缓存
// 强制缓存

// 当访问localhost:5000/index.htlm 返回对应的文件
let http = require('http')
let url = require('url')
let path = require('path')
let fs = require('fs')
// 获取文件后缀名
let mime = require('mime')

let server = http.createServer((req, res) => {
    let { pathname } = url.parse(req.url)
    let p = path.join(__dirname, '/public', '.' + pathname)

    fs.stat(p, (err, stat) => {
        if (!err) {
            sendFile(req, res, p)
        } else {
            sendError(res)
        }
        
    })
})


function sendFile (req, res, p) {
    res.setHeader('Content-Type', mime.getType(p) + ';charset=utf8')
    fs.createReadStream(p).pipe(res)
}
function sendError (res) {
    res.statusCode = 404
    res.end()
}
let port = 5000

server.listen(port, 'localhost', () => {
  console.log(`server start ${port}`)
})

// 当服务端发生错误时，会调用监听函数
server.on('error', err => {
  if (err.code == 'EADDRINUSE') server.listen(++port)
  if (err) console.log(err)
})

// 当服务器错误时
server.on('close', () => {
  console.log('服务端关闭')
})
