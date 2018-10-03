// import React,{Component, PureComponent} from 'react';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import PureComponent from './PureComponent';
import _ from 'lodash'
let immutable = require('immutable')
let { Map, List, fromJS } = immutable
// PureComponent 组件优化的原理是重写了shouldComponentUpdate，如果说老的状态对象昂和新的状态对戏那个不是一个对戏那个的话才会刷新页面
/**
 * 1.每一次都要生成一个新的对象, 深克隆是非常消耗内存的
 */
class Counter extends PureComponent{
  state = {
    counter: Map({ number: 0})
  }
  handleClick = event => {
    // 优化的深拷贝，实现了节约内存
    let amount = this.amount.value ? Number(this.amount.value) : 0
    let newState = { ...this.state, counter: this.state.counter.update('number', val => val + amount)}

    this.setState(newState)
  }
  render () {
    console.log('render')
    return (
      <div>
        <p>{this.state.counter.get('number')}</p>
        <input ref={input => this.amount = input}/>
        <button onClick={this.handleClick}>add</button>
      </div>
    )
  }
}

ReactDOM.render(<Counter></Counter>, document.getElementById('root'));

