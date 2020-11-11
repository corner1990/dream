//  外观模式
// 外观模式(Facade Pattern)又叫门面模式，定义一个将子系统的一组接口集成在一起的高层接口，以提供一个一致的外观
// 外观模式让外界减少与子系统内多个模块的直接交互，从而减少耦合，让外界可以更轻松地使用子系统
// 该设计模式由以下角色组成
// 门面角色：外观模式的核心。它被客户角色调用,它熟悉子系统的功能。内部根据客户角色的需求预定了几种功能的组合
  // 子系统角色:实现了子系统的功能。它对客户角色和Facade是未知的
  // 客户角色:通过调用Facede来完成要实现的功能


class Sum {
  sum(a, b) {
    return a + b
  }
}

class Minus{
  minus(a, b) {
    return a - b
  }
}

class Calculator{
  sumFn
  minusFn
  constructor() {
    this.sumFn = new Sum()
    this.minusFn = new Minus()
  }
  sum(a, b) {
    return this.sumFn.sum(a, b)
  }
  minus(a, b) {
    return this.minusFn.minus(a, b)
  }
}

let calc = new Calculator()

console.log('sum', calc.sum(1, 2))
console.log('minus', calc.minus(6, 2))

// 场景的场景已经应用
// redux 函数重载 loadsh.js ... 等等