import reducer from './reducer';
// import createStore from '../redux/createStore' 
import { createStore} from '../redux' 
let store = createStore(reducer)
export default store
