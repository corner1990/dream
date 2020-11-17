// 策略外置写法
class Customer {
  constructor(Kind) {
    this.kind = new Kind()
  }
  // 对外暴露方法
  pay(amount) {
    return this.kind.pay(amount)
  }
}
// 定义策略
class Normal{
  pay(amount) {
    return amount
  }
}

class Member{
  pay(amount) {
    return amount * .9
  }
}
class VIP{
  pay(amount) {
    return amount * .8
  }
}
class Boss{
  pay(amount) {
    return 0
  }
}

// 普通会员
let c1 = new Customer(Normal)
console.log(c1.pay(100))
// 会员
let c2 = new Customer(Member)
console.log(c2.pay(100))

// vip
let c3 = new Customer(VIP)
console.log(c3.pay(100))

// Boss
let c4 = new Customer(Boss)
console.log(c4.pay(100))