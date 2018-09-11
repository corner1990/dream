# React路由学习(四)

### 实现带权限的路由组件(Redirect)

> 实现思路：
>
> 	1.我们拓展之前写好的Route组件，让其支持render方法
>
> 	2.在重定向的时候保存之前的状态，并传递给下一个组件
>
> 	3.新建组件(Protected),因为该组件不需要自己的私有状态，这里function
>
> 	4.引入Route组件，并在Protected返回Route组件，具体渲染还是使用Route组件
>
> 	5.我们在组件（Route）内部拿到Protected组件穿过来的参数，然后在render方法做判断，如果条件满足，则渲染页面，不满足则重定向到指定页面，具体实现在代码在下边

### Route组件更改

```javascript
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
```

### `Protected`组件代码

```javascript
/**
 * 受保护的路由
 */
import React from 'react';
import {Route, Redirect} from '../react-router-dom';
// import {Route} from 'react-router-dom';
// 用类的声明方式比较冗余，遂使用函数式组件
// export default class Protected extends Component{
//     render () {
//         return 'hello'
//     }
// }
// {component: Component, ...rest} 表示将component结构赋值给Component，其他的参数赋值给rest
export default function ({component: Component, ...rest}) {
    return (
        <Route {...rest} render={(props) => {
            // 这里我们使用简单的条件模拟判断
            // 并且这里的render的函数是写死的，可以自己修改一下，传递进来
            return (localStorage.getItem('logined') ?  <Component ></Component> 
            : <Redirect to={{"pathname": '/login', "state":{from: props.location.pathname}}} ></Redirect>)
        }}/>
        // localStorage.getItem('logined') ?  <Component ></Component>
    )
}

```

### `react-router-dom/index.js`

> 在index文件中把Protected组件导出，方便我们引用

```javascript
import HashRouter from './HashRouter'
import Route from './Router'
import Link from './Link'
import BrowserRouter from './BrowserRouter'
import Switch from './Switch'
import Redirect from './Redirect' //
import Protected from './Protected' // 受保护的路有权限


export {
    HashRouter,
    Route,
    Link,
    BrowserRouter,
    Switch,
    Redirect,
    Protected
}
```

### `index.js`

> 使用Protected组件

```javascript
// 引用组件
import {HashRouter as Router, Route, Link, Switch, Redirect, Protected} from './react-router-dom'

// 使用组件
<Protected path="/profile" component={Profile}/>
```

### 总结

> 代码其实很简单。执行的思路大致如下，没有特别高深的 ，就是需要简单的理解一下

- 我们调用一个特别的组件(Protected),然后把路由和模板按照Route的方式传递过去
- 我们在Protected组件内部引入两个必须的组件，Route(负责渲染模板)，Redirect(负责在不满足条件的时候重定向到指定页面)，
- 在Rende拓展，结构参数render，如果存在，并且没有component参数，就需要记录参数，当前页面的状态，然后返回render，并将参数传递过去
- 在Protected组件内部判断是需要渲染模板还是重定向到某一模板

