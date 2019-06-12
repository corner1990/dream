const Koa = require('koa2')
const _ = require('koa-route');
const httpProxy = require('http-proxy-middleware');
import render from './render'
const k2c = require('koa2-connect');
const port = 4000
let app = new Koa()

app.use(async (ctx, next) => {
    if (ctx.url.startsWith('/api')) {
        await k2c(httpProxy({
        target: 'http://127.0.0.1:4001', 
        changeOrigin: true,
        secure: false,
//         pathRewrite: {'^/api': ''}
        }
        ))(ctx,next);
    }
    await next()
});

// 设置服务端静态目录
app.use(require('koa-static')('public'))
// 这里路径改为*， 不管哪个路径，都组走这里
app.use(_.get('*', render))

app.listen(port, () => {
    console.log(`server start at ${port}`)
})