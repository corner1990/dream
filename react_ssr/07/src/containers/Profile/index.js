import React, {Component} from 'react'
import { connect } from 'react-redux'
import actions from '../../store/actions/session'
class Profile extends Component{
  componentWillMount () {
    this.props.getUser()
  }
  render () {
    let { user = {} } = this.props;
    return (<section className="row">
      <div className="col-md-6 col-md-offset-6">
        个人中心
        <p>username: {user.name}</p>
      </div>
    </section>)
  }
}
Profile = connect(
  state => state.session,
  actions
)(Profile)
export default Profile