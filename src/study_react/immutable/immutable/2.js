let immutable = require('immutable')
let { Map, List, fromJS } = immutable

let arr1 = List([1, 2, 3])
let arr2 = arr1.push(4)
let arr3 = arr2.pop()
let arr4 = arr3.map(item => item * 2)
let arr5 = arr4.filter(item => item < 5)

console.log(arr5) // List [ 2, 4 ]

let arr6 = arr5.update(1, val => val * 100)
console.log(arr6)  // List [ 2, 400 ]

let arr7 = arr6.delete(0)
console.log(arr7) // List [ 400 ]

let arr8 = arr7.push(12)
console.log(arr8) // List [ 400, 12 ]

let arr9 = arr8.last()
console.log(arr9) // 12
