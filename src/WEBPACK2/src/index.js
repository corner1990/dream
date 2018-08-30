import './index.less'
import $ from 'jquery'
import './test'

// import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
// let oImg = new Image()

// import img from './1.jpg'
// oImg.src = img
// document.body.appendChild(oImg)
console.log('index.js')
if (__DEV__) console.log('开发')
else console.log('生产')
// // 手动出发热更新
// if (module.hot) {
//  module.hot.accept()
// 指定某一个文件自动更新
//  module.hot.accept('a.js', function () {
//      console.log('hot update')
//  })

// }

// 抽离样式侯不能实现热更新
// 目前的解决方案就是开发环境下关闭抽离css
class A {}
console.log(A)
console.log(window.$)