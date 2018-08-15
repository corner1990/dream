let config = require('./config')
let path = require('path')
let fs = require('fs')
let mime = require('mime')
let chalk = require('chalk')
let util = require('util')
let url = require('url')
let http = require('http')
let supervisor = require('supervisor')
let stat = util.promisify(fs.stat)
// debug后面放置的是参数，可以根据后边的参数决定是否打印
// debug 设置环境变量： set DEBUG=XXX
// powershell设置环境变量： $env:DEBUG = "*,-not_this"
let debug = require('debug')('static:app')
// var debug = require('debug');
// console.log(chalk.green('hello'))
// debug('app')

// supervisor 热更新模块
// npm install supervisor 
// 使用： supervisor app.js


// 创建服务
class Server {
    constructor () {
        this.config = config
    }
    start () {
        let {hostname, port} = this.config
        let server = http.createServer(this.handleRequest())
        let url = `http://${hostname}:${chalk.green(port)}`
        debug(url) // 打印日志
        server.listen(port, hostname)
        
    }
    // 服务器处理函数
    handleRequest () {
        // 在函数执行的时候需要返回一个函数，不然无法监听事件
        // 这里使用箭头函数可以避免this问题
        return async(req, res) => {
            // 解析路径
            let {pathname} = url.parse(req.url)
            // 拼接完整路径
            let p = path.join(this.config.dir, '.' + pathname)
            // 检测文件是否存在
            try {
                let statObj = await stat(p)
                // 判断 如果当前路径是目录，则展示内容列表，如果是文件直接展示文件内容
                if (statObj.isDirectory()) {
                    // 文件目录
                } else {
                    // 文件 直接返回
                    // 压缩
                    // 缓存
                    // 断点续传
                    console.log('request')
                    res.setHeader('Content-Type', mime.getType(p) + ';charset=utf8')
                    fs.createReadStream(p).pipe(res)
                }
            } catch (error) {
                res.statusCode = 404
                res.end()
            }
        }
    }
}

let server = new Server()
server.start()