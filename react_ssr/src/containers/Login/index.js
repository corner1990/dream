import React, {Component} from 'react'
class Login extends Component{
  render () {
    return (<section className="row">
      <div className="col-md-6 col-md-offset-3">
        <form>
          <div className="form-group">
            <label htmlFor="username">用户名</label>
            <input type="text" className="form-control" />
          </div>
          <div className="form-group">
            <input type="submit" className="btn btn-primary" value="登录" />
          </div>
        </form>
      </div>
    </section>)
  }
}

export default Login