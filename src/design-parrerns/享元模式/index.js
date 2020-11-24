// 享元模式
// 共享内存，节约内存空间
// 相同的数据共享使用
// 主要还是对数据、方法共享分离，将数据的方法分为内部数据、内部方法和外部数据、外部方法。
// 内部状态保存在对象内部，通常不会改变，可以共享
// 外部状态保存在对象外部，可以随场景改变，不可以共享。

class Person{
  constructor(name, age) {
    this.name = name
    this.age = age
  }
}
// 通过分装 不用再每个对象上实现getName 和 getAge
Person.prototype.getName = function () {
  console.log('getName', this.name)
}
Person.prototype.getAge = function () {
  console.log('getAge', this.age)
}

let p = new Person('leo', 18)
p.getName()
p.getAge()
