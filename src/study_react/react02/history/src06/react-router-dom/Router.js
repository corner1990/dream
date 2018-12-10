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
                                return render(props)
                            } else if (children) {
                                
                                return children(props)
                            }
                            return null
                        } else {
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