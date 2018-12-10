// import {take, put} from 'redux-saga/effects'
import { take, put, takeEvery} from './redux-saga/effect'
import * as types from './store/actions-type'

// export function* rootSaga() {
//     // take 表示等待一个动作发生
//     while (true) {
//         let action = yield take(types.ADD_ASYNC) // 拿到一个对象 {type: 'take', actiontype: types.ADD_ASYNC}
//         yield put({ type: types.ADD })
//     }
// }

// const delay = ms => new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve()
//     }, ms);
// })

function* add() {
    console.log('add')
    put({ type: types.ADD })
}
export function* rootSaga() {
    // takeEvery 监听所有的动作
    takeEvery(types.ADD_ASYNC, add)
}

