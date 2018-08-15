let config = require('./config')
let path = require('path')
let fs = require('fs')
let mime = require('mime')
let chalk = require('chalk')
let util = require('util')
let url = require('url')
let http = require('http')
let stat = util.promisify(fs.stat)
let ejs = require('ejs')

// debug后面放置的是参数，可以根据后边的参数决定是否打印
// debug 设置环境变量： set DEBUG=XXX
// powershell设置环境变量： $env:DEBUG = "*,-not_this"
let debug = require('debug')('static:app')
let templ = fs.readFileSync(path.join(__dirname, 'tmpl.ejs'), 'utf8')
let readDir = util.promisify(fs.readdir)
// var debug = require('debug');
// console.log(chalk.green('hello'))
// debug('app')

// supervisor 热更新模块
// npm install supervisor 
// 使用： supervisor app.js


// 创建服务
class Server {
    constructor () {
        // 设置配置参数， 列表模板
        this.config = config
        this.templ = templ
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
                    // 常用的模板引擎： ejs
                    // let content = ejs.render(this.templ, {dirs: [{path: 'a', name: 'a'}, {path: 'b', name: 'b'}]})
                    let dirs = await readDir(p) // 读取目录的文件路径
                    
                    dirs = dirs.map(dir => ({
                        name: dir,
                        path: path.join(pathname, dir)
                    }))
                    let content = ejs.render(this.templ, {dirs})
                    res.end(content)
                } else {
                    // 文件 直接返回
                    // 压缩
                    // 缓存
                    // 断点续传
                   this.sendFile(req, res, p)
                }
            } catch (error) {
                this.sendError(error, req, res)
            }
        }
    }
    // 发送文件
    sendFile (req, res, p) {
        res.setHeader('Content-Type', mime.getType(p) + ';charset=utf8')
        fs.createReadStream(p).pipe(res)
    }
    // 发送错误
    sendError (err, req, res) {
        debug(util.inspect(err).toString())
        res.statusCode = 404
        res.end()
    }
}

let server = new Server()
server.start()