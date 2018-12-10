import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Link} from 'react-router-dom'
// 使用自定义路由
// import {HashRouter as Router, Route} from './react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
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
    <div className="container bg-light">
        <h3>管理系统</h3>
        <ul className="nav">
            <li className="nav-item">
                <Link className="nav-link active" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/User">User</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/Profile">Profile</Link>
            </li>
        </ul>
    </div>
        <Route path="/" component={Home} />
        <Route path="/user" component={User}/>
        <Route path="/profile" component={Profile}/>
    </React.Fragment>
</Router>, document.getElementById('root'));
