let {fork} = require('child_process')
let path = require('path')
let http = require('http')

let child = fork('http.js', {
    cwd: path.join(__dirname, 'test')
})

let server = http.createServer((req, res) => {
    res.end('父进程处理')
}).listen(5000)
// 发送进程到子进程
child.send('server', server)