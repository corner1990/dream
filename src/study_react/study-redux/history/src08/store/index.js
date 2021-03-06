import reducer from './reducers';
// import createStore from '../redux/createStore' 
import { createStore, applyMiddleware} from '../redux' 
// let store = createStore(reducer)

// 模拟中间件原理
// let dispatch = store.dispatch

// store.dispatch = action => {
//     console.log(store.getState())
//     dispatch(action)
//     console.log(store.getState())
// }

// 一个redux日志中间件
function logger (store) { // store， 最初始的仓库
    return function (next) { // next => store.dispatch
        return function (action) {// 自定义dispatch方法
            console.log('old', store.getState())
            next(action)
            console.log('new', store.getState())
        }
    }
}
function thunk ({dispatch, getState}) {
    // 如果接收到的action是一个function的话执行这个函数，并把解构的dispat和getState作为参数传递过去，
    // 如果不是函数，则直接调用next()
    // return function (next) { // next => store.dispatch
    //     return function (action) {// 自定义dispatch方法
    //         if (typeof action === 'function') {
    //             console.log('haha')
    //             action(dispatch, getState)
    //         } else {
    //             next(action)
    //         }
    //     }
    // }
    return next => action => {
                if (typeof action === 'function') {
                    action(dispatch, getState)
                } else {
                    next(action)
                }
            }
    
}

function promise ({dispatch, getState}) {
    // 如果接收到的action是一个function的话执行这个函数，并把解构的dispat和getState作为参数传递过去，
    // 如果不是函数，则直接调用next()
    return next => action => {
                // 如果拿到的结果是一个promse，则等待结果
                if (action.then && typeof action.then === 'function') {
                    action.then(dispatch)
                } else if (action.playload && action.playload.then && typeof action.playload.then === 'function') {
                    // 如果action.payload属性存在
                    // action.payload.then 属性也存在
                    // action.payload.then 属性是一个function
                    action.playload.then(playload => {
                        dispatch({...action, playload})
                    }, playload => {
                        dispatch({...action, playload})
                    })
                } else {
                    next(action)
                }
            }
    
}
// /**
//  * 挂在中间件
//  * @param {function} middlerware 中间件函数
//  */
// function applyMiddleware (middlerware) {
//     return function (createStore) {
//         return function (reducer) {
//             // 这是原始仓库，dispatch 就是原始的dispatch
//             let store = createStore(reducer)
//             // 调用传入的中间件，拿到第一个返回的函数
//             let ware = middlerware(store)
//             // 调用中间见返回的函数，并把store.dispatch传过去，返回一个新的方法
//             let dispatch = ware(store.dispatch)
//             // 解析老的store, 覆盖dispatch方法
//             return {
//                 ...store,
//                 dispatch
//             }
//         }
//     }
// }
/**
 * 挂在中间件
 * @param {function} middlerware 中间件函数
 */
function applyMiddleware (...middlerwares) {
    return function (createStore) {
        return function (reducer) {
            // 这是原始仓库，dispatch 就是原始的dispatch
            let store = createStore(reducer)
            let dispatch; // 此dispatch指向新的dispatch方法
            // 调用传入的中间件，拿到第一个返回的函数
            let ware = middlerwares.map(middlerware => middlerware({
                getState: store.getState,
                dispatch: store.dispatch
            }))
            // ware => 中间件的next方法
            dispatch = compose(...ware)(store.dispatch)
            return {
                ...store,
                dispatch
            }
        }
    }
}


// 自己写的库实现
let store = applyMiddleware(promise, thunk, logger)(createStore)(reducer)
// 目前主流的写法
// let store = createStore(reducer, {}, applyMiddleware(promise, thunk, logger))
export default store
