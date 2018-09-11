import React from 'react';
export default class Login extends React.Component{
    handleLogin =  () => {
        localStorage.setItem('logined', 'logined')
    }
    render () {
        return (
            <div>
                <h3>Login</h3>
                <button type="button" className="btn btn-success" onClick={this.handleLogin}>Success</button>
            </div>
        )
    }
}