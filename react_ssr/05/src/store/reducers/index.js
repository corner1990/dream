import { combineReducers } from 'redux'
import counter from './counter'
import home from './home'

let resucers = combineReducers({
    counter,
    home
})

export default resucers