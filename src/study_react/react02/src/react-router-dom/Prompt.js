import React, {Component} from 'react';
import {Consumer} from './context'
{/* <Prompt 
when={this.state.isBlocking}
message= {
    loc => `请问你是否确定要切换到${loc.pathname}路径`
}
/> */}

// when 判断是否需要组织跳转
// message 阻止跳转时的提示语

export default class Prompt extends Component{
    componentWillUnmount () {
        // 再组件卸载之前清空状态
        this.history.unblock()
    }
    render () {
        return (
            // 使用上下文拿到location对象
            <Consumer>
                {
                    value => {
                        // 将history对象挂载到当前对象上，方便在组件卸载的时候清空状态
                        this.history = value.history
                        // 解构参数
                        let {when, message} = this.props
                        console.log(when, message)
                        // 如果存在when参数，则进行阻拦，不存在，就清空之前的状态
                        if (when) {
                            value.history.block(message)
                        } else {
                            value.history.unblock()
                        }
                    }
                }
            </Consumer>
        )
    }
}

// 组件复用的策略
// 高阶组件
// 函数作为子组件
