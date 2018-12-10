import React from 'react';
import store from '../store'
import actions from '../store/actions'
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
        {/* <button onClick={() => store.dispatch(actions.add())}>+</button>
        <button onClick={() => store.dispatch(actions.minus())}>-</button> */}
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