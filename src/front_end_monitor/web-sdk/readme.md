# 性能监控脚本开发
- 页面统一导出一个对象，该对象有一个init方法， 这样方便后期打包和配置，防止某些页面不需要监控，也被调用

navigationStart: 1543218118430 // 前一个网页卸载的时间， 默认值： fetchStart


// 进入页面之前
redirectStart: 0 重定向开始时间  同域
redirectEnd: 0 重定向结束时间 需要同域
unloadEventEnd: 1543218118714 前一个网页被卸载的结束时间 默认值：0
unloadEventStart: 1543218118714 // 前一个网页被卸载的开始时间 默认值：0

<!-- 进入页面  和服务端相关的，优化空间最大-->
fetchStart: 1543218118431 开始请求网页
domainLookupEnd: 1543218118683 dns查询结束 fetchstart
domainLookupStart: 1543218118683 dns查询开始 fetchstart

connectEnd: 1543218118683  // 向服务器建立握手结束  fetchstart
connectStart: 1543218118683 // 向服务器建立握手开始 fetchstart

secureConnectionStart: 0 // 安全握手开始  非https没有

requestStart: 1543218118683  // 向服务器发送请求开始
responseStart: 1543218118708 // 服务器返回数据开始
responseEnd: 1543218118713 // 服务器返回数据结束

domLoading: 1543218118725 // 解析dom开始 document.readyState = loadding
domInteractive: 1543218118931 // 解析dom结束 document.readyState = interactive

domContentLoadedEventStart: 1543218118932 // ContentLoaded开始
domContentLoadedEventEnd: 1543218118932 // ContentLoaded 结束
domComplete: 1543218119501 // 文档解析完成

loadEventStart: 1543218119501 // load事件发送前
loadEventEnd: 1543218119559 // load事件发送后
