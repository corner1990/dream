let Koa = require('koa')
import React from 'react'
import Home from '../containers/Home/index'
import Header from '../containers/Header/index'
import {renderToString} from 'react-dom/server'
let app = new Koa()

app.use(async function (ctx, next) {
    // 转义组件为字符串
    let html = renderToString(<Home />)
    let head = renderToString(<Header />)
    ctx.body = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
        ${head}
        ${html}
    </body>
    </html>
    `
})

app.listen(3000)