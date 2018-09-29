import compose from './compose'
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
export default applyMiddleware