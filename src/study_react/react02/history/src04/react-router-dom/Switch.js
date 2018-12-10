import React, {Component} from 'react';
import {Consumer} from './context';
let PathToReg = require('path-to-regexp')
/**
 * 类似于js Switch功能
 * 匹配到指定的插件以后，就不再继续匹配路由
 */

export default class Switch extends Component{
    render () {
        return (<Consumer>
            {value => {
                // 解构，拿到pathname
                let {location: {pathname}} = value
                let children = this.props.children
                for (let i = 0; i < children.length; i++) {
                    // 遍历拿到每一个child组件(route)
                    // 拿到子组件的path
                    let child = children[i]
                    let {path, excat} = child.props
                    let reg = PathToReg(path, [], {end: excat})
                    // 使用正则匹配当前地址栏的路径, 如果相同，则渲染，不继续执行判断
                    console.log(i, 'i')
                    if(reg.test(pathname)) {
                        return child
                    }
                }
                // 如果代码执行结束还是没有找到对应的模板，则直接返回null
                return null
            }}
        </Consumer>)
    }
}