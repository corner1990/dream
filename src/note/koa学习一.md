# koa学习一

> koa作为学习node来说是一个很不错的框架，简单轻巧易上手，哈哈哈，然后美美的吧异步代码写成同步，明显是居家旅行必备的好东西啊！！

### 项目基本架构

```javascript
project
│   README.md
│   koa.js //用来在开发的时候调用框架
│
└───koa
│   │   application.js //主程序
│   │   content.js  // 封装ctx对象
│   │	request.js	// 封装的request对象
│   │	response.js // 封装response对象

```

### koa简单的使用和参数

>  koa 是一个类，有两个方法，一个叫做use 一个叫做listen

```javascript
const Koa = require('koa');
const app = new Koa();

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// logger

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

// response

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);

```

### 上下文(Context)

Koa Context 将 node 的 request 和 response 对象封装到单个对象中，为编写 Web 应用程序和 API 提供了许多有用的方法

- ctx.request; // 这是 koa Request
- ctx.response; // 这是 koa Response
- ctrx.req //原始的http请求对象
- ctx.res //原始的http响应对象
- ctx.app 应用程序实例引用
- ctx.request是Koa2中context经过封装的请求对象

> 绕过 Koa 的 response 处理是 不被支持的

### 获取请求参数

```js
const Koa = require('koa');
const app = new Koa();
app.use(async (ctx) => {
    console.log(ctx.method); //获取请求方法
    console.log(ctx.url);    //获取请求URL
    console.log(ctx.query);  //获取解析的查询字符串对象
    console.log(ctx.querystring); //根据 ? 获取原始查询字符串.
    console.log(ctx.headers);//获取请求头对象
    ctx.body = ctx.url;
});

app.listen(3000, () => {
    console.log('server is starting at port 3000');
});
```

### 获取请求体

```javascript
const Koa = require('koa');
const querystring = require('querystring');
const app = new Koa();
app.use(async (ctx) => {
    if (ctx.method == 'GET') {
        ctx.set('Content-Type', 'text/html;charset=utf-8');
        ctx.body = (
            `
            <form method="POST">
               <input name="username" >
               <input type="submit">
            </form>
            `
        );
    } else if (ctx.method == 'POST') {
        ctx.set('Content-Type', 'application/json');
        ctx.body = await parseBody(ctx);
    } else {
        ctx.body = 'Not Allowed';
    }
});
function parseBody(ctx) {
    return new Promise(function (resolve, reject) {
        let buffers = [];
        ctx.req.on('data', function (data) {
            buffers.push(data);
        });
        ctx.req.on('end', function (data) {
            let body = buffers.toString();
            body = querystring.parse(body);
            resolve(body);
        });
        ctx.req.on('error', function (errdata) {
            reject(err);
        });
    });
}

app.listen(3000, () => {
    console.log('server is starting at port 3000');
});
```

### 下边实现koa

> 完成基本结构，request对象，上下文对象

```javascript
/*
* kao.js 内容
*/
const Koa = require('./applcation');
const app = new Koa();
app.use(async (ctx) => {
    console.log(ctx.method); //获取请求方法
    console.log(ctx.url);    //获取请求URL
    console.log(ctx.query);  //获取解析的查询字符串对象
    console.log(ctx.querystring); //根据 ? 获取原始查询字符串.
    console.log(ctx.headers);//获取请求头对象
    ctx.body = ctx.url;
});

app.listen(3000, () => {
    console.log('server is starting at port 3000');
});



```

### applaction.js

```javascript
/*
* applaction 内容
*/

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
     proto.__defineGetter__(name, function () {
         return this[property][name]
     })
 }

// proto === ctx
//  ctx.query = ctx.request.query

// 让proto代理requ上的query属性
delateGetter('request', 'query')
delateGetter('request', 'method')
module.exports = proto

```

### 总结

> 通过以上代码 我们封装了request对象，接下来会处理response对象和ctx对象