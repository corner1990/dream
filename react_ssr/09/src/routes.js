// import React, {Component, Fragment} from 'react'
// import { Route } from 'react-router-dom'
import Home from './containers/Home'
import Counter from './containers/Counter'
import Login from './containers/Login'
import Logout from './containers/Logout'
import Profile from './containers/Profile'
import NotFound from './containers/NotFound'
import App from './containers/App'

// 为了配合服务端渲染，这里需要修改为数组
/**
 * 

export default (
    <Fragment>
        <Route path="/" exact component={Home}></Route>
        <Route path="/counter" exact component={Counter}></Route>
    </Fragment>
)
 */
 /*
export default [
    {
        path: '/',
        component: Home,
        key: 'home',
        exact: true,
        loadData: Home.loadData // 加载数据，如果有此配置项，那么则意味着需要加载异步数据
    },
    {
        path: '/counter',
        component: Counter,
        key: 'counter'
    }
]
*/

export default [
    {
        path: '/',
        component: App,
        loadData: App.loadData,
        // 子路由
        routes: [
            {
                path: '/',
                component: Home,
                key: 'home',
                exact: true,
                loadData: Home.loadData // 加载数据，如果有此配置项，那么则意味着需要加载异步数据
            },
            {
                path: '/counter',
                component: Counter,
                key: 'counter'
            },
            {
                path: '/login',
                component: Login,
                key: 'login'
            },
            {
                path: '/logout',
                component: Logout,
                key: 'logout'
            },
            {
                path: '/profile',
                component: Profile,
                key: 'profile'
            },
            {
                component: NotFound,
                key: 'NotFound'
            }
        ]
    }
]