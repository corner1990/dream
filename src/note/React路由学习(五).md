# React路由学习(五)

> 这里主要是根据之前的代码，实现一个自定义导航，我们可以，选中的导航添加class，

### 实现思路

-  新建一个自定菜单组件`MenuLink`,为了方便渲染，我们这里使用children的处理子组件
- 在`MenuLink`组件内部引入`Route`组件，并使用它渲染
- 在这里解析`path`，判断是否需要添加执行的类
- 在`Route`组件结构参数的时候多结构一个`children`属性，作为判断，是否是自定义组件

### 新建`MenuLink`组件

```javascript
import React from 'react';
import {Route, Link} from '../react-router-dom'
// 渲染Route有三种方式
// component
// render
// children
export default  ({to, exact, label}) => {
  // 这里直接将参数解构出来，下边就可以直接使用了
    return  <Route path={to} exact={exact} children={
        ({match}) => {
            // 解构拿到match对象，然后使用判断当前url是否等于path
            let flag = match.url === match.path
            return (<li className={flag ? 'nav-item active': 'nav-item'}><Link to={to}>{label}</Link></li>)
        }
    } />
    // return <li><Link to={to}>{label}</Link></li>
}
```

### `react-router-dom/router.js`

> 这里解析`children`判断，是否需要处理，因为存在`children`属性的话，必须是要渲染的，至于需要需要添加执行的类，这需要在`MenuLink`组件内部做处理

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
```

### 页面使用

```javascript
// 常规引入组件
import MenuLink from './components/MenuLink'

// 使用组件
 <MenuLink to="/" label='Home'></MenuLink>
 <MenuLink to="/user" label='User'></MenuLink>
 <MenuLink to="/profile" label='Profile'></MenuLink>

```

### `WithRoute`组件

> 通过该组件，我们可以在组件内部使用`this.loaction.history.push`进行路由跳转,
>
> 实现思路很简单，就是我们写一个函数组件，在这个组件内部接受一个参数，需要处理this执行的commponent组件，然后引入Route，返回一个函数，函数里是Route， comment就是我们接收到的参数,代码如下：

```javascript
// WithRoute组件代码
import React, { Component}  from 'react';
import {Route} from '../react-router-dom'
export default (Component) => () => {
    return <Route component={Component}/> 
}


//  使用组件
// 我们在自己写的组件内部引用这个组件，然后调用并倒出，代码如下
// 这里是自己自定义一个Header组件
import React, {Component} from 'react';
import {WithRouter} from '../react-router-dom'

class Header extends Component{
    render () {
        console.log('this', this)
        return (<h3>
            <a onClick={() => {this.props.history.push('/')}}>管理系统</a>
        </h3>)
    }
}

export default WithRouter(Header)


```

### `Switch`组件

> Route每次渲染都会查询所有的模板，为了减少资源浪费，我们需要一个组件，做一个处理，Route匹配到指定的模板以后，不在继续查找。
>
> 实现思路：
>
> 	使用上下文对象，拿到所有路由参数
>
> 	结构得到pathname，children所有组件
>
> 	遍历所有子组件，拿到子组件的path，然后使用`path-to-regexp`组件创建一个正则去匹配，匹配成功以后直接返回，不在继续遍历

```javascript
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
                    // 给path一个默认值，防止首页的时候报错
                    // excat：false ，默认不是精确匹配
                    let {path = '/', exact = false} = child.props
                    let reg = PathToReg(path, [], {end: exact})
                    // 使用正则匹配当前地址栏的路径, 如果相同，则渲染，不继续执行判断
                    // console.log(i, 'i')
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
```

### 使用

```javascript
// 使用之前我们需要在react-router-dom目录的index引入，并导出
// 我们在使用的页面引用该组件直接引入，如下使用就可以了
// 我们只需要使用Switch组件包裹所有的路由组件就可以了
<Switch>
    <Route path="/" exact component={Home} />
    <Route path="/user" component={User}/>
    <Route path="/login" component={Login}/>
    <Protected path="/profile" component={Profile}/>
    <Redirect to="/"></Redirect>
</Switch>
```



### 总结

> 代码很简单，也很少，主要是锻炼我们处理`children`，熟练使用组件的三种渲染方式： component，render ，children，让我们能够知道更多的使用方式，方便在项目中可以灵活地处理遇到的问题和场景