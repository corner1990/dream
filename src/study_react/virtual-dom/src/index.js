import { createElement, render, renderDom } from './element'
import diff from './diff'
import patch from './patch'
let vertualDom1 = createElement('ul', {class: 'list'}, [
    createElement('li', {class: 'item'}, ['a']),
    createElement('li', {class: 'item'}, ['b']),
    createElement('li', {class: 'item'}, ['c'])
])

let vertualDom2 = createElement('ul', {class: 'list-group'}, [
    createElement('li', {class: 'item'}, ['1']),
    createElement('li', {class: 'item'}, ['b']),
    createElement('div', {class: 'item'}, ['3'])
])

// console.log(vertualDom) //虚拟dom
let el = render(vertualDom1) // 虚拟dom转化为真实dom
// console.log(el)

// 渲染页面
renderDom(el, window.root)

// DOM Diff是比较两个虚拟DOM的区别， 比较两个对象的区别
// dom Diff的作用，根据两个虚拟对象创建出补丁，描述改变的内容，将这个补丁用来更新dom
let patchs = diff(vertualDom1, vertualDom2)
console.log(patchs)

// 给元素打补丁,重新更是视图
patch(el, patchs)

// 如果平级元素有互换 那会导致重新渲染
// 新增节点也不会被更新
// index 实现换位置