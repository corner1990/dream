const esprima = require('esprima')
const estraverse = require('estraverse')
const escodegen = require('escodegen')
let code = 'function ast () {}'
let ast = esprima.parse(code)
estraverse.traverse(ast, {
    enter (node, parent) {
        if (node.type === 'Identifier') {
            node.name += '_enter'
        }
        console.log('enter', node.type)
    },
    leave (node, parent) {
        if (node.type === 'Identifier') {
            node.name += '_leave'
        }
        console.log('leave', node.type)
    }
})
let result =  escodegen.generate(ast)
console.log(result) // 重新生成后的代码
// console.log(ast)
