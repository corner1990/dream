import React from 'react';
import {Route, Link} from '../react-router-dom'
// 渲染Route有三种方式
// component
// render
// children
export default  ({to, exact, label}) => {

    return  <Route path={to} exact={exact} children={
        ({match}) => {
            // 解构拿到match对象，然后使用判断当前url是否等于path
            let flag = match.url === match.path
            return (<li className={flag ? 'nav-item active': 'nav-item'}><Link to={to}>{label}</Link></li>)
        }
    } />
    // return <li><Link to={to}>{label}</Link></li>
}