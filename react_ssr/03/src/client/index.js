import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import routers from '../routes'
// hydrate 表示把服务端渲染未完成的工作完成，比如绑定事件完成
ReactDOM.hydrate(<BrowserRouter>
    {routers}
</BrowserRouter>, document.getElementById('root'))