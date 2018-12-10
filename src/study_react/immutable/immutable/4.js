let {is, Map} = require('immutable')
let obj1 = Map({name: 'hello', age: 12})
let obj2 = Map({name: 'hello', age: 12})
console.log(Object.is(obj1, obj2)) // false
// immutable的is方法比较的是值
console.log(is(obj1, obj2)) // true