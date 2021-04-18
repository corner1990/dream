import React, {Component} from 'react';

class Child extends Component{
  componentWillUnmount(...props) {
    console.log('child componentWillUnmount', props)
  }
  render() {
    return (<p>child {this.props.count}</p>)
  }
}
/** 定义class 组件 */
class HelloWrold extends Component {
  state = {
    count: 0
  }
  // 
  static getDerivedStateFormProps(props, state) {
    // getDerivedStateFromProps， render 方法之前调用，并且在初始挂载及后续更新时都会被调用。
    // 它应返回一个对象来更新 state，如果返回 `null` 则不更新任何内容
    console.log('getDerivedStateFromProps', props, state)

  }
  // }
  // // 组件挂载之前运行
  // componentWillMount(...args) {
  //   console.log('componentWillMount', args)
  // }
  // 组件挂载完毕
  componentDidMount() {
    console.log('componentDidMount')
  }
  
   // 返回boolean，是否更新页面，性能优化使用
   shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate', nextProps, nextState)
    // 当count能 % 3 = 0 不更新页面
    return nextState.count % 3 !== 0
  }
  // 组件快照  
  // 和 componentWillMount 不能共存
  getSnapshotBeforeUpdate(prevProps, prevState) {
    // 在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。此生命周期的任何返回值将作为参数传递给 componentDidUpdate()。
    console.log('getSnapshotBeforeUpdate', prevProps, prevState)
    // return prevProps
    // return prevState
    return [prevProps, prevState]
  }
  // 组件更新完毕
  componentDidUpdate(...args) {
    console.log('componentDidUpdate', args)
  }
  
  
 
  // 组件卸载之前调用，主要用来取消订阅，清除当前组件内部的定时器
  componentWillUnmount(...props) {
    console.log('componentWillUnmount', props)
  }
  // 捕捉错误
  componentDidCatch(err) {
    console.log('componentDidCatch', err)
  }
  /**
   * @desc 更新state
   */
  increasement = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
  render() {
    return <section>
      <h1>class 组件 与生命周期</h1>
      <p>count： { this.state.count }</p>
      {/* 当count 大于等于14的时候卸载child组件 */}
      <button onClick={this.increasement}>increate btn</button>
      {this.state.count < 10 && <Child count={this.state.count} />}
    </section>
  }
}

export default HelloWrold
