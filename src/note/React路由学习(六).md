# React路由学习(六)

> 我们再处理表单的时候，有时候会不小心点击别的链接，或者用户放弃继续注册，我们可以再跳转的时候提示用户，是否需要跳转，等用户确认以后再跳转，如果用户没有确认，就继续停留再当前页面，阻止跳转

### `Prompt`组件

> 使用方式，这个组件支持两个参数。when：是否需要阻止跳转，message：提示用户的时候的提示语
>
> 实现思路：
>
> 	1.再路由新建一个属性(block)，用来保存是否需要提示跳转的状态
>
> 	2.我们改变路由之前加一个判断，如果block属性不为空，则阻止跳转，并弹出提示框
>
> 	3.用户点击取消，则不做任何操作，用户点击确认，进入下一步
>
> 	4.再当前组件销毁之前重置block为null，然后push新的路由

### 调用代码

```javascript
// 引入组件
import {Prompt} from '../react-router-dom'

// 调用 
// 下边的例子，我们再inputchangge的时候设置为需要阻止跳转
 <Prompt 
    when={this.state.isBlocking}
    message= {
        loc => `请问你是否确定要切换到${loc.pathname}路径`
    }
/>
<div className="form-group">
    <label htmlFor="username">用户名：</label>
    <input 
    ref={input => this.username = input} 
    type="text" 
    className="form-control"
    id="username"
    onChange={() => this.setState({isBlocking: true})}/>
</div>
```

### `Prompt`组件实现

> 在react-router-dom下新建文件Prompt.js，文件内容如下

```javascript
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

```

### `HashRouter.js`文件修改

> 1.新增block方法，保存阻止跳转的状态和提示语
>
> 2.新增unblock方法，清空状态为默认
>
> 3.在push新路由的时候判断block是否需要提示

```javascript
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
                    /**
                    * 阻止跳转新增
                    */
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
                * 阻止跳转新增
                */
                /**
                 * 
                 * @param {string} msg 传递过来的提示语 
                 */
                block (msg) {
                    _self.block = msg
                },
                /**
                * 阻止跳转新增
                */
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
```

### 结束语

> 因为已经写了好多了，关于在react-router-dom目录下index.js导出该组件的代码就不写了。就是复制粘贴，到目前位置也完成了router组建的基本功能，算是对路由有了一定的认识.....为自己的进步加油

#### 传送门 贴上[完整代码](https://github.com/corner1990/dream/tree/master/src/study_react/react02)