import React, {Component} from "react";
import ReactDOM from "react-dom";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import createHistory from "history/createBrowserHistory";
import { Route, Router } from "react-router";
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import {
  // ConnectedRouter,
  // routerReducer,
  // routerMiddleware,
  // push
} from "react-router-redux";

const LOCATION_CHANGE = "LOCATION_CHANGE"
// 自己实现cConnectedRouter方法
class ConnectedRouter extends Component{
  static contextTypes = {
    store: PropTypes.object
  }
  // 连接仓库和路由，监听路由变化，当路径发生比那话的时候派发动作
  componentWillMount () {
    this.store = this.context.store
    // history.listen == window.addEventListener(‘hashchange’， （） =》 {}）)
    // history是一个封装，让hashHistory和browserHistory使用相同的API
    this.props.history.listen(location => {
      this.store.dispatch({
        type: LOCATION_CHANGE,
        location
      })
    })
  }
  render () {
    return <Router {...this.props} />
  }
}

// 手动实现push方法
const CHANGE_LOCATION = 'CHANGE_LOCATION'
function push (pathname) {
  return {
    type: CHANGE_LOCATION,
    pathname
  }
}
// 手动实现routerMiddleware 方法
function routerMiddleware (history) {
  return ({getState, dispatch}) => next => action => {
    if (action.type === CHANGE_LOCATION) {
      history.push(action.pathname)
    } else {
      next(action)
    }
  }
}
// 仓库李派发动作，将状态保存在store里边
let initRouterState = {location:{}}
function routerReducer (state = initRouterState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return {
        ...state,
        location: action.location
      }
    default:
    return state
  }
  return state
}
// import reducers from "./reducers"; // Or wherever you keep your reducers
// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    router: routerReducer
  }),
  applyMiddleware(middleware)
);

let Home = () => <div>Home</div>
let About = () => <div>About</div>
let Topics = () => <div>Topics</div>

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

// 为了方便，将store和push挂载到window对象上
window.push = push
window.store = store

ReactDOM.render(
  <Provider store={store}>
    {/* ConnectedRouter will use the store from Provider automatically */}
    <ConnectedRouter history={history}>
      
      <div>
        <div>
          <Link to="/">Home</Link>&nbsp;&nbsp;
          <Link to="/about">about</Link>&nbsp;&nbsp;
          <Link to="/topics">topics</Link>
        </div>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/topics" component={Topics} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);