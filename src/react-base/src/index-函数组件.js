
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// 函数组件
function  Hello(props) {
  return <h2>Hello {props.text}</h2>
}
// class 组件
class HelloWord extends React.Component{
  render() {
    return <h2>Hello {this.props.text}</h2>
  }
}
// 组合组件
// class 组件
class HelloWord2 extends React.Component{
  render() {
    return (<section>
      <h2>组合组件</h2>
      <Hello {...this.props} />
    </section>)
  }
}
ReactDOM.render(
  <React.StrictMode>
    <Hello text='React' />
    <HelloWord text={'World'} />
    <HelloWord2 text={'World2'} />
  </React.StrictMode>,
  document.getElementById('root')
);

