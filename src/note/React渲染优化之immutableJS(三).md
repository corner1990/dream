# React渲染优化之immutableJS(三)

> 在前两节的基础上，我们在这节引入react-redux，并在react-redux中使用immutablejs

### 创建项目

- 使用create-react-app创建目录
- 删除src目录下所有文件

### 创建入口文件

```javascript
// index.js
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import store from './store'
import {Provider} from 'react-redux'
import Counter from './Counter'

ReactDOM.render(<Provider store={store}>
  <Counter />
</Provider>, document.getElementById('root'));

```



### 创建store

- 在src目录下新建store目录
- 在src/store/里新建index.js文件
- 这里需要引用一个新的组件`redux-immutable`, 并从中间结构出来`combineReducers`方法。
- 因为是写一个简单的demo，这里就将reducers和createStore都写在一起了，内容如下：

```javascript
import { createStore } from "redux";
import {combineReducers} from 'redux-immutable'
let immutable = require('immutable')
let { Map } = immutable
// 使用immutable创建初始状态
let initState = Map({number: 0})

function counter(state = initState, action) {
  switch (action.type) {
    case 'ADD':
      // 更新数据，返回最新的数据对象
      let newstate = state.update('number', val => val + action.payload)
      return newstate
    default:
      return state
  }
}

let reducers = combineReducers({
  counter
})

let store =createStore(reducers)
export default store
 
```

### Counter.js 组件

```javascript
// import React,{Component, PureComponent} from 'react';
import React, { Component } from 'react';
import PureComponent from './PureComponent';
import {connect} from 'react-redux'

class Counter extends PureComponent {
  render() {
    return (
      <div>
        <p>{this.props.number}</p>
        <input ref={input => this.amount = input} />
        <button onClick={() => {
          let amount = this.amount.value - 0 || 0
          this.props.add(amount)
        }}>add</button>
      </div>
    )
  }
}
let actions = {
  add (payload) {
    return {
      type: 'ADD',
      payload
    }
  }
}
// 这里是拿到的合并后的state， state应该也是一个immutable对象才对
export default connect(
  state => {
    console.log(({ number: state.getIn(['counter', 'number']) }))
    return ({ number: state.getIn(['counter', 'number']) })
  },
  actions
)(Counter)

```

### PureComponent.js组件模板

```javascript
import React, { Component } from 'react';
import { is } from "immutable";

// 使用immutable的处理
let prevProps = {}
class PureComponent extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    let newProps = nextProps ? nextProps : {}
    
    // 如果属性键不同，直接更新页面
    let keys = Object.keys(newProps)
    if (Object.keys(prevProps).length !== keys.length) {
      prevProps = newProps
      return true
    }
    for (var i = 0, len = keys.length; i < len; i++) {
      let key = keys[i]
      // 如果说属性值不一样，说明需要更新状态
      if (!is(newProps[key], prevProps[key])) {
        prevProps = newProps
        return true
      }
    }
    return false
  }

}

export default PureComponent
```

### 结束语

> 这就是简单的immutable结合redux的引用，简单的起一个抛砖引玉的效果