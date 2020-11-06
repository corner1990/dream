// AOP 就是在核心函数执行之前或者之后执行额外逻辑，俗称切面编程

/**
 * @desc 定义before方法
 * @param {function} beforeFn
 */
Function.prototype.before = function (beforeFn) {
  let self = this;
  return function () {
    beforeFn.apply(this, arguments)
    self.apply(this, arguments)
  }
}

/**
 * @desc 定义after方法
 * @param {function} afterFn
 */
Function.prototype.after = function (afterFn) {
  let self = this;
  return function () {
    self.apply(this, arguments)
    afterFn.apply(this, arguments)
  }
} 
/**
 * @desc 狗毛
 * @param {number} money 
 * @param {string} product 
 */
function buy(money, product) {
  console.log(`花${money}买${product}`)
}

buy = buy.before(() => {console.log('银行取钱')})
buy = buy.after(()=>{console.log('将剩余的钱存银行')})
// 调用
buy(1888, '游戏机')