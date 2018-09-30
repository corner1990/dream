// 这里所有的函数都会返回一个effect，effect就是一个普通对象
// effect 对象都有一个type，告诉saga中间件做什么
function take (actionType) {
    return {
        type: 'take',
        actionType
    }
}

function put (action) {
    return {
        type: 'put',
        action
    }
}
function fork (worker) {
    return {
        type: 'fork',
        worker
    }
}
/**
 * 监听每一个动作类型，当此动作发生的时候，执行对象的worker函数
 * takerEvery 有一个特点：会单开一个任务，不会阻塞当前的任务执行
 * @param {string} actionType 动作类型
 * @param {function} worker 发生动作后的回调函数
 */
function* takeEvery (actionType, worker) {
    yield fork(function* () {
        while (true) {
            let action = yield take(actionType)
            yield worker(action)
        }
    })
}
export {
    take,
    put,
    takeEvery
}
