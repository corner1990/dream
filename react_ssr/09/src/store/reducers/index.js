import { combineReducers } from 'redux'
import counter from './counter'
import home from './home'
import session from './session'

let resucers = combineReducers({
    counter,
    home,
    session
})

export default resucers