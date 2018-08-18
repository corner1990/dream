// let Koa = require('koa')
let Koa = require('./koa/application')
// koa 是一个类，有两个方法，一个叫做use 一个叫做listen
let app = new Koa()
app.listen(5000)

// ctx 代表的是上下文，是koa自己创建的
// ctx.request 这是koa自己封装的request属性
// ctx.response
// ctx.req 原生req对象
// ctx.res
app.use((ctx, next) => {
    ctx.response.body = '100'
    // ctx.body 可以设置多次，但是会以最后一个为结果
    console.log(ctx.response.body)
    // console.log(ctx.path)
    // ctx.body = '1231231'
})
