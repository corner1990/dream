
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HelloWord from './component/HelloWorld'
// 函数组件
function  Hello(props) {
  return <h2>Hello {props.text}</h2>
}
// 组合组件
ReactDOM.render(
  <React.StrictMode>
    <Hello text='React' />
    <HelloWord />
  </React.StrictMode>,
  document.getElementById('root')
);

