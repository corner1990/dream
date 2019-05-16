// import React, {Component, Fragment} from 'react'
// import { Route } from 'react-router-dom'
import Home from './containers/Home'
import Counter from './containers/Counter'

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