// AOP 就是在核心函数执行之前或者之后执行额外逻辑，俗称切面编程

Function.prototype.before = function (beforeFn) {
  let self = this;
  return function () {
    beforeFn.apply(this, arguments)
    self.apply(this, arguments)
  }
}

Function.prototype.after = function (afterFn) {
  let self = this;
  return function () {
    self.apply(this, arguments)
    afterFn.apply(this, arguments)
  }
} 

function buy(money, product) {
  console.log(`花${money}买${product}`)
}

buy = buy.before(() => {console.log('银行取钱')})
buy = buy.after(()=>{console.log('将剩余的钱存银行')})
// 调用
buy(1888, '游戏机')