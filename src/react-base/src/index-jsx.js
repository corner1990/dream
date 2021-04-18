
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// 第一个jsx 元素
const Hello = <h2 className='hello'>hello react</h2>

// 打印hello 元素信息
console.log('Hello', Hello)
// Hello 
// {$$typeof: Symbol(react.element), type: "h2", key: null, ref: null, props: {…}, …}
// $$typeof: Symbol(react.element)
// key: null
// props: {className: "hello", children: "hello react"}
// ref: null
// type: "h2"
// _owner: null
// _store: {validated: true}
// _self: undefined
// _source: {fileName: "/Users/corner/Documents/dream/src/react-base/src/index.js", lineNumber: 6, columnNumber: 15}
// __proto__: Object

ReactDOM.render(
  <React.StrictMode>
    {Hello}
  </React.StrictMode>,
  document.getElementById('root')
);

