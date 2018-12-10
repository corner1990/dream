let Koa = require('koa')
let Router = require('koa-router')
let uuid = require('uuid/v1') // 生成id
let session = require('koa-session')
// console.log(uuid()) // dcc41b40-d782-11e8-90e5-49b70e078ebc

let app = new Koa()
let router = new Router()

app.keys = ['im a newer secret', 'i like turtle'];
app.use(session({
    httpOnly: true,
    maxAge: 10 * 1000
}, app))

const CARD_NAME = 'hello'
router.get('/towash', (ctx, next) => {
   let user = ctx.session.user
   if (user) {// 不是新用户
        ctx.session.user.count--
        ctx.body = `当前消费成功， 次数为${ctx.session.user.count}`
    } else {
        ctx.session.user = {count: 5}
        ctx.body = `当前办卡成功， 次数为5`
    }
})

app.use(router.routes())
app.listen(5000)