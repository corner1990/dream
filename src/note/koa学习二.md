# koa学习二

> 之前完成了request的封装，现在封装response对象，并挂载response对象到ctx上

### applaction.js

```javascript
let http = require('http')
let context = require('./content')
let request = require('./request')
let response = require('./response')

class Koa {
    constructor () {
        // 默认回调函数
        this.callbackFn = () => {}
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
            // 处理异步的问题
            Promise.resolve(this.callbackFn(ctx))
                .then(() => res.end(ctx.body))
            
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

        // 创建response
        ctx.response = Object.create(this.response)
        ctx.res = ctx.response.res = res
        // 创建完成，返回对象
        return ctx
    }
}

module.exports = Koa
```

### content.js

```javascript
/**
 * @description proto koa封装的ctx对象
 */

 // context 代理request和response属性
 // 设置getter和setter
 let proto = {}
/**
 * @description 代理函数
 * @param {string} property 需要代理的属性
 * @param {string} name 需要拿到的值
 * 
 * 使用方式：
 *   ctx.query = ctx.request.query
 *   让proto代理requ上的query属性
 *   delateGetter('request', 'query')
 */
 function delateGetter (property, name) {
    //  __defineGetter__ 不推荐使用
    // 该__defineGetter__方法将对象的属性绑定到要在查找该属性时调用的函数。
    //  语法：obj .__ defineGetter __（prop，func）
    // prop
    // 一个字符串，包含要绑定到给定函数的属性的名称。
    // func
    // 要绑定到指定属性的查找的函数。

     proto.__defineGetter__(name, function () {
         return this[property][name]
     })
 }

// proto === ctx
//  ctx.query = ctx.request.query
/**
 * @description 设置参数
 * @param {string} property 
 * @param {sgring} name 
 */
function delateSetter (property, name) {
    proto.__defineSetter__(name, function (val) {
        this[property][name] = val
    })
}
// 让proto代理requ上的query属性
delateGetter('request', 'query')
delateGetter('request', 'method')
delateGetter('response', 'body')

// 设置代码
delateSetter('response', 'body')
module.exports = proto

```

### response.js

```javascript
// 自己封装的 response 对象
let response = {
    get body () {
        return this._body
    },
    set body (body) {
        this._body = body
    }
}

module.exports = response

```

### 总结

> 到了这里就完成了response对象的封装和挂载，下一接处理`next`回调

