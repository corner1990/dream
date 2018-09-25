# redux学习(四).md

> 上一篇文章实现了简单的redux调用，我们发现想要更新数据的时候书写非常麻烦，而且还不好记忆，为了解决这个问题，我们就写一个方法(bindActionCreators)，该方法接受两个参数，一个actions对象，一个我们需要触发的函数（store.dispatch），返回一个对象，该对象可以直接调用方法，然后传入参数直接调用，实现更新state状态

### 在redux新建文件bindActionCreators.js

```javascript
export default function (actions, dispatch) {
  // 我们需要返回的状态
  // actions = {add () {dispatch({type: ADD})}, minus () {dispatch({type: MINUS})}}
    
  // let newActons = {}
  // 这么写 不是很优雅
  // for (let key in actions) {
  //   newActons[key] = () => dispatch(actions[key]())
  // }
  // return newActons

  return Object.keys(actions).reduce((memo, key) => {
    // memo[key] = (...args) => dispatch(actions[key]()) ...args 是方便我们后边传参
    memo[key] = (...args) => dispatch(actions[key](...args))
    return memo
  }, {})
}
```

### Counter.js修改

```javascript
import React from 'react';
import store from '../store'
/**
* 新增
*/
import actions from '../store/actions'
/**
* 新增
*/
// 绑定action，自动派发事件给store
import {bindActionCreators} from '../redux'
let action = bindActionCreators(actions, store.dispatch)
 
export default class Counter extends React.Component {
  state = store.getState()
  componentDidMount() {
    store.subscribe(() => this.setState({
      number: store.getState().number
    }))
  }
  render () {
    return (
      <div>
        <p>Counter: {this.state.number}</p>
        {/* 自动配发事件的写法 */}
        {/* <button onClick={action.add}>+</button>
        <button onClick={action.minus }>-</button> */}
        {/* 传参调用方式 */}
        <button onClick={() => action.add(1)}>+</button>
        <button onClick={() => action.minus(2)}>-</button>
      </div>
    )
  }
  
}
```

### 总结

> 世界是简单的，如果不简单，那就想办法把他变简单，做一个简单的懒人，是超级愉悦的事情