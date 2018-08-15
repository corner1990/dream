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
let zlib = require('zlib')
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
                // 文件状态
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
                   this.sendFile(req, res, p, statObj)
                }
            } catch (error) {
                this.sendError(error, req, res)
            }
        }
    }
    // 缓存
    chache (req, res, statObj) {
        // etag if-none-match
        // Last-Modified if-modified-since
        // Cache-Control Expires
        let ifNoneMatch = req.headers['if-none-match'] // 一般是一个md5: ctime + size 
        let ifModifiedSince = req.headers['if-modified-since'] // 文件的最新修改时间
        // 服务器上文件的最新修改时间
        let since  = statObj.ctime.toUTCString()
        // 服务器上的文件描述
        let etag = new Date(since).getTime() + '-' + statObj.size

        res.setHeader('ETag', etag)
        res.setHeader('Last-Modified', since)
        res.setHeader('Cache-Control', 'max-age=5000')
        // 如果不相等 则表示没有缓存 返回false
        if (ifNoneMatch !== etag) {
            return false
        }
        if (ifModifiedSince !== since) return false
        res.statusCode = 304
        res.end()
        // 如果相等 说明有缓存，返回true
        return true
    }
    // 压缩 
    compress (req, res, p, statObj) {
        let header =req.headers['accept-encoding']
        if (header) {
            if (header.match(/\bgzip\b/)) {
                res.setHeader('Content-Encoding', 'gzip')
                return zlib.createGzip()
            } else if (header.match(/\bdeflate\b/)) {
                res.setHeader('Content-Encoding', 'deflate')
                return zlib.createDeflate()
            } else {
                return false
            }
        }
        return false
    }
    // 分片传输
    range (req, res, p, statObj) {
        let range = req.headers['range']
        let start = 0;
        let end = statObj.size
        if (range) {
            let [, s, e] = range.match(/bytes=(\d*)-(\d*)/)
            start =  s ? parseInt(s) : start
            end = e ? parseInt(e) : e
            res.setHeader('Accept-Ranges', 'bytes')
            res.setHeader('Content-Range', `bytes ${start}-${end}/${statObj.size}`)
        }
        return fs.createReadStream(p, {start, end: end - 1})
    }
    // 发送文件
    sendFile (req, res, p, statObj) {
        // 文件 直接返回
        // 压缩 Accept-Encoding: gzip, deflate, br
        // Content-Encoding: gizp
        // 缓存 对比缓存 强制缓存
        if (this.chache(req, res, statObj)) return null
        // 断点续传 Rang:bytes=1-100
        // Accept-Range: bytes
        // Content-Range: bytes 1-10/800
        
        // 检测是或否需要分片下载，拿到文件流
        let rs = this.range(req, res, p, statObj)
        res.setHeader('Content-Type', mime.getType(p) + ';charset=utf8')
        let stream = this.compress(req, res, p, statObj)
        if (stream) {
            rs.pipe(stream).pipe(res)
        } else {
            rs.pipe(res)
        }
        
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