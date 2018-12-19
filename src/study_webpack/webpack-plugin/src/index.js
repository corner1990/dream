import { flatten, join } from 'lodash'
// import join from 'lodash/join'
// import flatten from 'lodash/flatten'

let arr = [1,[2,3,[4,5]]]
let res = flatten(arr)
console.log(res)
