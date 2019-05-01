// 装饰器模式
// 装饰只是让原来的功能更强大，并不改变原来的功能

class Durk {
  constructor (name) {
    this.name = name
  }
  eat (food) {
    console.log(`eat ${food}`)
  }
}

class TangDurk {
  constructor (name) {
    this.durk = new Durk(name)
  }
  eat (food) {
    this.durk.eat(food)
    console.log('谢谢, ${new Date().toLocaleTimeString()}')
  }
}

let t = new TangDurk('tang')
t.eat('苹果')