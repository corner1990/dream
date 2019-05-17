import { StaticRouter } from 'react-router-dom'
import React, {Fragment} from 'react'
import {renderToString} from 'react-dom/server'
import { Provider } from 'react-redux'
import routes from '../routes'
import { getServerStore } from '../store'
import { Route, matchPath } from 'react-router-dom'
import { renderRoutes, matchRoutes } from 'react-router-config'
// renderRouters 选人多级路由
// matchRoutes 实现路由匹配


export default  function (ctx, next) {
    let context = {}
    let store = getServerStore()
    
    // 获取要渲染的组件
    // matchPath 是路由提供的工具方法， 可以用来判断路径和路由是否匹配
    let matchRoute = matchRoutes(routes, ctx.req.url)
    let promises = []
    matchRoute.map(route => {
        // 判断是否需要加载异步数据
        if (route.loadData) {
            console.log('reoute', route)
            promises.push(route.loadData(store))
        }
    })
    
    return Promise.all(promises).then(() => {
        // 创建仓库的时候， 仓库里已经有默认值
        // console.log(store.getState())
        let html = renderToString(
            <Provider store={store}>
                <StaticRouter context={{}} location={ctx.req.url}>
                    {renderRoutes(routes)}
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
            <script>
                // 同步服务器端的state对象
                window.content = {
                    state: ${JSON.stringify(store.getState())}
                }
            </script>
            <script src="/client.js"></script>
        </body>
        </html>
        `
    })
}