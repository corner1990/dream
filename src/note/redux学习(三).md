# redux学习(三)

> 在之前的两篇文章我们实现了简单的redux的源码，接下来将写一个redux库，

### 创建目录

> 初始化一个react项目，然后删除所有src写的文件，自己创建文件如下

```php+HTML
├── redux
|   ├── createStore.js
|   └── index.js
├── components
|   ├── Counter.js
|   └── 
├── store
|   ├── actions-types.js
|   ├── actions.js
|   ├── index.js
|   └── post.html
├── index.js
```

### 编写具体文件内容

- redux目录下的文件内容

  - createStore.js

  > 这个方法就是在上一篇文章中写的createStore函数

  ```javascript
  /**
   * 创建state
   */
  function createStore(reducer) {
    let state;
    let listeners = [] // 订阅数组
  
    // 监听函数
    function subscribe(listener) {
      listeners.push(listener)
      // 返回一个函数，可以取消订阅
      return () => {
        listeners = listeners.filter(item => item !== listener)
      }
    }
    /**
     * 获取store
     */
    function getState() {
      // 做一个克隆，防止对象被修改
      return JSON.parse(JSON.stringify(state))
    }
  
    function dispatch(action) {
      state = reducer(state, action)
      // 状态更新以后，执行所有的监听函数
      listeners.forEach(fn => fn())
    }
    // 需要主动调用一次dispatch进行初始化
    dispatch({ 'type': '@@INIT' })
    return {
      getState,
      dispatch,
      subscribe
    }
  }
  
  export default createStore;
  ```

  - index.js 内容

  > 这里主要是到处该目录下文件

  ```javascript
  import createStore from './createStore'
  export {
    createStore
  }
  
  ```

- store目录下内容编写

  - actions-type.js

  ```javascript
  // 定义好的action
  export const ADD = 'ADD' // 增加的action
  export const MINUS = 'MINUS' // 减少的action
  ```

  - action.js

  > 我们像外部暴露一个函数，调用该函数的时候返回具体的action-type字符串

  ```javascript
  import { ADD, MINUS } from '../store/actions-types'
  export default {
    add () {
      return {type: ADD}
    },
    minus() {
      return { type: MINUS }
    }
  }
  ```

  - reducer.js

  > action动作处理函数,考虑到假如没有初始化就会报错，这里如果state对象为null的时候我们需要给一个默认值

  ```javascript
  import { ADD, MINUS } from "./actions-types";
  let initState = { number: 0 }
  
  // 处理器
  export default function reducer(state = initState, action) {
    switch (action.type) {
      case ADD:
        return { number: state.number + 1 }
        break;
      case MINUS:
        return { number: state.number - 1 }
        break;
  
      default:
        return state
        break;
    }
  }
  ```

  - index.js

  > 这个文件导出一个store对象

  ```javascript
  import reducer from './reducer';
  import { createStore} from '../redux' 
  let store = createStore(reducer)
  
  export default store
  
  ```



- component

  - Counter.js

  > 一个简单的计数器代码

  ```javascript
  import React from 'react';
  import {ADD, MINUS} from '../store/actions-types'
  import store from '../store'
  
  export default class Counter extends React.Component {
    // 拿到一个store对象，并挂载到当前对象上
    state = store.getState()
    componentDidMount() {
      // 组件挂载完成以后，订阅state的事件
      store.subscribe(() => this.setState({
        number: store.getState().number
      }))
    }
    render () {
      return (
        <div>
          <p>Counter: {this.state.number}</p>
          <button onClick={() => store.dispatch({ type: ADD })}>+</button>
          <button onClick={() => store.dispatch({ type: MINUS })}>-</button>
        </div>
      )
    }
    
  }
  ```

- index.js

> 根目录index, 程序入口文件

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import Conuter from './components/Counter'

ReactDOM.render(<Conuter />, document.getElementById('root'));
```



### 总结

> 以上我们实现了一个简单地redux库，并在state变化的时候更新了react视图，在上述的代码中，我们将代码进行了简单的拆分，为了方便操作，我们还将action封装成为方法，我们调用该方法的时候返回具体的action-type