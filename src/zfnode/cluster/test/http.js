// 子进程处理父进程任务
let http = require('http')
process.on('message', (msg, server) => {
    http.createServer((req, res) => {
        res.end('child进程处理')
    }).listen(server)
})