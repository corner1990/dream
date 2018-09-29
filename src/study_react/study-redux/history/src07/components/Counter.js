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
        {/* <button onClick={() => store.dispatch(actions.add())}>+</button>
        <button onClick={() => store.dispatch(actions.minus())}>-</button> */}
        {/* 自动配发事件的写法 */}
        {/* <button onClick={action.add}>+</button>
        <button onClick={action.minus }>-</button> */}
        {/* 传参调用方式 */}
        <button onClick={() => this.props.add(1)}>+</button>
        <button onClick={() => this.props.minus(2)}>-</button>
        <button onClick={() => this.props.thunk(1)}>thunk</button>
        <button onClick={() => this.props.promise1(1)}>promse</button>
        <button onClick={() => this.props.playloadPromise(1)}>playloadPromise</button>
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