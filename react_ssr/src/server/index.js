const Koa = require('koa')
const _ = require('koa-route');
import render from './render'

let app = new Koa()
// 设置服务端静态目录
app.use(require('koa-static')('public'))
// 这里路径改为*， 不管哪个路径，都组走这里
app.use(_.get('*', render))

app.listen(3000, () => {
    console.log('server start at 3000')
})