const path = require('path')
const fs = require('fs')
const Koa = require('koa')

let app = new Koa()

let p = path.resolve(__dirname, 'dist/')
let index = fs.readFileSync(path.resolve(p, 'index.html'))
let port = 40000
app.use(async ctx => {
    
    let url = ctx.req.url
    let reg = /\.(css|js|png|jpg)/
    if (!reg.test(url) || url === '/') {
        ctx.body = index
        ctx.type = 'text/html; charset=utf-8';
    } else {
        let arr = reg.exec(url)
        ctx.body = fs.readFileSync(path.join(__dirname, 'dist', url))
        ctx.type = arr[1]
    }
    
})

app.listen(port, function (err) {
    if (!err) {
        console.log(`app start at port ${port}`)
    }
})