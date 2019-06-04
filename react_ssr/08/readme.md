#权限管理
### 修改服务器配置
- 新增几个接口，后期使用
- 这里不需要使用代理了，直接注释
```js
const express = require('express')
const cors = require('cors')
const app = express()
let bodyParser = require('body-parser')
let session = require('express-session')
const port = 4001

// 处理跨域
// app.use(cors({
//   orgin: 'localhost:3000'
// }))
let users = [
  {id: 1, name: 'leo'},
  {id: 2, name: 'Jhon'}
]

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(session({
  saveUninitialized: true,
   resave: true,
   secret: 'hello'
}))

app.get('/api/users', function (req, res) {
res.json(users)
})
app.post('/api/login', function (req, res) {
  let user = req.body
  req.session.user = user
  res.json({
    code: 0,
    data: {
      user,
      msg: '登录成功'
    }
  })
})

app.get('/api/logout', function (req, res) {
  req.session.user = null
  res.json({
    code: 0,
    data: {
      user,
      msg: '退出成功'
    }
  })
})

app.get('/api/user', function (req, res) {
  let user = req.session.user
  if (user) {
    res.json({
      code: 0,
      data: {
        user,
        msg: '成功'
      }
    })
  } else {
    res.json({
      code: 1,
      data: {
        user,
        msg: '你没有登录'
      }
    })
  }
  
})
app.listen(port, () => {
  console.log(`api server start at ${port}`)
})
```
### 修改header
```js
import React, {Component} from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
    render () {
        return (
            <nav className={"navbar navbar-inverse navbar-fixed-top"}>
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand">SSR</a>
                    </div>
                    <div>
                        <ul className="nav navbar-nav">
                            <li><Link to="/">首页</Link></li>
                            <li><Link to="/counter">计数器</Link></li>
                            <li><Link to="/logout">退出</Link></li>)
                            <li><Link to="/profile">个人中心</Link></li>
                            <li><Link to="/login">登录</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
export default Header
```
### 新增模块
- Login
```js
import React, {Component} from 'react'
class Login extends Component{

  render () {
    return (<section className="row">
      <div className="col-md-6 col-md-offset-3">
        <form>
          <div className="form-group">
            <label htmlFor="username">用户名</label>
            <input type="text" className="form-control"  value={this.state.username} onChange={e => this.setState({username: e.target.value})} />
          </div>
          <div className="form-group">
            <input type="submit" className="btn btn-primary" value="登录"/>
          </div>
        </form>
      </div>
    </section>)
  }
}
export default Login
```
- Logout
```js
import React, {Component} from 'react'
class Logout extends Component{
  render () {
    return (<section className="row">
      <div className="col-md-6 col-md-offset-3">
        <form>
          <div className="form-group">
            <input type="submit" className="btn btn-primary" onClick={this.props.logout} value="退出" />
          </div>
        </form>
      </div>
    </section>)
  }
}

export default Logout
```
- profile
```js
import React, {Component} from 'react'
class Profile extends Component{
  render () {
    return (<section className="row">
      <div className="col-md-6 col-md-offset-6">
        个人中心
      </div>
    </section>)
  }
}

export default Profile
```

### 修改路由
```js
export default [
    {
        path: '/',
        component: App,
        loadData: App.loadData,
        components: [
            {
                path: '/',
                component: Home,
                key: 'home',
                exact: true,
                loadData: Home.loadData // 加载数据，如果有此配置项，那么则意味着需要加载异步数据
            },
            {
                path: '/counter',
                component: Counter,
                key: 'counter'
            },
            {
                path: '/login',
                component: Login,
                key: 'login'
            },
            {
                path: '/logout',
                component: Logout,
                key: 'logout'
            },
            {
                path: '/profile',
                component: Profile,
                key: 'profile'
            }
        ]
    }
]
```
### 实现最简单的登录逻辑
- reduers下新建session.js, 内容如下
```js
import * as types from '../action-types'

let initState = {
    user: null, // 当前登录庄户
    msg: null, // 消息
}

export default function (state = initState, action) {
    switch (action.type) {
        case types.SET_SESSION:
        return action.payload;
    default:
        return state;
    }
}

// src/store/index.js 中引入
// actions-types中新增teype  types.SET_SESSION
```
- actions中新增session.js
```js
import * as types from '../action-types'
import axios from 'axios'
export default {
    login () {
        return function (dispatch, getState, request) {
            return request.post('/api/login').then(res=>{
            let {data} = res
            dispatch({
                type: types.SET_SESSION,
                payload: data.data
            }) 
        })
        }
    },
    logout () {
        return function (dispatch, getState, request) {
            return request.get('/api/logout').then(res=>{
            let {data} = res
            dispatch({
                type: types.SET_SESSION,
                payload: data.data
            }) 
        })
        }
    }
}
```

### 在login页面调用登录
```js
import React, {Component} from 'react'
import {connect} from 'react-redux'
import actions from '../../store/actions/session'
class Login extends Component{
  state = {username: ''}
  clickHandle = (e) => {
    e.preventDefault()
    let {username} = this.state
    this.props.login({user: {username}})
  }
  render () {
    return (<section className="row">
      <div className="col-md-6 col-md-offset-3">
        <form>
          <div className="form-group">
            <label htmlFor="username">用户名</label>
            <input type="text" className="form-control" value={this.state.username} onChange={e => this.setState({username: e.target.value})} />
          </div>
          <div className="form-group">
            <input type="submit" className="btn btn-primary" value="登录" onClick={this.clickHandle} />
          </div>
        </form>
      </div>
    </section>)
  }
}

Login = connect(state => {
  return state.session
}, actions)(Login)
export default Login
```
### 处理导航
> 登录成功后需要对导航做一个简单的处理
```js
// src/compoents/Header/index.js
import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Header extends Component {
    render () {
        console.log(this.props)
        let {user} = this.props
        return (
            <nav className={"navbar navbar-inverse navbar-fixed-top"}>
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand">SSR</a>
                    </div>
                    <div>
                        <ul className="nav navbar-nav">
                            <li><Link to="/">首页</Link></li>
                            <li><Link to="/counter">计数器</Link></li>
                            
                            {user? (<li><Link to="/logout">退出</Link></li>) : ''}
                            {user? (<li><Link to="/profile">个人中心</Link></li>) : ''}
                            {!user? (<li><Link to="/login">登录</Link></li>) : ''}
                        </ul>
                        {
                            user && (<ul className="nav navbar-nav navbar-right">
                                <li><a>{user.username}</a></li>
                            </ul>)
                        }
                    </div>
                </div>
            </nav>
        )
    }
}
Header = connect(
    state => state.session
)(Header)
export default Header
```
### 实现退出功能
```js
```