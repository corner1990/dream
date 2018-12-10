# React路由学习(四)

> 之前实现了简单的路由跳转,这里实现Link组件.我们就可以点点点切换了,不用再像之前一样苦逼哈哈的在地址栏里修改

### react-router-dom目录里文件内容

- index.js

> 这个文件主要是做入口文件用,我们把需要的模块在这里统一导出,然后我们在使用的时候就可以使用
>
> `import {HashRouter as Router, Route} from './react-router-dom'` 拿到文件对象

```javascript
import HashRouter from './HashRouter'
import Route from './Router'
// 新增
import BrowserRouter from './BrowserRouter'
// 导出一个对象
export {
    HashRouter,
    Route,
    Link, // 新增
}
```

- HashRouter.js内容

>这个组件时路由组建的父组件,很多逻辑需要在这里处理
>
>// 这里需要state中新增history对象

```javascript
// 1.引入需要的模块,
// 2.创建HashRouter对象
// 3.定义state
// 4.render方法,这里返回子组件,并在这里需要使用Provider传递数据,将我们state中的location对象传递下去,给子组件使用
// 5.在子组件挂在完成以后监听hashchange事件,在这里我们重新setState,更新页面

import React, {Component} from 'react';
import {Provider} from './context'
// 每当地址栏里的锚点发生改变的时候都需要重新匹配
export default class HashRouter extends Component{
    state = {
        // 保存hash,方便我们在子组件使用匹配
        location: {
            pathname: window.location.hash ?  window.location.hash.slice(1) : '/'
        },
         // Link组件动态修改hash
        history: { // 新增的对象,Link组件可以调用history的push方法跳转
            push (to) {
                // 我们这里重新修改hash以后会触发hashchange事件,便会在哪里更新模板,重新渲染页面
                window.location.hash = to
            }
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
        let value = {
            location: this.state.location
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

- Link.js

> 在react-router-dom目录创建Link.js, 内容如下

```javascript
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
```

### src/index.js内容修改

> 这里添加linl组件

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
// import {HashRouter as Router, Route, Link} from 'react-router-dom'
// 使用自定义hash路由 
// import {HashRouter as Router, Route, Link} from './react-router-dom'
// 使用自定义history路由
import {BrowserRouter as Router, Route, Link} from './react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import Home from './components/Home'
import User from './components/User'
import Profile from './components/Profile'

/**
 * router 使用
 * 如果路径匹配，则会渲染模板，如果不匹配，则不会渲染
 * exact: 精确匹配
 * 
 */
ReactDOM.render(<Router>
    <React.Fragment>
        <div className="container bg-light">
            <h3>管理系统</h3>
            <ul className="nav">
                <li className="nav-item">
                    <Link className="nav-link active" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/user">User</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/profile">Profile</Link>
                </li>
            </ul>
        </div>
        <Route path="/" exact component={Home} />
        <Route path="/user" component={User}/>
        <Route path="/profile" component={Profile}/>
    </React.Fragment>
</Router>, document.getElementById('root'));

```

> 到此位置就是先了Link组件,我们可以按照官方提供的方式使用

### 这里顺便实现BrowserRouter

```javascript
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
         window.addEventListener("popstate", (event) => {
            this.setState({
                location: {
                    ...this.state.location,
                    // 更新锚点
                    pathname: window.location.pathname ?  window.location.pathname : '/'
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
```

### 总结

> 到此位置,目前简单的功能已经实现了,但是history监听popstate的时候有点问题,这里还没有解决,所以只能修改路由,无法切换模板