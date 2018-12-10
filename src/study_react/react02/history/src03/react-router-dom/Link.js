// 引入模块
import React, {Component} from 'react';
// 引入context对象，这里需要拿到数据做处理
import {Consumer} from './context'
export default class Link extends Component{
    render () {
        return (
            <Consumer>
                {
                    // 拿到父组见传递过来的value
                    value => {
                        // 解构数据，
                        // 拿到父组件的push方法，修改路由
                        let {history: {push}} = value
                        // 渲染并返回组件
                        // 绑定事件，触发点击事件的时候将属性to作为值传递过去
                        return <a onClick={() => push(this.props.to)}>{this.props.children}</a>
                    }
                }
            </Consumer>
        )
    }
}