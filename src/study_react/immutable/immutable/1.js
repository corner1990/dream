// import immutable from 'immutable'
let immutable = require('immutable')
let {Map, List, fromJS} = immutable

// map只能执行一层，我们对2级更新属性会报错，需要是使用fromjs来处理对象
// let obj1 = Map({name: 'leo', age: 12, home: {name: 'shenzhen'}})
let obj1 = fromJS({ name: 'leo', age: 12, home: { name: 'shenzhen' } })

// console.log(obj1) // Map { "name": "leo", "age": 12 }

// let obj2 = obj1.set('name', 'hello')

// console.log(obj2) // Map { "name": "hello", "age": 12 }
// console.log(obj1 === obj2) // false

// 属性会共享
// console.log(obj1.home === obj2.home) // true
// 获取对象的属性数量
// console.log(obj1.size) // 3
// console.log(obj1.count()) // 3

// 设置值 一层使用set，多层使用setIn
// 取值：一层使用get，多层使用getIN
let obj3 = obj1.setIn(['home', 'name'], 'new Name')
console.log(obj3) // Map { "name": "leo", "age": 12, "home": Map { "name": "new Name" } }
console.log(obj3.getIn(['home', 'name'])) // new Name

// 更新值， update
// 一个属性值，一会回调函数，多层的时候使用updateIn
let obj4 = obj3.update('age', val => val + 1)
console.log(obj4) // Map { "name": "leo", "age": 13, "home": Map { "name": "new Name" } }

// 删除某个属性
let obj5 = obj4.delete('age') 
console.log(obj5) // Map { "name": "leo", "home": Map { "name": "new Name" } }

// 清空对象
let obj6 = obj4.clear()
console.log(obj6) // Map {}

// 合并对象 merge
let obj7 = obj6.merge({name: 'world', gender: 'man'})
console.log(obj7) // Map { "name": "world", "gender": "man" }

// 类型转换
console.log(obj7.toJS()) // { name: 'world', gender: 'man' }
console.log(obj7.toJSON()) // { name: 'world', gender: 'man' }
console.log(obj7.toObject()) // { name: 'world', gender: 'man' }
