// 策略模式
// 类的行为或其算法可以在运行时更改。这种类型的设计模式属于行为型模式
// 策略模式中, 创建表示各种策略的对象和一个行为随着策略对象改变而改变的 context 对象。策略对象改变 context 对象的执行算法
// 优点： 1、算法可以自由切换。 2、避免使用多重条件判断。 3、扩展性良好。

// 缺点： 1、策略类会增多。 2、所有策略类都需要对外暴露。
// 如果一个系统的策略多于四个，就需要考虑使用混合模式，解决策略类膨胀的问题。
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