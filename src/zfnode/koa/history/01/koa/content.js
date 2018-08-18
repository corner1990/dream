/**
 * @description proto koa封装的ctx对象
 */

 // context 代理request和response属性
 // 设置getter和setter
 let proto = {}
/**
 * @description 代理函数
 * @param {string} property 需要代理的属性
 * @param {string} name 需要拿到的值
 * 
 * 使用方式：
 *   ctx.query = ctx.request.query
 *   让proto代理requ上的query属性
 *   delateGetter('request', 'query')
 */
 function delateGetter (property, name) {
    //  __defineGetter__ 不推荐使用
     // 该__defineGetter__方法将对象的属性绑定到要在查找该属性时调用的函数。
     proto.__defineGetter__(name, function () {
         return this[property][name]
     })
 }

// proto === ctx
//  ctx.query = ctx.request.query

// 让proto代理requ上的query属性
delateGetter('request', 'query')
delateGetter('request', 'method')
module.exports = proto
