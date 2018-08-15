let Koa = require('koa')
// koa 是一个类，有两个方法，一个叫做use 一个叫做listen
let app = new Koa()
app.listen(5000)

// ctx 代表的是上下文，是koa自己创建的
// ctx.request 这是koa自己封装的request属性
// ctx.response
// ctx.req 原生req对象
// ctx.res
app.use((ctx, next) => {
    ctx.body = 'hello'
})
