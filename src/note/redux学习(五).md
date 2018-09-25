# redux学习(五)

> 很多时候我们会有很多个页面，会有很多个reducer，那么我们写在一起的话不仅不方便维护，而且文件一会变得越来越臃肿，那怎么办呢，当然是写一个方法，然后处理这些琐碎的事情
>
> combineReducers， 接受多个reducer，最后合并为一个reducer，然后返回这个合并后的对象

### combineReducers.js

> 在redux下新建文件，combineReducers.js代码如下

```javascript
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
```

- bindActionCreators.js

```javascript
/**
 * 我们不可能每次一个动作都手动大护法dispatch，这里方法主要是帮我们处理自动更新页面
 * @param {object} actions 动作类型
 * @param {fn} dispatch 派发动作的函数
 */
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



### 在redux/index.js导出该方法

```javascript
import createStore from './createStore'
import bindActionCreators from './bindActionCreators'
import combineReducers from './combineReducers'
export {
  createStore,
  bindActionCreators,
  combineReducers
}
```

### compoents下修改

- Counter.js

```javascript
import React from 'react';
import store from '../store'
import actions from '../store/actions/counter'
// 绑定action，自动派发事件给store
import {bindActionCreators} from '../redux'
let action = bindActionCreators(actions, store.dispatch)
 
export default class Counter extends React.Component {
  state = store.getState().counter
  componentDidMount() {
    store.subscribe(() => this.setState({
      number: store.getState().counter.number
    }))
  }
  render () {
    return (
      <div>
        <p>Counter: {this.state.number}</p>
        {/* 传参调用方式 */}
        <button onClick={() => action.add(1)}>+</button>
        <button onClick={() => action.minus(2)}>-</button>
      </div>
    )
  }
  
}
```



- Counter1.js

```javascript
import React from 'react';
import store from '../store'
// 这里引入的action和Counter是不一样的
import actions from '../store/actions/counter1'
// 绑定action，自动派发事件给store
import {bindActionCreators} from '../redux'
let action = bindActionCreators(actions, store.dispatch)
 
export default class Counter extends React.Component {
  state = store.getState().counter1
  componentDidMount() {
    store.subscribe(() => this.setState({
        number: store.getState().counter1.number
    }))
  }
  render () {
    return (
      <div>
        <p>Counter: {this.state.number}</p>
        <button onClick={() => action.add1(1)}>+</button>
        <button onClick={() => action.minus1(2)}>-</button>
      </div>
    )
  }
  
}
```

### store目录下的修改

- 新建actions目录，并创建Counter.js, Counter1.js

  - counter.js文件内容

  ```javascript
  /**
   * 抽离actions 单独管理
   */
  import { ADD, MINUS} from '../actions-types';
  export default {
    add(playload) {
      return { type: ADD, playload}
    },
    minus(playload) {
      return { type: MINUS, playload}
    }
  }
  ```



  - counter1.js文件内容

  ```javascript
  /**
   * 抽离actions 单独管理
   */
  import { ADD1, MINUS1 } from '../actions-types';
  
  export default {
    add1(playload) {
      return { type: ADD1, playload}
    },
    minus1(playload) {
      return { type: MINUS1, playload}
    }
  }
  ```

- 新建reuders文件目录，并在该目录下创建两个处理器Counter.js, Counter1.js

  - counter.js文件内容（这里处理counter 的action动作）

  ```javascript
  import { ADD, MINUS } from "../actions-types";
  let initState ={number: 0}
  
  // 处理器
  export default function reducer(state = initState, action) {
    switch (action.type) {
      // case ADD:
      //   return { number: state.number + 1 }
      //   break;
      // case MINUS:
      //   return { number: state.number - 1 }
      //   break;
      // 传参使用
      case ADD:
        return {number: state.number + (action.playload || 1)}
        break;
      case MINUS:
        return {number: state.number - (action.playload || 1)}
        break;
      default:
        return state
        break;
    }
  }
  ```



  - counter1.js文件内容（这里处理counter1 的action动作）

  ```javascript
  import { ADD1, MINUS1 } from "../actions-types";
  let initState = {number: 0}
  
  // 处理器
  export default function reducer(state = initState, action) {
    switch (action.type) {
      // case ADD:
      //   return { number: state.number + 1 }
      //   break;
      // case MINUS:
      //   return { number: state.number - 1 }
      //   break;
      // 传参使用
      case ADD1:
        return {number: state.number + (action.playload || 1)}
        break;
      case MINUS1:
        return {number: state.number - (action.playload || 1)}
        break;
      default:
        return state
        break;
    }
  }
  
  
  ```

- store/index.js文件修改

```javascript
import counter from './counter'
import counter1 from './counter1'
import {combineReducers} from '../../redux'
import reducer from './counter1';
// 合并多个处理器为一个处理器
let reducers = combineReducers({
    counter,
    counter1
})
export default reducers
```
### 根目录下index.js的修改

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import Conuter from './components/Counter'
import Conuter2 from './components/Counter2'

ReactDOM.render(<div>
    <Conuter />
    <Conuter2 />
</div>, document.getElementById('root'));

```



### 总结

> 到了这里，实现了简单的调用和多个reuducer合并后的操作，但是我们还是发现很多操作不人性化，后边继续优化