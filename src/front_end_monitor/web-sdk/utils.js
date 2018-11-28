export default {
    onload (cb) {
        if (document.readyState === 'complete') {
            cb && cb()
            return void 0;
        }
        // 监听load事件，调用回调函数
        window.addEventListener('load', cb)
    }
}
