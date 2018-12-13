import './index.css'
import test from './base'
document.querySelector('#root').innerHTML = test
// 接收子节点的变化， 类似于冒泡
if (module.hot) {
    // 如果检测到base更新，就会调用词汇掉函数
    module.hot.accept('./base', function () {
        console.log('base is update')
    })
}