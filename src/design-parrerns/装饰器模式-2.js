// 某些情况下装饰模式回优于原型继承模式

class Coffee {
  make (water) {
    return `${water}+咖啡`
  }
  cost () {
    return 10
  }
}

class MilkCoffee {
  constructor (parent) {
    this.parent = parent
  }
  make (water) {
    return `${this.parent.make(water)}+牛奶`
  }
  cost () {
    return this.parent.cost() + 5
  }
}

class SugarCoffee {
  constructor(parent) {
    this.parent = parent
  }
  make(water) {
    return `${this.parent.make(water)}+糖`
  }
  cost() {
    return this.parent.cost() + 3
  }
}
// 我们通过一下类， 就可以自由组合
let coffee = new Coffee()
let milkCoffee = new MilkCoffee(coffee)
let sugerCoffee = new SugarCoffee(milkCoffee)

let ret = milkCoffee.make('水')
let cost = milkCoffee.cost()
console.log(ret, cost)

let ret2 = sugerCoffee.make('水')
let cost2 = sugerCoffee.cost()
console.log(ret2, cost2)