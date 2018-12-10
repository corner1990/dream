# React渲染优化之immutableJS(四)

> 上一节实现了一个简单的immutable和react-redux的应用，在这一节，实现一个简单的处理合并redux-immutable的combineReducers方法

### index.js组件代码修改

```javascript
import { createStore } from "redux";
// import {combineReducers} from 'redux-immutable' // 这里注释掉，自己手动实现
let immutable = require('immutable')
let { Map } = immutable
let initState = Map({number: 0})

function counter(state = initState, action) {
  switch (action.type) {
    case 'ADD':
      let newstate = state.update('number', val => val + action.payload)
      return newstate
    default:
      return state
  }
}

// 自己实现combineReducers
// 1.返回一个function，这个函数有两个属性，一个state， action
// 2.创建一个新的state
// 3.遍历所有的reducers，然后设置给我们自己创建的state对象
// 4.返回自己创建的state对象
function combineReducers(reducers) {
  return function (state = Map({}), action) {
    let newState = Map({})
    for (let key in reducers) {
      newState = newState.set(key, reducers[key](state.get(key), action))
    }
    return newState
  }
}
// 合并reducers对象
let reducers = combineReducers({
  counter
})

// 拿到创建后的store
let store =createStore(reducers)
export default store
 
```

### 总结

> 通过以上简单的一个小方法，就实现了redux-immutable的combineReducers方法，嗯么么，到此结束，告辞