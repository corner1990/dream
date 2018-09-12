import React from 'react';
export default class UserList extends React.Component{
    constructor () {
        super()
        let userStr = localStorage.getItem('users');
        let users = userStr ? JSON.parse(userStr) : []
        this.state = {
            users
        }
    }

    render () {
        return (
            <div>
                <h3>UserList</h3>
                <ul className="list">
                    {this.state.users.map((user, index) =>
                        <li key={index}>id: {user.id} &emsp; name: {user.name} &emsp; email: {user.email}</li>)
                    }
                </ul>
            </div>
        )
    }
}