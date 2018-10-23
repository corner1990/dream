let Koa = require('koa')

let Router = require('koa-router')

let router = new Router()
let app = new Koa()

app.use(async (ctx, next) => {
    ctx.getCookie = (key) => {
       let r =  ctx.get('Cookie') || ''
       let cookieObj = require('querystring').parse(r, '; ')
       return cookieObj[key]
    }
    let allCookies = []
    ctx.setCookie = (key, val, opts)  => {
        let arr = []
        let line = `${key}=${encodeURIComponent(val)}`
        arr.push(line)
        
        if(opts) {
            if (opts.domain) {
                arr.push(`Domain=${opts.domain}`)
            }
    
            if (opts.maxAge) {
                arr.push(`Max-Age=${opts.maxAge}`)
            }
    
            if (opts.path) {
                arr.push(`Path=${opts.path}`)
            }
    
            if (opts.httpOnly) {
                arr.push(`HttpOnly=${opts.httpOnly}`)
            }
        }

        line = arr.join('; ')
        allCookies.push(line)
        ctx.set('Set-Cookie', allCookies)
    }
    await next()
})

router.get('/read', (ctx, next) => {
    let name = ctx.getCookie('name') || 'name is not found'
    let age = ctx.getCookie('age') || 'age is not found'
    ctx.body = age
})
router.get('/write', (ctx, next) => {
    ctx.setCookie('name', 'hello', {domain: 'hello.com'})
    ctx.setCookie('age', 18, {maxAge: 1000})
    ctx.setCookie('address', 'hahhhhhh')
    ctx.body = 'write ok'

})

app.use(router.routes())
app.listen(4000)