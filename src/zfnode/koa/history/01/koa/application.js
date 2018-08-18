let http = require('http')
let context = require('./content')
let request = require('./request')

class Koa {
    constructor () {
        // 默认回调函数
        this.callbackFn = () => {}
        // 通常将外部变量挂载到this对象上，后边使用this获取
        this.context = context
        this.request = request
    }
    /**
     * @description 创建服务
     */
    listen () {
        // 创建服务
        let server = http.createServer(this.handleRequest())
        // 将创建服务的传入的参数直接传给server
        server.listen(...arguments)
    }
    use (fn) {
        this.callbackFn = fn
    }
    /**
     * @description 监听服务函数
     * @return {Function} fn 一个箭头函数(不会有this指向问题)
     */
    handleRequest () {
        // 如果说直接把函数作为参数在创建服务的时候this会出现问题，
        // 当我们使用箭头函数的时候，this可以保证是我们的实例
        return (req, res) => {
            // 创建上下文对象
            let ctx = this.createContext(req, res)
            this.callbackFn(ctx)
        }
    }
    /**
     * @description 创建ctx对象
     */
    createContext (req, res) {
        // 为了防止修原来的request，response对象，我们创建对象

        // 创建上下文
        let ctx = Object.create(this.context)
        // 创建request
        ctx.request = Object.create(this.request)
        ctx.req = ctx.request.req = req
        // ctx.res = res
        // 创建完成，返回对象
        return ctx
    }
}

module.exports = Koa