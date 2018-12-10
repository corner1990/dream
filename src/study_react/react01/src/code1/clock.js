// 闹钟组件
import React, {Component} from 'react'
import {render} from 'react-dom'

// 组件名必须大写
// 组件也是react元素
function Clock (props) {
    return <p>当前时间：{props.time} </p>
}

// let wrap = <div>
//         <Clock time= '2018/08/30'></Clock>
//         <Clock time= '2018/08/30'></Clock>
//     </div>
// render(wrap, window.root)

// 函数组建中 没有自己的状态
// 函数组建中没有this
// 没有生命周期

// render 方法会渲染虚拟dom，但是只渲染一次
// render 方法渲染只会局部更新
let wrap = <div>
<Clock time={new Date().toLocaleTimeString()}></Clock>
</div>
setInterval(() => {
    render(<div>
        <Clock time={new Date().toLocaleTimeString()}></Clock>
        </div>, window.root)
}, 1000)