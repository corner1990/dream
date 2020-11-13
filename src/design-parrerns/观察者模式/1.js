//  观察者模式
// 定义了一种一对多的依赖关系，让多个观察者对象同事监听某一个目标对象，当这个目标对象的状态发生变化的时候，会通知所哟肚饿观察者对象对他们能够自动更新


class Pingmin {
  constructor(leader, name) {
    this.leader = leader
    this.name = name
  }
  update() {
    console.log(`${this.name}听到：领导说${this.leader.getState()}`)
  }
}

class Leader {
  state = '上台'
  persons = []
  attach(person) {
    this.persons.push(person)
  }
  notify() {
    this.persons.forEach(person => person.update())
  }
  getState() {
    return this.state
  }
  sayHi() {
    this.state = '同志们好'
    this.notify()
  }
  sayFeture() {
    this.state = '未来的计划'
    this.notify()
  }
  sayBye() {
    this.state = '领导讲完了'
    this.notify()
  }
}

let leader = new Leader();
leader.attach(new Pingmin(leader, '张三'))
leader.attach(new Pingmin(leader, '李四'))

leader.sayHi()
leader.sayFeture()
leader.sayBye()

// 常见场景
// redux vuex promise