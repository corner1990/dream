# redux学习(六)

> 为了方便操作，我们在本篇文章将完成编写react-redux的编写，事先Provider,connect组件，并将store映射到this，减少文件引入

### react-redux

> 在src目录下新建目录react-redux，并在新建的目录内创建一下文件
>
> 1.connect.js 仓库和组件的链接
>
> 2.context.js  上下文对象
>
> 3.index.js  导出文件
>
> 4.Provider.js 

- index.js内容

  > 暴露出需要的模块

  ```javascript
  import Provider from './Provider'
  import connect from './connect'
  export{
      Provider,
      connect
  }
  ```

- context.js文件内容

  ```javascript
  // 创建上下文对象，并导出给外部使用
  import React from 'react';
  let {Provider, Consumer}  = React.createContext()
  
  export {
      Provider,
      Consumer
  }
  ```

- connect.js内容

  > 思路：导入对象，拿到上下文的Consumer对象，以及自动绑定actions的方法bindActionCreators
  >
  > 代码实现思路：
  >
  > 	1.导出一个函数组件
  >	
  > 	2.该组件接受三个参数： connect 实现的是仓库和组件的链接，mapStateToProps 是一个函数 把状态映射为一个属性对象，mapDispatchToProps 是一个函数，把dispatch方法映射为一个属性对象
  >	
  > 	3.返回一个高阶函数，这个参数接收一个参数，参数为一个react组件
  >	
  > 	4.在返回的组件内部新建一个类组件Propxy组件，这个组件主要实现上下文传递，组件挂在以后订阅state的事件，组件卸载的时候销毁订阅，

  ```javascript
  import React, {Component} from 'react';
  import {Consumer} from './context'
  import { bindActionCreators } from '../redux';
  /**
   * connect 实现的是仓库和组件的链接
   * mapStateToProps 是一个函数 把状态映射为一个属性对象
   * mapDispatchToProps 是一个函数，把dispatch方法映射为一个属性对象
   */
  export default function (mapStateToProps, mapDispatchToProps) {
       return function (Compon) {
           // 在这个组件实现仓库和组件的链接
           class Propxy extends Component{
               state = mapStateToProps(this.props.store.getState())
              
              componentDidMount () {
                  // 组件挂在之后订阅世界
                  this.unsubscribe = this.props.store.subscribe(() => {
                       this.setState(mapStateToProps(this.props.store.getState()))
                   })
               }
               componentWillUnmount () {
                   // 组件卸载之前关闭订阅
                   this.unsubscribe()
               }
               render () {
                   let actions = {}
                   // 如果是一个mapDispatchToProps 是一个函数，执行后得到属性对象
                   if (typeof mapDispatchToProps === 'function') {
                       actions = mapDispatchToProps(this.props.store.dispatch)
                   } else {
                      // 如果是mapDispatchToProps是一个对象，需要我们自己绑定
                      actions = bindActionCreators(mapDispatchToProps, this.props.store.dispatch)
                   }
                   return <Compon {...this.state} {...actions} />
               }
           }
           return () => (
               <Consumer>
                  {
                      value => {
                          return <Propxy store={value.store} />
                      }              
                  }
               </Consumer>
           );
       }
   }
  ```

- Provider.js内容

  ```javascript
  /**
   * 是一个组件，用来接收store，经在经过他的手，通过context api传递给所有的子组件
   */
  import React, {Component} from 'react'
  import {Provider as StoreProvider, Consumer} from './context'
  import PropTypes  from 'prop-types'
  export default class Provider extends Component{
      // 如果有人想使用这个组件，必须提供一个redux仓库属性
      static propTypes = {
          store: PropTypes.object.isRequired
      }
      render () {
          let value = {store: this.props.store}
          return (
              // 使用Provider提供可以跨组件使用的上下文对象
              <StoreProvider value = {value}>
                  {this.props.children}
              </StoreProvider>
          )
      }
  }
  ```


### components目录下的修改

- Counter.js的修改

```javascript
import React from 'react';
import actions from '../store/actions/counter'
import { connect } from '../react-redux'
// 我们使用方法映射以后，不在需要如下繁琐的绑定
// import {bindActionCreators} from '../redux'
// import store from '../store'
// 绑定action，自动派发事件给store
// let action = bindActionCreators(actions, store.dispatch)
 
class Counter extends React.Component {
  // 经过方法映射以后，不需要这些状态，可以直接在this.props拿到属性
  // state = store.getState().counter
  // componentDidMount() {
  //   store.subscribe(() => this.setState({
  //     number: store.getState().counter.number
  //   }))
  // }
  render () {
    return (
      <div>
        <p>Counter: {this.props.number}</p>
        {/* 传参调用方式 */}
        <button onClick={() => this.props.add(1)}>+</button>
        <button onClick={() => this.props.minus(2)}>-</button>
      </div>
    )
  }
  
}
// 把仓库种的完整状态映射为属性对象 state.counter.number
let mapStateToProps = state => state.counter
// // 把dispatch映射银组建的属性对象 这个方法可以直接使用actions替代
// let mapDispatchToProps = dispatch => ({
//   add1 () {
//     dispatch({type: 'ADD', payload: 1})
//   },
//   MINUS () {
//     dispatch({type: 'MINUS', payload: 1})
//   }
// })
// 映射store属性
export default connect(mapStateToProps, actions)(Counter)
```

- Counter1.js内容修改如下

```javascript
import React from 'react';
import store from '../store'
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
        {/* <button onClick={() => store.dispatch(actions.add())}>+</button>
        <button onClick={() => store.dispatch(actions.minus())}>-</button> */}
        {/* 自动配发事件的写法 */}
        {/* <button onClick={action.add}>+</button>
        <button onClick={action.minus }>-</button> */}
        {/* 传参调用方式 */}
        <button onClick={() => action.add1(1)}>+</button>
        <button onClick={() => action.minus1(2)}>-</button>
      </div>
    )
  }
  
}
```

### 根目录下index.js 的修改

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import store from './store'
import Conuter from './components/Counter'
import Conuter2 from './components/Counter2'
import {Provider} from './react-redux'

ReactDOM.render(<Provider store={store}>
    <Conuter />
    <Conuter2 />
</Provider>, document.getElementById('root'));


```

### 总结

> 想了一下，不总接了，说了这么多，口有点干，手也有点酸