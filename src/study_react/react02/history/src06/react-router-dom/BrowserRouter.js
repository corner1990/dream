import React, {Component} from 'react';
import {Provider} from './context'
// 每当地址栏里的锚点发生改变的时候都需要重新匹配
export default class BrowerRouter extends Component{
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
        // window.addEventListener("popstate", (event) => {
        //     this.setState({
        //         location: {
        //             ...this.state.location,
        //             // 更新锚点
        //             pathname: window.location.pathname ?  window.location.pathname : '/'
        //         }
        //     })
        // })

        window.addEventListener('popstate', function(e) {
            console.log('e', e)
          })
    }

    /**
     * 渲染
     */
    render () {
        // Provider 进行跨组件消息传递
        // 通过value属性传值
        let value = {
            location: {
                pathname: window.location.pathname || '/'
            },
            // Link组件动态修改hash
            history: {
                push (to) {
                    window.history.pushState({},'title', to)
                }
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