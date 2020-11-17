// 策略模式第一种写法 策略内置
class Customer{
  // 第一策略
  kinds = {
    // 普通用户
    normal: {
      pay(amount) {
        return amount
      }
    },
    // 会员
    member: {
      pay(amount) {
        return amount * .9
      }
    },
    // VIP
    vip: {
      pay(amount) {
        return amount * .8
      }
    }
  }
  /**
   * @des 暴露扩展策略接口
   * @param { Sting } kind 策略类型的名字
   * @param { Object } obj 策略对象
   */
  addKind(kind, obj) {
    this.kinds[kind] = obj
  }
  // 统一暴露的支付方法
  pay(kind, amount) {
    return this.kinds[kind].pay(amount)
  }
}

// 调用
let c = new Customer()
// 使用普通支付
console.log(c.pay('normal', 100))
// 使用会员支付
console.log(c.pay('member', 100))
// 使用VIP身份支付
console.log(c.pay('vip', 100))

// 新增老板模式
c.addKind('boss', {
  pay(amount) {
    return 0
  }
})

// 使用老板模式i支付
console.log(c.pay('boss', 100))