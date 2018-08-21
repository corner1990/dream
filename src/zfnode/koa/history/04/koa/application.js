let http = require('http')
let context = require('./content')
let request = require('./request')
let response = require('./response')
let Stream = require('stream')
let EventEmitter = require('events')

class Koa extends EventEmitter {
    constructor () {
        // 默认回调函数
        // this.callbackFn = () => {}
        super()
        this.middlewares = []
        // 通常将外部变量挂载到this对象上，后边使用this获取
        this.context = context
        this.request = request
        this.response = response
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
        // this.callbackFn = fn
        this.middlewares.push(fn)
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
            // 默认吧状态码设置为404， 等我们调用ctx.body赋值的时候重新修改code
            ctx.statusCode = 404
            // // 处理异步的问题
            // Promise.resolve(this.callbackFn(ctx))
            //     .then(() => res.end(ctx.body))
            // 组合后的中间件，并且是一个promise
            let composeMiddleWare = this.compose(ctx, this.middlewares)
            // 当所有的回调函数执行完毕以后，判断body进行处理
            Promise.resolve(composeMiddleWare).then(() => {
                let body = ctx.body
                // 如果对象为空，返回not found
                if (body == undefined) return res.end('Not Found')
                // 如果body是一个json对象，讲对象序列化再返回
                if (typeof body === 'object') return res.end(JSON.stringify(body))
                // 数字需要转为字符串
                if (typeof body === 'number') return res.end(`${body}`)
                // 如果对象是一个流，则返回流
                if (body in Stream) return body.pipe(res)
                res.end(body)
                
            }).catch(e => {
                // 处理错误
                res.statusCode = 500
                res.end('Internal Server Error')
                this.emit('error', e)
            })
            
        }
    }
    /**
     * @description 处理中间件
     * @return {Function} Promise 对象
     */
    compose (ctx, middlewares) {
        // 通过dispatch方式 处理回调函数
        function dispatch (index) {
            let midleware = middlewares[index]
            // 如果是是最后一个，则返回一个空对象
            if (middlewares.length == index) return Promise.resolve(() => {})
            return Promise.resolve(midleware(ctx, () => dispatch(index + 1)))
        }
        return dispatch(0)
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

        // 创建response
        ctx.response = Object.create(this.response)
        ctx.res = ctx.response.res = res
        // 创建完成，返回对象
        return ctx
    }
}

module.exports = Koa