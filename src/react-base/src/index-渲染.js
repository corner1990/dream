
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// const time = new Date();
// // 第一个jsx 元素
// const Hello = <h2
//   className='hello'
//   style={{
//     margin: 100
//   }}
// >
//   hello react &emsp;
//   {time.toLocaleDateString()} { time.toLocaleTimeString() } 
// </h2>

// function  render() {
  
//   ReactDOM.render(
//     <React.StrictMode>
//       {Hello}
//     </React.StrictMode>,
//     document.getElementById('root')
//   );
// }
// // 渲染页面
// render() 

// 多次渲染
function  render() {
  // 如果元素在外部，就不会被重新赋值
  const time = new Date();
  // 第一个jsx 元素
  const Hello = <h2
    className='hello'
    style={{
      margin: 100
    }}
  >
    hello react &emsp;
    {time.toLocaleDateString()} { time.toLocaleTimeString() } 
  </h2>
  ReactDOM.render(
    <React.StrictMode>
      {Hello}
    </React.StrictMode>,
    document.getElementById('root')
  );
}
// 更新页面
setInterval(render, 1000)

