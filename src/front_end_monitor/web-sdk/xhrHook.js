export default {
    init (cb) {
        // xhr hook
        let xhr = window.XMLHttpRequest
        // 防止多次加载
        if (xhr._eagle_monitor_flag === 'true') {
            return void 0;
        }
        xhr._eagle_monitor_flag = true
        // 拦截出口open函数
        let _originOpen = xhr.prototype.open
        xhr.prototype.open = function (...args) {
            let [method, url, status = null] = args
            this._eagle_xhr_info = { method, url, status }
            return _originOpen.apply(this, args)
        }

        // 拦截send方法
        let _originSend = xhr.prototype.send
        xhr.prototype.send = function (value) {
            this._eagle_start_time = Date.now()
            
            // todo 兼容性待解决
            let ajaxEnd = (eventType) => () => {
                
                if (this.response) {
                    let responseSize = null
                    // 根据不同的类型 处理得到length
                    switch(this.reponseType) {
                        case 'json':
                            responseSize = JSON.stringify(this.response).length
                            break;
                        case 'arraybuffer':
                            responseSize = this.response.byteLength
                            break;
                        default:
                            responseSize = this.responseText.length
                            break
                    }
                    // 拼装数据
                    this._eagle_xhr_info.event = eventType
                    this._eagle_xhr_info.status = this.status
                    this._eagle_xhr_info.success = this.status === 200
                    this._eagle_xhr_info.duration = Date.now() - this._eagle_start_time
                    this._eagle_xhr_info.responseSize = responseSize
                    this._eagle_xhr_info.requestSize = value ? value.length : 0 // 这里需要做处理
                    // 调用回调函数
                    cb && cb(this._eagle_xhr_info)
                }
            }
            
            // 这三个状态都代表请求已经结束了，需要统计一些信息，并上报给服务端
            this.addEventListener('load', ajaxEnd('load'), false)
            this.addEventListener('error', ajaxEnd('error'), false)
            this.addEventListener('abort', ajaxEnd('abort'), false)
            return _originSend.apply(this, [value])
        }
        console.log('xhrHook inint ')

        // fetch hook
        if (window.fetch) {
            let _origin_fetch = window.fetch
            window.fetch = (...args) => {
                let startTime = Date.now()
                // 拿到所有参数
                let [fetchInput] = args
                let method;
                // 根据不同的类型做处理
                if (typeof fetchInput === 'string') {
                    url = fetchInput
                } else if ('Request' in window && fetchInput instanceof window.Requerst) {
                    url = fetchInput.url
                    method = fetchInput.method || 'GET'
                } else {
                    url = fetchInput
                }
                // 构造需要上报的数据
                let eagleFetchData = {url, status, startTime}
                return _origin_fetch.apply(this, args)
                        .then(res => { // 处理返回后的数据
                            let {status} = res
                            eagleFetchData = {
                                ...eagleFetchData,
                                type: 'fetch',
                                status,
                                endTime: Date.now() - startTime
                            }
                            cb && cb(eagleFetchData)
                            return res
                        })
            }
            
        }
    }
}
/* 
* 目前市面主流的请求方式有xhr和fetch，为了方便处理，我们这里使用面向切片技术，用一个中间层包裹，在中间层处理自己需要的逻辑
* mock 也是类似于这样的处理逻辑
*/