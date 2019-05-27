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