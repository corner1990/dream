import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import Header from '../components/Header'
import routes from '../routes'
import { renderRoutes, matchRoutes } from 'react-router-config'

class App extends Component{
  render () {
    // 拿到子路由
    let {route} = this.props
    return (
      <Fragment>
          <Header />
          <div className="container" style={{marginTop: 70}}>
              {renderRoutes(route.components)}
          </div>
      </Fragment>
    )
  }
}

export default App