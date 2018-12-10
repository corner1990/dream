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
const delay =  ms => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve()
    }, ms)
})
function* add (dispatch) {
    // yield delay(1000)
    // call 表示告诉saga，请帮忙执行下函数，并将100作为参数传入
    yield call(delay, 1000)
    yield put({type: types.ADD})
}

function* watchAdd () {
    // 监听派发给仓库的动作，如果动作类型匹配的话，会执行对应的函数
    yield takeEvery(types.ADD_ASYNC, add)
}

export function* rootSaga ({getState, dispatch}) {
    yield  watchAdd()
    console.log('rootSaga')
}