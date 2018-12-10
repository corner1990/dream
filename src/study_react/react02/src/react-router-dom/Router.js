import React, {Component} from 'react';
import {Consumer} from './context'
let PathToReg = require('path-to-regexp')

export default class Route extends Component{
    render () {
        return (
            <Consumer>
                {
                    value => {
                        let {location: {pathname}} = value // 拿到hash 进行比较
                        // 拿到传入的path，组件，并手动大写(组件需要首字母大写)
                        // 结构出来render方法，配合控制权限
                        // 解构拿到children，存在该属性，说明是一个自定义菜单组件，直接渲染就可以了，不需要做处理
                        let {path = '/', component: Component, exact = false, render, children} = this.props
                        let keys = []
                        // 解析出来参数，然后传给子组件，子组件就可以继续匹配
                        let reg = PathToReg(path, keys, {end: exact})
                        let result = path.match(reg)
                        let props = {
                            location: value.location,
                            history: value.history
                        }
                        // 判断是否有其他参数
                        if (result) {
                            let [, ...value] = result
                            let params = keys.reduce((memo, name, index) => {
                                memo[name] = value[index]
                                return memo
                            }, {})
                            let match = {
                                url: pathname,
                                path,
                                params
                            }
                            props.match = match
                        }
                        // 使用reg处理路由
                        if (reg.test(pathname)) {
                            // console.log('result', result)
                            // 将解析的props传递下去
                            if (Component) { // 判断是否有渲染函数，的话直接的执行函数，并将props传过去
                                // console.log('props', props)
                                return <Component {...props}></Component>
                            } else if(render) {
                                // 如果没有component组件，存在render方法，说明需要控制权限，
                                // 直接返回render就可以了， 并且这里需要将参数props传递过去
                                return render(props)
                            } else if (children) {
                                // 如果是自定义菜单，必须要渲染
                                return children(props)
                            }
                            return null
                        } else {
                            // 如果是自定义菜单，必须要渲染
                            if (children) {
                                return children(props)
                            }
                            return null
                        }
                    }
                }
            </Consumer>
        )
    }
}