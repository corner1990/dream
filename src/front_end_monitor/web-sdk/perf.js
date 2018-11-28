
export default {
	init: cb => {
		let Util = {
            /**
             * 获取时间参数
             * @param { Object } perf performance.timing 对象
             */
			getPerfData: (perf) => {
				let data = {
					// 网络建联相关
					prevPage: perf.fetchStart - perf.navigationStart, // 上一个页面时间
					redirect: perf.redirectEnd - perf.redirectStart, // 重定向时间
					dns: perf.domainLookupEnd - perf.domainLookupStart, // dns查找shijian
					connect: perf.connectEnd - perf.connectStart ,// tcp建立连接时间
					network: perf.connectEnd - perf.connectStart, // 网络总耗时
					// 网络接收
					send: perf.responseStart - perf.requestStart, // 前端从发送到接收的时间
					receive: perf.responseEnd - perf.responseStart , // 接收数据用时
					request: perf.responseEnd - perf.requestStart, // 请求页面的总耗时

					// 前端渲染
					dom: perf.domComplete - perf.domLoading, // dom解析时间
					loadEvent: perf.loadEventEnd - perf.loadEventStart, // loadEvent时间
					fontEvent: perf.loadEventEnd - perf.domLoading, // 前端渲染总时间

					// 关键阶段
                    load: perf.loadEventEnd - perf.loadEventStart, //  页面完全加载的时间
                    domReady: perf.domContentLoadedEventStart - perf.navigationStart, // dom 准备时间
                    interaction: perf.domInteractive - perf.navigationStart, // 可操作时间
                    ttfb: perf.responseStart - perf.navigationStart// 首字节时间
                }
				return data
            },
            // dom解析完成
            domReady: (cb) => {
                let isDOMReady = ''
                if (isDOMReady === true) { return void 0; }
                let timer = null
                let runCheck = () => {
                    if (performance.timing.domComplete) {
                        // 停止循环检测， 运行cb
                        clearTimeout(timer)
                        isDOMReady = true
                        debugger
                        cb()
                    } else {
                        // 再去循环检测
                        timer = setTimeout(runCheck, 100)
                    }
                }
                // 开始循环检测是否DOMConentLoaded已经完成
                window.addEventListener('DOMContentLoaded', () => {
                    runCheck()
                })
            },
            // 页面加载完成, 主要是为了拿到用户在没有等到页面加载完毕，用户就离开的数据
            onload: (cb) => { 
                let isDOMLoad = ''
                let cycTime = 100
                if (isDOMLoad === true) { return void 0; }
                let timer = null
                let runCheck = () => {
                    if (performance.timing.loadEventEnd) {
                        // 停止循环检测， 运行cb
                        clearTimeout(timer)
                        isDOMLoad = true
                        debugger
                        cb()
                    } else {
                        // 再去循环检测
                        timer = setTimeout(runCheck, cycTime)
                    }
                }
                // 开始循环检测是否DOMConentLoaded已经完成
                window.addEventListener('load', () => {
                    runCheck()
                })
            }
		}
        let performance = window.performance
        Util.domReady ( () => {
            let perfData = Util.getPerfData(performance.timing)
            perfData.type = 'domReady'
            // 获取到数据，应该给sdk上层去上传数据
            cb && cb(perfData) // 这里的回调函数是init函数传进来的
            console.log('domReady', perfData)
            debugger
        })
        Util.onload(() => {
            let perfData = Util.getPerfData(performance.timing)
            perfData.type = 'onload'
            cb && cb(perfData) // 这里的回调函数是init函数传进来的
            console.log('onload', perfData)
            debugger
        })
		// 监听页面加载事件 获取数据会有问题
		// window.addEventListener('load', () => {
            // console.log('init pers')
			// setTimeout(() => { // 如果不使用settimeout 部分值可能会是负数
            //     let perfData = Util.getPerfData(performance.timing)
			// 	debugger
			// }, 100)
        // })
        

        // window.addEventListener('DOMContentLoaded', () => {
        //     let perfData = Util.getPerfData(performance.timing)
		// 		console.log('DOMContentLoaded', perfData)
		// 		debugger
        // })
	}
}

// navigationStart: 1543218118430 // 前一个网页卸载的时间， 默认值： fetchStart


// // 进入页面之前
// redirectStart: 0 重定向开始时间  同域
// redirectEnd: 0 重定向结束时间 需要同域
// unloadEventEnd: 1543218118714 前一个网页被卸载的结束时间 默认值：0
// unloadEventStart: 1543218118714 // 前一个网页被卸载的开始时间 默认值：0

// <!-- 进入页面  和服务端相关的，优化空间最大-->
// fetchStart: 1543218118431 开始请求网页
// domainLookupEnd: 1543218118683 dns查询结束 fetchstart
// domainLookupStart: 1543218118683 dns查询开始 fetchstart

// connectEnd: 1543218118683  // 向服务器建立握手结束  fetchstart
// connectStart: 1543218118683 // 向服务器建立握手开始 fetchstart

// secureConnectionStart: 0 // 安全握手开始  非https没有

// requestStart: 1543218118683  // 向服务器发送请求开始
// responseStart: 1543218118708 // 服务器返回数据开始
// responseEnd: 1543218118713 // 服务器返回数据结束

// domLoading: 1543218118725 // 解析dom开始
// domInteractive: 1543218118931 // 解析dom结束

// domContentLoadedEventStart: 1543218118932 // ContentLoaded 所有回调开始运行
// domContentLoadedEventEnd: 1543218118932 // ContentLoaded 所有回调结束运行
// domComplete: 1543218119501 // 文档解析完成

// loadEventStart: 1543218119501 // load事件发送前
// loadEventEnd: 1543218119559 // load事件发送后
