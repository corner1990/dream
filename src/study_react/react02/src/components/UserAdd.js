import React from 'react';
export default class UserAdd extends React.Component{
    handleSubmit =  e => {
        e.preventDefault()
        let username = this.username.value
        let email = this.email.value
        let user = {email, username}
        let userStr = localStorage.getItem('users')
        let users= userStr ? JSON.parse(userStr) : [];
        // 如果已经有用户了，id就用自增长的方式，没有的话就是设置为1
        user.id = users.length > 0 ? users[users.length-1].id + 1 : 1
        users.push(user)

        localStorage.setItem('users', JSON.stringify(users))
    }
    render () {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">用户名：</label>
                    {/* ref={input => this.username = input} 函数只有在页面渲染的以后才会被执行 */}
                    <input ref={input => this.username = input} type="text" className="form-control" id="username"/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">邮&emsp;箱：</label>
                    <input ref={input => this.email = input} type="text" className="form-control" id="email"/>
                </div>
                <div className="form-group">
                    <input type="submit" className="btn btn-primary"/>
                </div>
            </form>
        )
    }
}