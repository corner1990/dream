# React路由学习(二)

> 之前我们实现了简单的路由,现在我们在之前的基础上实现正则匹配路由,
>
> 我们这里需要依赖path-to-regexp模块

```
// 安装模块
npm install path-to-regexp --save
```


### react-router-dom目录里文件内容
- Router.js内容

> 这里时所有的路由模板,我们要根据父组件传递过来的路由进行匹配,并将匹配到的结果返回出去

```javascript
// 我们这里拿到父组见传递的数据,然后进行判断,将符合规则的模板返回
import React, {Component} from 'react';
import {Consumer} from './context'

// 需要使用的模块 // 新增
let PathToReg = require('path-to-regexp') // 新增
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
            			
          				let keys = [] // 新增 
                        let reg = PathToReg(path, keys, {end: exact}) // 新增
            			// 如果路径相同,则返回这个模板
                         // 使用reg处理路由
                        if (reg.test(pathname)) { // 修改
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

> 通过以上简单的几句话,我们就是实现了正则匹配路由,下面我们将实现Link组件