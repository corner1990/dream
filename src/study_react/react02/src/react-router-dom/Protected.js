/**
 * 受保护的路由
 */
import React, {Component} from 'react';
// import {Route} from '../react-router-dom';
import {Route} from 'react-router-dom';
// 用类的声明方式比较冗余，遂使用函数式组件
// export default class Protected extends Component{
//     render () {
//         return 'hello'
//     }
// }
// {component: Component, ...rest} 表示将component结构赋值给Component，其他的参数赋值给rest
export default function ({component: Component, ...rest}) {
    console.log('rest', rest, Component)
    return (
        <Route {...rest} render={props => (
            'hello'
        )} />
        // localStorage.getItem('logined') ?  <Component ></Component>
    )
}
