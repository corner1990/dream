let Koa = require('koa')
// let Koa = require('./koa/application')
// koa 是一个类，有两个方法，一个叫做use 一个叫做listen
let app = new Koa()
app.listen(3000)

// 第一个中间件中调用了next，走到了第二个中间件
// 第二个中间件又等待效果，第二个处于等待状态，那就等着，是第一个会接着走
// 只要调用next方法就加上await，防止下一个中间件又异步操作
// koa中如果不需要继续，可以直接return next
app.use(async (ctx, next) => {
    console.log(1)
    await log()
    next()
    console.log(2)
})
app.use((ctx, next) => {
    console.log(3)
    next()
    console.log(4)
})
app.use((ctx, next) => {
    ctx.body = 'ok'
    console.log(5)
    next()
    console.log(6)
})

function log () {
    setTimeout(function (params) {
        console.log('log')
    }, 3000)
}
