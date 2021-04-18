import React, {Component} from 'react';

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
  /**
   * @desc 更新state
   */
  increasement = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
  /**
   * @desc 更新state 传递参数
   */
  increasement2 = (count) => this.setState({ count })
  
  render() {
    return <section style={{
      margin: 30
    }}>
      <h1></h1>事件处理
      <p>count： { this.state.count }</p>
      {/* 当count 大于等于14的时候卸载child组件 */}
      <button onClick={this.increasement}>increate btn</button>
      <br />
      <br />
      <button onClick={() => this.increasement2(this.state.count + 2)}>increate + 2</button>
    </section>
  }
}

export default HelloWrold
