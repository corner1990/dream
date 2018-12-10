// import { createStore, combineReducers } from "redux";
import { createStore } from "redux";
import {combineReducers} from 'redux-immutable'
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
let reducers = combineReducers({
  counter
})

let store =createStore(reducers)
export default store
 