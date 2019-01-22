// if ('serviceWorker' in navigator && navigator.onLine) {// 检测是否支持service worker
//     navigator.serviceWorker.register('./sw.js').then(function (registration) {
//         // sw.js文件被放在这个域的根目录下，和网站同源。这个service work将会收到这个域下的所有fetch事件
//         // console.log('serviceWorker 注册成功', registration)
//         // chrome://inspect/#service-workers chrome输入此url查看
//        // 安装缓存
//         // 自定义fetch，加入更新
//         // 拿到路径
//     }).catch(function (err) {
//         console.log('serviceWorker 注册失败', err)
//     })
// }

function syncLoadImg () {
    let url = 'http://localhost:4444/test.js'
    fetch(url).then(res => console.log('res', res), err => console.log('err', err))
}
