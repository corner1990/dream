import React, {Component} from 'react';
import {Provider} from './context'
// 每当地址栏里的锚点发生改变的时候都需要重新匹配
export default class HashRouter extends Component{
    state = {
        location: {
            pathname: window.location.hash ?  window.location.hash.slice(1) : '/'
        }
    }
    /**
     * 组件挂载完成
     */
    componentDidMount () {
        /**
         * 监听hashchange 事件，刷新页面
         */
        window.addEventListener('hashchange', () => {
            this.setState({
                location: {
                    ...this.state.location,
                    // 更新锚点
                    pathname: window.location.hash ?  window.location.hash.slice(1) : '/'
                }
            })
        })
    }
    /**
     * 渲染
     */
    render () {
        // Provider 进行跨组件消息传递
        // 通过value属性传值
        let _self = this
        let value = {
            location: _self.state.location,
            // Link组件动态修改hash
            history: {
                push (to) {
                    // 这里添加判断，看是否需要阻挡跳转
                    if (_self.block) {
                        // 将to转换为一个对象
                        to = typeof to === 'object' ? to : {pathname: to}
                        let ok = window.confirm(_self.block(to))
                        // 如果返回值为false，就直接返回
                        if (!ok) return null;
                    }
                    // console.log('to', to)
                    if (typeof to === 'object') {
                        let {pathname, state} = to
                        _self.setState({
                            ..._self.state,
                            // 重新解构赋值
                            location: {
                                // 原始的location
                                ..._self.state.location,
                                // 使用新的路径覆盖
                                pathname,
                                state
                            }
                        })
                        window.location.hash = pathname
                    } else {
                        window.location.hash = to
                    }
                },
                /**
                 * 
                 * @param {string} msg 传递过来的提示语 
                 */
                block (msg) {
                    _self.block = msg
                },
                unblock () {
                    _self.block = null
                }
            },
            goback () {
                window.history.go(-1)
            }
        }
        // 返回this.props.children
        // 具体路由判断的规则在children组件进行处理
        return(
            <Provider value={value}>
               {this.props.children}
            </Provider>
        )
    }
}