/**
 * @desc 学习理解弄得event模块,参照源码实现一个简单版的Event模块
 * @module.exports = events对象
 */
/**
 * @desc 事件对象构造函数
 * 通过该原型对象的原型拓展方法
 */
const events =  function () {
  this._events = {}//保存事件的事件池
  this.maxListener = 10 //默认最大监听数
}
/**
 * @desc 事件监听函数
 * @param  {String}   type [事件的类型]
 * @param  {Function} fn   [事件触发时的回调函数]
 * @param  {String}   flag [用来判断是否添加在事件池开始的为止]
 * @return {none}        [none]
 */
events.prototype.on = function (type, fn, flag) {
  if(!this._events) this._events = {}
  if(typeof fn !== 'function') throw Error('fn mast be a function, have a fn is' + typeof fn)

  // 判断添加的事件是否达到最大限制, 如果大于 则直接返回
  if (Object.keys(this._events).length >= this.maxListener) return false;
  //判断是否需要添加在事件池的开始为止
  if (!flag) {
    if(!this._events[type]) this._events[type] = [fn]
    else this._events[type].push(fn)
  } else {
    if(!this._events[type]) this._events[type] = [fn]
    else this._events[type].unshift(fn)
  }
  
}
/**
 * @desc 绑定的事件函数会在第一次调用的时候执行
 * @param  {String}   type [事件的类型]
 * @param  {Function} fn   [事件触发时的回调函数]
 * @return {none}        [none]
 */
events.prototype.prependOn = function (type, fn) {
  this.on(type, fn, true)
}

/**
 * @desc 绑定的事件函数只会执行一次
 * @param  {String}   type [事件的类型]
 * @param  {Function} fn   [事件触发时的回调函数]
 * @return {none}        [none]
 */
events.prototype.once = function (type, fn) {
  //这里我们绑定wrap函数 然后在触发事件的时候直接删除当前函数，并调用fn
  function wrap (...args) {
    this.remove(type, wrap)
    fn.call(this, ...args)
  }
  this.on(type, wrap)
}

/**
 * @desc 触发事件
 * @param  {String}    type [需要触发的事件类型]
 * @param  {动态参数} args [动态参数]
 */
events.prototype.emit = function (type, ...args) {

  if(!this._events[type] || !this._events[type].length) throw Error(type + ' is not defined')
  //如果存在这个事件 则遍历所有函数并调用
  this._events[type].forEach(fn => {
    fn.call(this, ...args)
  })
}
/**
 * @desc 事件删除函数
 * @param  {String}   type [事件的类型]
 * @param  {Function} fn   [事件触发时的回调函数]
 * @return {none}        [none]
 */
events.prototype.off = function (type, fn) {
  // 判断fn是否为function
  if (!fn) throw Error('fn cannot be empty')
  // 判断是否又该事件
  if (!this._events[type]) throw Error(`${type} is not defined`)
  // 过滤掉对应的函数
  this._events[type] = this._events[type].filter( handdle => {
    return handdle !== fn
  })
}

/**
 * @desc 清空所有函数
 * @return {None} [none]
 */
events.prototype.removeAll = function () {
  this._events = []
}

/**
 * @desc 设置最大监听数
 * @param {Number} n [设置监听数限制]
 */
events.prototype.setMaxLenter = function (n) {
  if (!n) throw Error('parameter must be a vaild number')
  this.maxListener = n
}
/**
 * @desc 获取到所有的监听事件
 * @return {none} [none]
 */
events.prototype.listeners = function () {
  return Object.keys(this._events)
}

module.exports = events

