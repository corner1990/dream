let Koa = require('koa')

let Router = require('koa-router')

let router = new Router()
let app = new Koa()
app.keys = ['im a newer secret', 'i like turtle'];
router.get('/read', (ctx, next) => {
    let name = ctx.cookies.get('name') || 'name is not found'
    let age = ctx.cookies.get('age') || 'age is not found'
    ctx.body = 'age'+ age + 'name=' + name
})
// router.get('/visit', (ctx, next) => {
//     let visit = ctx.cookies.get('visit')
//     visit = visit ? (parseInt(visit) + 1) : 1
//     ctx.cookies.set('visit', visit)
//     // 添加签名
//     ctx.cookies.set('visit', visit, { signed: true })

//     // 签名 2(第二次访问)

//     // 3 (第三次访问)
//     ctx.body = `当前用户第 ${visit} 访问`

// })

// 签名效验 防止篡改 cookie； 虽然看起来安全了很多，但还是不能够放敏感信息
router.get('/visit', (ctx, next) => {
    let visit = ctx.cookies.get('visit', { signed: true })
    visit = visit ? (parseInt(visit) + 1) : 1
    ctx.cookies.set('visit', visit)
    // 添加签名
    ctx.cookies.set('visit', visit, { signed: true })

    // 签名 2(第二次访问)

    // 3 (第三次访问)
    ctx.body = `当前用户第 ${visit} 访问`

})

app.use(router.routes())
app.listen(4000)

// let crypto = require('crypto')
// let r = crypto.createHmac('sha1', 'hello').update(String(1)).digest('base64')
// console.log(r) // VswpfHypMb5p/KgpBL3Dm6OQ4Kk=