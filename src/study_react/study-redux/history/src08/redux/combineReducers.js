/**
 * 因为redux应用只能有一个仓库，只能有一个reducer，当我们写了很多个的时候就需要一个方法来合并
 * 这个方法就是处理合并多个reducer合并成一个reducer
 */

 export default function (reducers) {
     // 返回一个函数，这个函数就是合并后的reducer
     return function (state = {}, action) {
        let newState = {}
        // 迭代reducers的每一个属性
        for (let key in reducers) {
            // 拿到合并前的处理器函数，然后执行并运算
            // 经过处理以后，
            // key = counter（reducer）
            // newState.key = reducers[key] // 这里赋值给newState的就是counter的reducer
            // state是合并后的状态树
            newState[key] = reducers[key](state[key], action)
        }
        return newState
     }
 }