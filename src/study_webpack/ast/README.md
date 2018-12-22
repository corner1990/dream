# 抽象语法书(Abstract Syntax Tree)
> webpack 和 esLint 等很多工具和库的核心都是通过 Abstract Syntax Tree(抽象语法树)来实现对代码的检查，分析等操作。通过了解抽象语法树这个概念，自己也会对类似的工具有一个更深入的认识。

### 抽象语法书的用途
- 代码语法检查，代码风格检查，代码高亮，代码错误提示，代码自动补全等等
    + 如JSLint，JSHint对代码错误或者风格的检查，发现一些潜在的错误
    + IDE的错误提示，格式化，高亮，自动补全等等

- 代码混淆压缩
    + UglifyJS2等
- 优化变更代码，改变代码结构达到自己想要的结构
    + 代码打包工具webpack，rollup等等
    + CommonJS, AMD, UMD等代码规范之间的切换
    + ConffeeScript, TypeScript, JSX等转化为原生JavaScript

### 抽象语法树定义
> 通过`JavaScript Parser`把代码转化为一颗抽象语法书(AST),这棵树定义了代码的结构，，通过操纵这棵树，我们可以精准的定位到声明语句，赋值语句，运算语句，实现对代码的分析，优化，变更等操作
- 在计算机科学中，抽象语法树(abstract syntax tree)，或者语法树(syntax tree)是源代码抽象语法结构的树状表现形式，这里特质编程语言的源代码。
- `JavaScript`的语法是为了给开发者更好的编程而设计的，但是不适合程序的理解.所以需要转化为AST来更适合程序的分析，浏览器编译一般会把源码转化为AST来进行进一步的分析等其他操作
- js代码
```js
function fn () {}
```
+ 代码转义后的结构
```js
{
    "type": "Program", // 类型 是一个程序
    "body": [ // body 代码体的意思
        {
        "type": "FunctionDeclaration", // 函数声明
        "id": {// 标识符
            "type": "Identifier",
            "name": "fn", // name 即使我们定义的名称
            "range": [// 声明代码的位置，栗子：function fn 
            9,
            11
            ]
        },
        "params": [// 参数
            {
            "type": "Identifier",
            "name": "a",
            "range": [
                13,
                14
            ]
            }
        ],
        "body": {// 函数体
            "type": "BlockStatement", // 类型，是一个块状代码
            "body": [], // 函数体内的代码语句
            "range": [// 他的代码提的返回
            15,
            17
            ]
        },
        "generator": false, // 是否是generator函数
        "expression": false, // 
        "async": false, // 是否是async步函数
        "range": [
            0,
            17
        ]
        }
    ],
    "sourceType": "module", // 源代码类型 是一个模块
    "range": [// 返回 代码的总体偏移量
        0,
        17
    ]
}
```

### JavaScript Parser
- [JavaScript Parser](https://astexplorer.net/) 可以吧源码转化为抽象语法书的解析器
- 浏览器会把js源码通过解析器转化为抽象语法书，再进一步转化为字节码或直接生成机器码
- 一般来说每个js引擎都有自己的抽象语法树格式，chrome的v8引擎，Firefox的SpiderMonkey引擎等等，MDN提供了详细的SpiderMonkey SAT format的详细说明.
- 常用的JavaScript Parser有：
    + esprima
    + traceur
    + acorn
    + shift

### scprima
> [esprima](https://www.npmjs.com/package/esprima)可以将一个源代码语法转换为AST
- 安装
```bash
npm i esprima
```
- 使用
```js
const esprima = require('esprima')
let code = 'function ast () {}'
let ast = esprima.parse(code)

console.log(ast)
// 答应结果如下
Script {
  type: 'Program',
  body:
   [ FunctionDeclaration {
       type: 'FunctionDeclaration',
       id: [Identifier],
       params: [],
       body: [BlockStatement],
       generator: false,
       expression: false,
       async: false } ],
  sourceType: 'script' }
```
### estraverse
> [estraverse](https://www.npmjs.com/package/estraverse)遍历语法书进行更新AST
```js
const esprima = require('esprima')
const estraverse = require('estraverse')
// const 
let code = 'function ast () {}'
let ast = esprima.parse(code)
estraverse.traverse(ast, {
    enter (node, parent) {
        if (node.type === 'Identifier') {
            node.name += ' enter'
        }
        console.log('enter', node.type)
    },
    leave (node, parent) {
        if (node.type === 'Identifier') {
            node.name += ' leave'
        }
        console.log('leave', node.type)
    }
})


// 打印结果如下
enter Identifier
leave Identifier
enter BlockStatement
leave BlockStatement
leave FunctionDeclaration
leave Program
```

### escodegen
> [escodegen](https://www.npmjs.com/package/escodegen)将AST重新生成源码
```js
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
    },
    leave (node, parent) {
        if (node.type === 'Identifier') {
            node.name += '_leave'
        }
    }
})
let result =  escodegen.generate(ast)
console.log(result) // 重新生成后的代码
// 输出如下：
function ast_enter_leave() {
}
// console.log(ast)
```
### 转换箭头函数
> 访问者模式Visitor对于某个对象或者一组对象，不同的访问者，产生的结果不同，执行的操做也不同步
- - [@babel/core](https://www.npmjs.com/package/@babel/core)
  - [babel-types](https://github.com/babel/babel/tree/master/packages/babel-types)
  - [babel-types-api](https://babeljs.io/docs/en/next/babel-types.html)
  - [Babel 插件手册](https://github.com/brigand/babel-plugin-handbook/blob/master/translations/zh-Hans/README.md#asts)
  - [babeljs.io](https://babeljs.io/en/repl.html)
  - [babel-plugin-transform-es2015-arrow-functions](https://www.npmjs.com/package/babel-plugin-transform-es2015-arrow-functions)

- 转换代码

  + visitor有两种写法

    ```javascript
    // 第一种写法
    let visitor = {
        ArrowFunctionExpression: {
             enter (node, parent) {
                console.log('enter', node.type)
             },
             leave (node, parent) {
                 console.log('leave', node.type)
             }
         }
    }
    
    // 第二种写法
    let visitor = {
        ArrowFunctionExpression (path) {
            // console.log(path)
            let params = path.node.params
            let body = types.blockStatement([
                types.returnStatement(path.node.body)
            ])
            let fn = types.functionExpression(null, params, body, false, false)
            path.replaceWith(fn)
        }
    }
    ```

  + 匹配规则，，就是变量名等于我们插件的函数名

  ```js
  // babel插件核心，用来实现核心的转换引擎
  const babel = require('babel-core')
  // 可以实现类型转换，生成AST的零部件
  const types = require('babel-types')
  
  let code = `let sum = (a, b) => a + b;`
  
  // 创建访问者可以对特定类型的节点进行处理
  let visitor = {
      // 在遍历所有的语法书时，变量名等于我们插件的函数名，就会调用此插件
      ArrowFunctionExpression (path) {
          // console.log(path)
          let params = path.node.params
          let body = types.blockStatement([
              types.returnStatement(path.node.body)
          ])
          let fn = types.functionExpression(null, params, body, false, false)
          path.replaceWith(fn)
      }
  }
  // 创建arrow处理插件
  let arrowPlugin = { visitor }
  // babel内部先把代码转换成AST，然后进行遍历，遍历到类型等于ArrowFunctionExpression， 交给插件arrayPlugin处理
  // 将插件传入babel中，得到结果
  let result = babel.transform(code, {
      plugins: [
          arrowPlugin
      ]
  })
  console.log('result', result.code)
  /* 
  result let sum = function (a, b) {
    return a + b;
  };
  */
  ```


### babel插件

> 实现一个预计算插件

- 简单版，实现两位数字的计算

  ```javascript
  let code = 'const result = 1000 * 60'
  let types = require('babel-types')
  let babel = require('babel-core')
  // 预计算插件
  let visitor = {
      BinaryExpression (path) {
          let { node } = path
          if (!isNaN(node.left.value) && !isNaN(node.right.value)) {
              let res = eval(node.left.value + node.operator + node.right.value)
              res =  types.numericLiteral(res)
              path.replaceWith(res)
          }
      }
  }
  
  let sum = babel.transform(code, {
      plugins: [
          { visitor }
      ]
  })
  
  console.log('sum', sum.code)
  sum const result = 60000;
  
  ```

- 进阶版，实现多个数字计算

  ```javascript
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
  
  ```


### 