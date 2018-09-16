import reducer from './reducer'
import createStore from '../redux/createStore' 
// import { createStore} from '../redux' 
console.log('createStore', createStore)
let store = createStore(reducer)
export default store
