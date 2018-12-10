import React from 'react'
import {render} from 'react-dom'
import { strict } from 'assert';
// let el = <h1 title="hello">hello world</h1>
// 代码为了保证格式，写在一个括号里，防止出现意外问题
// let el = (
//     <div>
//         <li>1</li>
//         <li>2</li>
//     </div>
// )

// 某些情况下我们不需要包裹标签，为了防止报错，可以使用React.Fragment标签，可以有效减少无用的dom嵌套
// let el = (
//     <React.Fragment>
//         <li>1</li>
//         <li>2</li>
//     </React.Fragment>
// )

// 可以直接渲染数组
// let el = [
//     <li>1</li>,
//     <li>2</li>
// ]

// jsx元素有些特殊的属性和html不一样
// class -> className <h2 className="hello">hello world</h2>
// style -> 对象形式  <span style={{color: '#06c'}}>span</span>
// for -> hrmlFor  <label htmlFor="userName">userName</label>

// 区分是js还是html是根据< == html; { == js
// let str = '<h3>h3</h3>' // 防止xss攻击
// // <div dangerouslySetInnerHTML={{__html: str}}></div>

// let el = (
//     <React.Fragment>
//         <h2 className="hello">hello world</h2>
//         {/*注释*/}
//         <span style={{color: '#06c'}}>span</span><br />
//         <label htmlFor="userName">userName: </label>
//         <input type="text" id="userName"/>
//         <div dangerouslySetInnerHTML={{__html: str}}></div>
//     </React.Fragment>
// )
// render(el, document.querySelector('#root'))

// 表达式的用法
// 表达式可以进行取值，必须有返回值可以。
// null 或者void 0 都是一个合法的jsx元素，
// 可以实现三元判断
let fn = () => '嗯嘛嘛'
let el = (
    <div>
        {(() => 'hello world') ()}
        <p>{fn()}</p>
        <p>{123 + '456' + 789}</p>
        <p>{true ? 'true' : 'false'}</p>
    </div>
)

render(el, document.querySelector('#root'))
console.log(el)