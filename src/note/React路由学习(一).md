# React路由学习(一)

> 这里主要是学习和理解路由组建的运行逻辑,以及思路,遗留了一个问题,就是不知道为什么我的浏览器监听window.onpopstate事件无效,导致使用history模式切换路由的时候无法更新页面,这个后期有时间在研究,
>
> 下边开始实现简单的路由

### 准备工作

- 创建项目

```javascript
// 第一个步
// 安装
npm install -g create-react-app
// 新建项目
create-react-app my-app
// 进入新建项目牡蛎
cd my-app
// 启动项目
npm start


// 第二步
// 完成以上步骤以上,删除src目录下的所有文件,自己新建一个index.j文件,我们在里使用路由,文件少了可以减少我们的干扰

// 第三部
// 在src目录中新建目录,命名为react-router-dom

// 创建我们需要的文件
// context.js // 上下文队形
// HashRouter.js // hash路由的主文件
// index.js // 引用文件,然后统一导出文件的地方
// Router.js // 渲染组件是处理逻辑,并最终返回模板的文件
```

### 实现简单的路由

- 模板内容

> 因为内容很少,也很简单,这里就放一起了

```javascript
// 以下是components目录下文件的内容
// Home.js 文件内容
import React from 'react';
export default class Home extends React.Component{
    render () {
        return (
            <div>Home</div>
        )
    }
}

// Profile.js 内容
import React from 'react';
export default class Profile extends React.Component{
    render () {
        return (
            <div>Profile</div>
        )
    }
}

// User.js 内容
import React from 'react';
export default class User extends React.Component{
    render () {
        return (
            <div>User</div>
        )
    }
}
```



- `index.js` 内容

> import {HashRouter as Router, Route} from './react-router-dom'
>
> `HashRouter as Router`这种写法的意思先结构拿到HasRouter对象,然后重命名为Router,完整写法如下
>
> import {HashRouter, Route} from './react-router-dom'
>
> let Router = HashRouter

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
// import {HashRouter as Router, Route} from 'react-router-dom'
// 使用自定义路由
import {HashRouter as Router, Route} from './react-router-dom'
// 引入我们需要的模板
import Home from './components/Home'
import User from './components/User'
import Profile from './components/Profile'

/**
 * router 使用
 * 如果路径匹配，则会渲染模板，如果不匹配，则不会渲染
 * exact: 精确匹配
 */
ReactDOM.render(<Router>
    <React.Fragment>
        <Route path="/" component={Home} />
        <Route path="/user" component={User}/>
        <Route path="/profile" component={Profile}/>
    </React.Fragment>
</Router>, document.getElementById('root'));

```

### react-router-dom目录里文件内容

- index.js

> 这个文件主要是做入口文件用,我们把需要的模块在这里统一导出,然后我们在使用的时候就可以使用
>
> `import {HashRouter as Router, Route} from './react-router-dom'` 拿到文件对象

```javascript
import HashRouter from './HashRouter'
import Route from './Router'
// 导出一个对象
export {
    HashRouter,
    Route
}
```

- content.js

> 这里主要是创建一个上下文对象,我们在不同的组件之间传值时使用

```javascript
// 引入react对象,创建并导出一个对象,
import React from 'react';
let {Provider, Consumer} = React.createContext()
// Provider 提供数据
// Consumer 消费数据

// 导出数据
export{
    Provider,
    Consumer
}

```

- HashRouter.js内容

>这个组件时路由组建的父组件,很多逻辑需要在这里处理

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

### Router.js内容

> 这里时所有的路由模板,我们要根据父组件传递过来的路由进行匹配,并将匹配到的结果返回出去

```javascript
// 我们这里拿到父组见传递的数据,然后进行判断,将符合规则的模板返回
import React, {Component} from 'react';
import {Consumer} from './context'
export default class Route extends Component{
    render () {
        return (
            <Consumer>
                {
                    // value就是我们在HashRouter文件中Provider组件中传递的value值,
                    // value = state.locaton
                    value => {
                        let {location: {pathname}} = value // 拿到hash 进行比较
                        // 拿到传入的path，组件，并手动大写(组件需要首字母大写)
                        let {path, component: Component} = this.props
            			// 如果路径相同,则返回这个模板
                        if (pathname === path) {
                            return <Component></Component>
                        } else {
                            return null
                        }
                    }
                }
            </Consumer>
        )
    }
}
```

### 总结

> 以上实现了简单的路由跳转,接下来我们将使用模块正则匹配路由