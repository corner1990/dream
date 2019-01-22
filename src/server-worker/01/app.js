const koa = require('koa')
const koaStatic = require('koa-static')
let path = require('path')

const app = new koa()
let port = 4444
app.use(async function (ctx, next) {
    console.log('ctx', ctx.req.url)
    await next()
})
app.use(koaStatic(path.join(__dirname, './www')))

app.listen(port, () => {
    console.log(`app start port at ${port}`)
})
