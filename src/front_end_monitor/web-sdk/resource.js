// 性能监控脚本
import utils from './utils'
console.log('entries', utils)
let resovePerformanceResource = resourceData => {
    let r = resourceData
    let o = {// 信心对象
        initiatorType: r.initiatorType, // 类型
        name: r.name, // 资源名称带url
        duration: parseInt(r.duration), // 加载时长

        // 链接过程
        redirect: r.redirectEnd - r.redirectStart, // 重定向时间
        dns: r.domainLookupEnd - r.domainLookupStart, // dns查询
        connect: r.connectEnd - r.connectStart, // TCP建立
        network: r.connectEnd - r.startTime, // 网络总耗时

        // 接收过程
        send: r.responseStart - r.requestStart, // 发送开始到接收的总时长
        receive: r.responseEnd - r.responseStart, // 接收总时长
        request: r.responseEnd - r.requestStart, // 接收总耗时

        // 核心指标
        ttfb: r.responseStart - r.requestStart, // 首字节时间

    }
    return o
}

// 这里拿到的是一个数组
/* 
* 帮我我们遍历拿到所有自愿的性能数据
*/
let resolveEntries = entries => entries.map( entrie => resovePerformanceResource(entrie))
export default {
    init (cb) {
        if (PerformanceObserver) { // 监听资源加载情况
            let observer = new window.PerformanceObserver(list => {
                try {
                    let entries = performance.getEntriesByType('resource')
                    let entriesData = resolveEntries(entries)
                    cb && cb(entriesData)
                } catch (e) {
                    console.log('e', e)
                }
            })
            observer.observe({entryTypes: ['resource']})
        } else {
            // 在onload之后获取数据
            utils.onload(() => {
                // 在onload之后获取所有的资源信息
                let entries = performance.getEntriesByType('resource')
                let entriesData = resolveEntries(entries)
                // let d = resovePerformanceResource([0])
                cb && cb (entriesData)
            })
        }
        
    }
}

/* 
// 拿到哦的对象数据
connectEnd: 46.49999999674037
connectStart: 46.49999999674037
decodedBodySize: 140942
domainLookupEnd: 46.49999999674037
domainLookupStart: 46.49999999674037
duration: 28.30000000540167
encodedBodySize: 140942
entryType: "resource"
fetchStart: 46.49999999674037
initiatorType: "link"
name: "http://localhost:3000/css/bootstartp.css"
nextHopProtocol: "http/1.1"
redirectEnd: 0
redirectStart: 0
requestStart: 56.10000000160653
responseEnd: 74.80000000214204
responseStart: 70.39999999688007
secureConnectionStart: 0
serverTiming: []
startTime: 46.49999999674037
transferSize: 141157
workerStart: 0

性能监控的时候只需要抽取部分数据取样既可以，不需要全部上传，不然也很消耗性能
*/