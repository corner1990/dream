import { StaticRouter } from 'react-router-dom'
import Header from '../components/Header'
import routes from '../routes'
import React, {Fragment} from 'react'
import {renderToString} from 'react-dom/server'
import { Provider } from 'react-redux'
import { getServerStore } from '../store'

export default  function (ctx, next) {
    let context = {}
    let store = getServerStore()
    let html = renderToString(
        <Provider store={store}>
            <StaticRouter context={{}} location={ctx.req.url}>
                <Fragment>
                    <Header />
                    <div className="container" style={{marginTop: 70}}>
                        {routes}
                    </div>
                </Fragment>
            </StaticRouter>
        </Provider>
    )
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
}