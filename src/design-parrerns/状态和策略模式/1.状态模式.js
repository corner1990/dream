// 状态模式
//  state pattern(状态模式中)， 对象类的行为是根据他的状态改变的。这种类型的设计模式称为设计模式
//  我们通常创建各种状态的抽象对象和一个行为随着状态的改变而改变context对象
// 主要作用
  // 解决对象行为过于依赖他的状态(属性)， 并需要根据不同的状态触发不同的行为

// 使用场景
  // 大量的对象状态需要管理的时候，通过对具体状态的抽象，封装，实现解耦

// 核心实现思想
  // 1. 创建不同的状态类，进行上下文的状态切换，已经该状态下的行为
  // 2. 创建上下文对象，更具不同的状态调用对应的 状态类

// 状态模式的优点：
  //  封装了转换规则
  //  可以枚举定义好的状态
  //  讲和状态相关的行为都封装在一个类中
  //  可以让多个环境共享一个状态

  // 状态模式的缺点：
    // 会增加系统类对象的数量
    // 对开闭 原则支持不好
  
// 实现代码
class ChiFanStatus{
  constructor(obj) {
    this.obj = obj
  }
  doing() {
    this.obj.state = 'eat'
    console.log(`${this.obj.name} 正在吃饭`)
  }
}

class ShuiJiaoStatus{
  constructor(obj) {
    this.obj = obj
  }
  doing() {
    this.obj.state = 'sleep'
    console.log(`${this.obj.name} 正在睡觉`)
  }
}
class DaDouDouStatus{
  constructor(obj) {
    this.obj = obj
  }
  doing() {
    this.obj.state = 'hitDouDou'
    console.log(`${this.obj.name} 正在打豆豆`)
  }
}

// 定义角色
class Person{
  constructor(name) {
    this.name = name
    this.state = 'eat'
    this.status = new ShuiJiaoStatus(this)
    
  }
  doing() {
    if (this.state === 'sleep') {
      this.status = new DaDouDouStatus(this)
      
    }
    if (this.state === 'hitDouDou') {
      this.status = new ChiFanStatus(this)
    }
    if (this.state === 'eat') {
      this.status = new ShuiJiaoStatus(this)
    }
    this.status.doing()
  }
}

let person = new Person('小明')
person.doing()
person.doing()
person.doing()
person.doing()
