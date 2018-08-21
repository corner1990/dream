// let Koa = require('koa')
let Koa = require('./koa/application')
// koa 是一个类，有两个方法，一个叫做use 一个叫做listen
let app = new Koa()
app.listen(3000)

// 第一个中间件中调用了next，走到了第二个中间件
// 第二个中间件又等待效果，第二个处于等待状态，那就等着，是第一个会接着走
// 只要调用next方法就加上await，防止下一个中间件又异步操作
// koa中如果不需要继续，可以直接return next
app.use(async (ctx, next) => {
    console.log(1)
    next()
    console.log(2)
})
app.use((ctx, next) => {
    console.log(3)
    next()
    // 这样代码测试error使用
    // throw Error('test error')
    console.log(4)
    ctx.body = 'hello'
})

app.on('error', e => {
    console.log('error', e)
})
// 至此位置 打印结果如下,因为用的是浏览器,浏览器默认会请求favicon,导致打印两边
// PS E:\dream\src\zfnode\koa> node koa
// 1
// 3
// 4
// 2
// 1
// 3
// 4
// 2