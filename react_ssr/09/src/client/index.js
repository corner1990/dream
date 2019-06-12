import React, {Fragment} from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import routers from '../routes'
import Header from '../components/Header'
import { Provider } from 'react-redux' // 配合使用redux
import { getClientStore } from '../store'
import { renderRoutes, matchRoutes } from 'react-router-config'
// renderRouters 选人多级路由
// matchRoutes 实现路由匹配

// hydrate 表示把服务端渲染未完成的工作完成，比如绑定事件完成
ReactDOM.hydrate(
<Provider store={getClientStore()}>
<BrowserRouter>
    {renderRoutes(routers)}
</BrowserRouter>
</Provider>, document.getElementById('root'))