// // let code = 'const result = 1000 * 60 * 60 * 24 * 365'
// let code = 'const result = 1000 * 60'
// let types = require('babel-types')
// let babel = require('babel-core')
// // 预计算
// let visitor = {
//     BinaryExpression (path) {
//         let { node } = path
//         if (!isNaN(node.left.value) && !isNaN(node.right.value)) {
//             let res = eval(node.left.value + node.operator + node.right.value)
//             res =  types.numericLiteral(res)
//             path.replaceWith(res)
//         }
//     }
// }

// let sum = babel.transform(code, {
//     plugins: [
//         { visitor }
//     ]
// })

// console.log('sum', sum.code)
// sum const result = 60000;

let code = 'const result = 1000 * 60 * 60 * 24 * 365'
let types = require('babel-types')
let babel = require('babel-core')
// 预计算
let visitor = {
    BinaryExpression (path) {
        let { node } = path
        if (!isNaN(node.left.value) && !isNaN(node.right.value)) {
            let res = eval(node.left.value + node.operator + node.right.value)
            res =  types.numericLiteral(res)
            path.replaceWith(res)

            // 如果此表达式的父亲也是一个表达式的haul，需要递归计算
            if (path.parentPath.node.type === 'BinaryExpression') {
                let parentPath = path.parentPath;
                visitor.BinaryExpression.call(null, path.parentPath)
            }
        }
    }
}

let sum = babel.transform(code, {
    plugins: [
        { visitor }
    ]
})

console.log('sum', sum.code)
// sum const result = 31536000000;
