const Koa = require('koa')
const _ = require('koa-route');
import React, {Fragment} from 'react'
import {renderToString} from 'react-dom/server'
import routes from '../routes'
import { StaticRouter } from 'react-router-dom'
import Header from '../components/Header'

let app = new Koa()

app.use(require('koa-static')('public'))
// 这里路径改为*， 不管哪个路径，都组走这里
app.use(_.get('*', async function (ctx, next) {
    // 转义组件为字符串
    let html = renderToString(
        <StaticRouter context={{}} location={ctx.req.url}>
            <Fragment>
                <Header />
                <div className="container" style={{marginTop: 70}}>
                    {routes}
                </div>
            </Fragment>
        </StaticRouter>
    )
    console.log(html, ctx.req.url)
    ctx.body = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <!-- 最新版本的 Bootstrap 核心 CSS 文件 -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
    </head>
    <body>
        <div id="root">${html}</div>
        <script src="/client.js"></script>
    </body>
    </html>
    `
}))

app.listen(3000)