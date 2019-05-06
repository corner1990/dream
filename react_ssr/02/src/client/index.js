import React from 'react'
import ReactDOM from 'react-dom'
import Counter from '../containers/Counter'
// hydrate 表示把服务端渲染未完成的工作完成，比如绑定事件完成
ReactDOM.hydrate(<Counter />, document.getElementById('root'))