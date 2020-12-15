import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { registerMicroApps, start, initGlobalState } from 'qiankun'

// 组件之间通信
import event from './utils/event'
console.log('event', event)
const actions = initGlobalState({
  status: 'base'
})
actions.onGlobalStateChange((state, prev) => {
  // state: 变更后的状态; prev 变更前的状态
  console.log(state, prev);
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
let child1 = {
  name: 'reactApp',
  container: '#reactApp',
  entry: 'http://localhost:9999',
  activeRule: '/reactApp',
  props: {
    event
  }
}
let child2 = {
  event,
  name: 'reactApp2',
  container: '#reactApp2',
  entry: 'http://localhost:8888',
  activeRule: '/reactApp2',
  props: {
    event
  }
}
registerMicroApps([child1, child2])
start()
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
