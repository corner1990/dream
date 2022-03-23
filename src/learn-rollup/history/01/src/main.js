import _ from 'lodash'
import { name, age } from './msg'
confole.log('hello rollup')

const sum = (a, b) => a + b;

console.log('sum', sum(3, 5), name)

// 测试 treeshaking
console.log(name)

console.log('loadsh', _)