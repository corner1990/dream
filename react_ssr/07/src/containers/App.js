import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import Header from '../components/Header'
import routes from '../routes'
import { renderRoutes, matchRoutes } from 'react-router-config'
import actions from '../store/actions/session'
class App extends Component{
  render () {
    // 拿到子路由
    let {route} = this.props
    return (
      <Fragment>
          <Header />
          <div className="container" style={{marginTop: 70}}>
              {renderRoutes(route.routes)}
          </div>
      </Fragment>
    )
  }
}
App.loadData = function (store) {
  return store.dispatch(actions.getUser())
}
export default App