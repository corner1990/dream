// import React,{Component, PureComponent} from 'react';
import React,{Component} from 'react';
import _ from 'lodash'
import ReactDOM from 'react-dom';
import PureComponent from './PureComponent';
// PureComponent 组件优化的原理是重写了shouldComponentUpdate，如果说老的状态对象昂和新的状态对戏那个不是一个对戏那个的话才会刷新页面
/**
 * 1.每一次都要生成一个新的对象, 深克隆是非常消耗内存的
 */
class Counter extends PureComponent{
  state = {
    counter: { number: 0}
  }
  handleClick = event => {
    // let state = this.state
    // 每次生成新的对象, 这样子PureComponent组件才会刷新页面
    let state = _.cloneDeep(this.state)
    let amount = this.amount.value ? Number(this.amount.value) : 0
    state.counter.number = state.counter.number + amount
    this.setState(state)
  }
  render () {
    console.log('render')
    return (
      <div>
        <p>{this.state.counter.number}</p>
        <input ref={input => this.amount = input}/>
        <button onClick={this.handleClick}>add</button>
      </div>
    )
  }
}

ReactDOM.render(<Counter></Counter>, document.getElementById('root'));

