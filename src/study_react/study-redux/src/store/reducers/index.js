import counter from './counter'
import counter1 from './counter1'
import {combineReducers} from '../../redux'
import reducer from './counter1';

let reducers = combineReducers({
    counter,
    counter1
})
export default reducers