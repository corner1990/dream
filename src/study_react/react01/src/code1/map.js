import React, {Component} from 'react'
import {render} from 'react-dom'

let arr = ['老大', '老二', '老三']
function toLis () {
    return arr.map((item, index) => <p key={index}>{item}</p>)
}

// let el = toLis()
// render(el, window.root)


let wrap = <div>{toLis()}</div>
render(wrap, window.root)

// 组件化
// 复用，提高可维护性
// 组件的组成 react元素组成，组件就是一个函数
// 组件(函数组件， 类组件)属性，状态
