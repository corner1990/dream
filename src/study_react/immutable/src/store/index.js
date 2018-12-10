// import { createStore, combineReducers } from "redux";
import { createStore } from "redux";
// import {combineReducers} from 'redux-immutable'
let immutable = require('immutable')
let { Map } = immutable
let initState = Map({number: 0})
function counter(state = initState, action) {
  switch (action.type) {
    case 'ADD':
      let newstate = state.update('number', val => val + action.payload)
      return newstate
    default:
      return state
  }
}
// 自己实现combineReducers
function combineReducers(reducers) {
  return function (state = Map({}), action) {
    let newState = Map({})
    for (let key in reducers) {
      newState = newState.set(key, reducers[key](state.get(key), action))
    }
    return newState
  }
}
let reducers = combineReducers({
  counter
})

let store =createStore(reducers)
export default store
 