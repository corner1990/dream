let Koa = require('koa')
let Router = require('koa-router')
let uuid = require('uuid/v1') // 生成id
// console.log(uuid()) // dcc41b40-d782-11e8-90e5-49b70e078ebc

let app = new Koa()
let router = new Router()
// session 基于 cookie， 相对于cookie是安全的，因为session是保存在服务端
let session = {}
const CARD_NAME = 'hello'
router.get('/towash', (ctx, next) => {
    // 查看是否有身份信息
    let cardId = ctx.cookies.get(CARD_NAME) 
    // 有身份的处理
    if (cardId) {
        let cardID = session[cardId]
        if (cardID) { // 读取卡是否有效
            session[cardId].count -= 1
        } else {
            cardId = uuid()
            session[cardId] = {count: 5}
            ctx.cookies.set(CARD_NAME, cardId)
        }
    } else { // 没有身份的处理
        cardId = uuid()
        session[cardId] = {count: 5}
        ctx.cookies.set(CARD_NAME, cardId)
    }
    ctx.body = `你的卡号是${cardId}, 有效次数是${session[cardId].count}`
})

app.use(router.routes())
app.listen(5000)