import React from 'react';
import {Link, Route} from '../react-router-dom'
import UserAdd from './UserAdd'
import UserList from './UserList'
export default class User extends React.Component{
    render () {
        return (
            <div className='row'>
                <div className='col-md-2'>
                    <ul className='nav nav-stacked'>
                        <li><Link to="/user/add">新增用户</Link></li>
                        <li><Link to="/user/list">用户列表</Link></li>
                    </ul>
                </div>
                <div className='clo-md-10'>
                    <Route path="/user/add" component={UserAdd}></Route>
                    <Route path="/user/list" component={UserList}></Route>
                </div>
            </div>
        )
    }
}