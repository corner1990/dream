// import React, {Component} from 'react';
// import dva, { connect } from 'dva'

// let app = dva()
// // combineReducers({
// //   counter: counter
// // })
//  // state 合成后的样子
// //  {
// //    counter: {number: 1}
// //  }
// // 配置模型
// app.model({
//   // 命名空间，它就是之前combineReducers里边的key值
//   namespace: 'counter',
//   state: { // 状态
//     number: 0
//   },
//   // 处理器， 这里可以直接定义子reducer
//   reducers: {
//     // 这个函数会在派发一个动作 'counter/add'的时候触发add函数
//     add (state, action) {
//       return {number: state.number + 1}
//     },
//     minus (state, action) {
//       return { number: state.number - 1 }
//     }
//   }
// })
// // 定义组件， dva里所有的组件都是函数组件
// // function Counter({ number, dispatch}) {
// //   return (
// //     <div>
// //       <p>{number}</p>
// //       <button onClick={()=> dispatch({type: 'counter/add'})} >add</button>
// //       {/* <button onClick={add} >add</button> */}
// //     </div>
// //   )
// // }
// // 使用action派发
// let actions = {
//   add () {
//     return {
//       type: 'counter/add'
//     }
//   }, 
//   mins () {
//     return {
//       type: 'counter/minus'
//     }
//   }
// }
// function Counter({ number, add }) {
//   return (
//     <div style={{border: '1px solid #06c', width: 200, height: 3 00, margin: '100px auto 0', padding: 20}}>
//       <p>{number}</p>
//       <button onClick={add} >add</button>
//     </div>
//   )
// }
// // 使用connect连接
// let mapStatetoProps = state => state.counter
// // let ConnectCounter = connect(
// //   mapStatetoProps
// // )(Counter)

// // 使用actions派发动作
// let ConnectCounter = connect(
//   mapStatetoProps,
//   actions
// )(Counter)
// // 定义路由
// app.router((history, app) => (
//   <div>
//     <ConnectCounter />
//   </div>
// ))
// // 启动程序
// app.start('#root')



// 增强工功能
import React, { Component } from 'react';
import dva, { connect } from 'dva'

let app = dva()

// 配置模型
app.model({
  // 命名空间，它就是之前combineReducers里边的key值
  namespace: 'counter',
  state: { // 状态
    highest: 0, // 每秒钟最高值
    current: 0 // 当前值
  },
  // 处理器， 这里可以直接定义子reducer
  reducers: {
    // 这个函数会在派发一个动作 'counter/add'的时候触发add函数
    add(state, action) {
      let newCurrent = state.current + 1
      return {
        current: newCurrent,
        highest: state.highest < newCurrent ? newCurrent : state.highest
      }
    },
    minus(state, action) {
      return { ...state, current: state.current - 1 }
    }
  },
  // 处理异步函数, 这个对象里放的是一个副作用，是一个generator
  effects: {
    /**
     * 
     * @param {object} action 动作对象
     * @param {object} effects redux-saga/effects 对象类似
     */
    *add (action, effects) {
      let {call, put} = effects
      // call(表示一个异步任务) 调用delay函数，并将1000作为参数传递过去
      yield call(delay, 1000)
      // 在module里派发动作不需要添加namespace(命名空间),直接调用type就可以
      yield put({type: 'minus'})

    }
  }
})
function delay (ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, ms);
  })
}
// 定义组件， dva里所有的组件都是函数组件
// 使用action派发
let actions = {
  add() {
    return {
      type: 'counter/add'
    }
  },
  mins() {
    return {
      type: 'counter/minus'
    }
  }
}
function Counter({ highest, current, add }) {
  return (
    <div style={{ border: '1px solid #06c', width: 200, height: 300, margin: '100px auto 0', padding: 20, textAlign: 'center'}}>
      <p>最大值：{highest}</p>
      <p>当前值：{current}</p>
      <button onClick={add} >add</button>
    </div>
  )
}
// 使用connect连接
let mapStatetoProps = state => state.counter
// let ConnectCounter = connect(
//   mapStatetoProps
// )(Counter)

// 使用actions派发动作
let ConnectCounter = connect(
  mapStatetoProps,
  actions
)(Counter)
// 定义路由
app.router((history, app) => (
  <div>
    <ConnectCounter />
  </div>
))
// 启动程序
app.start('#root')
