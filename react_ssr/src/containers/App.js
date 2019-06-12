import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import Header from '../components/Header'
import routes from '../routes'
import { renderRoutes, matchRoutes } from 'react-router-config'
// import withStyles from 'isomorphic-style-loader/withStyles'
import StyleContext from 'isomorphic-style-loader/StyleContext'
import actions from '../store/actions/session'
import styles from './App.css'
class App extends Component{
  render () {
    // 拿到子路由
    let {route} = this.props
    return (
      <Fragment>
          <Header />
          <div className="container"  className={styles.app}>
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