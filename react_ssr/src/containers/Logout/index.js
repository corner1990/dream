import React, {Component} from 'react'
import actions from '../../store/actions/session'
import { connect } from 'react-redux'
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
Logout = connect(
  state => state.section,
  actions
)(Logout)
export default Logout