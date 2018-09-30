// import {take, put} from 'redux-saga/effects'
import {take, put} from './redux-saga/effect'
import * as types from './store/actions-type'
export function* rootSaga () {
    // take 表示等待一个动作发生
    while (true) {
        let action = yield take(types.ADD_ASYNC) // 拿到一个对象 {type: 'take', actiontype: types.ADD_ASYNC}
        yield put({type: types.ADD})
    }
}