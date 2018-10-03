// import React,{Component, PureComponent} from 'react';
import React, { Component } from 'react';
import PureComponent from './PureComponent';
import {connect} from 'react-redux'

// PureComponent 组件优化的原理是重写了shouldComponentUpdate，如果说老的状态对象昂和新的状态对戏那个不是一个对戏那个的话才会刷新页面
/**
 * 1.每一次都要生成一个新的对象, 深克隆是非常消耗内存的
 */
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
// 这里是拿到的合并后的state， state应该也是一个immutable对象猜对
export default connect(
  state => {
    console.log(({ number: state.getIn(['counter', 'number']) }))
    return ({ number: state.getIn(['counter', 'number']) })
  },
  actions
)(Counter)
