import React, {Component} from 'react';
import {Consumer} from './context'
/**
 * @description 重定向组件
 * 当没有匹配的路由时，我们执行一个默认的路径模板，作为返回值。类似于404.500页面的样子
 */
export default class Redirect extends Component{
    render () {
        return (<Consumer>
            {value => {
                // 拿到父组件的push
                // 拿到当前组建的to的路径，然后执行方法跳转
                // 因为不需要渲染页面， 所以直接返回null就可以了
                console.log('redirect')
                let {history: {push}} = value
                let {to} = this.props
               push(to)
               return null
            }}
        </Consumer>)
    }
}