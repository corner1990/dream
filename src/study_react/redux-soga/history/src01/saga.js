// import {takeEvery} from 'redux-saga/effects'
// // import { put, takeEvery, all, call } from 'redux-saga/effects'
// import * as types from './store/actions-type'
// function add (dispatch) {
//     setTimeout(() => {
//         dispatch({type: types.ADD})
//     }, 1000) 
// }
// export function* rootSaga ({getState, dispatch}) {
//     // 监听派发给仓库的动作，如果动作类型匹配的话，会执行对应的函数
//     yield takeEvery(types.ADD_ASYNC, add, dispatch)
//     console.log('rootSaga')
// }

// put =》 告诉saga给仓库派发一个动作
import { put, takeEvery, all, call } from 'redux-saga/effects'
import * as types from './store/actions-type'
function* add (dispatch) {
    yield put({type: types.ADD})
}
function logger (actions) {
    console.log(actions)
}

/**
 * soage分为三类： 1.rootSaga, 2.监听saga 3.worker干活的saga
 */
function* watchLogger () {
    yield takeEvery('*', logger)
}
function* watchAdd () {
    // 监听派发给仓库的动作，如果动作类型匹配的话，会执行对应的函数
    yield takeEvery(types.ADD_ASYNC, add)
}
export function* rootSaga ({getState, dispatch}) {
    yield all([watchLogger(), watchAdd()])
    console.log('rootSaga')
}