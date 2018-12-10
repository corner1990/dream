import {createStore, applyMiddleware} from 'redux'
import reducer from './reducer'
// import createSagaMiddleware from 'redux-saga'
import createSagaMiddleware from '../redux-saga'
import {rootSaga} from '../saga'
// 执行这个函数可以得到soga的中间件
let sagaMiddleware = createSagaMiddleware()
let store = applyMiddleware(sagaMiddleware)(createStore)(reducer)
// 开始执行rootSaga
sagaMiddleware.run(rootSaga, store)
export default store