import React, {Component} from 'react'

class NotFound extends Component{
  componentWillMount () {
    // 这个属性加到了server/render里的context属性上
    if (this.props.staticContext) {
      this.props.staticContext.NotFound = true
    }
  }
  render () {
    return (<section className="row">
      <div className="col-md-6 col-md-offset-6">
        404 NotFound
      </div>
    </section>)
  }
}

export default NotFound