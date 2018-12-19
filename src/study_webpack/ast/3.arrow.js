// babel插件核心，用来实现核心的转换引擎
const babel = require('babel-core')
// 可以实现类型转换，生成AST的零部件
const types = require('babel-types')

let code = `let sum = (a, b) => a + b;`

// 这个访问者可以对特定类型的节点进行处理
let visitor = {
    // 有两种写法
    // ArrowFunctionExpression: {
    //     enter (node, parent) {
    //         console.log('enter', node.type)
    //     },
    //     leave (node, parent) {
    //         console.log('leave', node.type)
    //     }
    // }
    // 的第二种写法
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
let arrayPlugin = { visitor }
// babel内部先把代码转换成AST，然后进行遍历，遍历到类型等于ArrowFunctionExpression， 交给插件arrayPlugin处理
// 匹配的条件，就是变量名等于我们插件的函数名
let result = babel.transform(code, {
    plugins: [
        arrayPlugin
    ]
})
console.log('result', result.code)
/* 
result let sum = function (a, b) {
  return a + b;
};
*/
/* 
ArrowFunctionExpression的参数path如下：
/* 
        NodePath {
            parent:
            Node {
                type: 'VariableDeclarator',
                start: 4,
                end: 25,
                loc: SourceLocation { start: [Position], end: [Position] },
                id:
                Node {
                    type: 'Identifier',
                    start: 4,
                    end: 7,
                    loc: [SourceLocation],
                    name: 'sum' },
                init:
                Node {
                    type: 'ArrowFunctionExpression',
                    start: 10,
                    end: 25,
                    loc: [SourceLocation],
                    id: null,
                    generator: false,
                    expression: true,
                    async: false,
                    params: [Array],
                    body: [Node] } },
            hub:
            Hub {
                file:
                File [Map] {
                    _c: Map {},
                    dynamicData: {},
                    pipeline: Pipeline {},
                    log: [Logger],
                    opts: [Object],
                    parserOpts: [Object],
                    pluginVisitors: [Array],
                    pluginPasses: [Array],
                    metadata: [Object],
                    dynamicImportTypes: {},
                    dynamicImportIds: {},
                    dynamicImports: [],
                    declarations: {},
                    usedHelpers: {},
                    path: [NodePath],
                    ast: [Node],
                    code: 'let sum = (a, b) => a + b;',
                    shebang: '',
                    hub: [Circular],
                    scope: [Scope] },
                options: undefined },
            contexts:
            [ TraversalContext {
                queue: [Array],
                parentPath: [NodePath],
                scope: [Scope],
                state: undefined,
                opts: [Object],
                priorityQueue: [] } ],
            data: {},
            shouldSkip: false,
            shouldStop: false,
            removed: false,
            state: undefined,
            opts:
            { ArrowFunctionExpression: { enter: [Array] },
                _exploded: {},
                _verified: {},
                BlockStatement: { exit: [Array] },
                Program: { exit: [Array] },
                ThisExpression: { enter: [Array] },
                Identifier: { enter: [Array] },
                JSXIdentifier: { enter: [Array] } },
            skipKeys: {},
            parentPath:
            NodePath {
                parent:
                Node {
                    type: 'VariableDeclaration',
                    start: 0,
                    end: 26,
                    loc: [SourceLocation],
                    declarations: [Array],
                    kind: 'let' },
                hub: Hub { file: [File], options: undefined },
                contexts: [ [TraversalContext] ],
                data: {},
                shouldSkip: false,
                shouldStop: false,
                removed: false,
                state: undefined,
                opts:
                { ArrowFunctionExpression: [Object],
                    _exploded: {},
                    _verified: {},
                    BlockStatement: [Object],
                    Program: [Object],
                    ThisExpression: [Object],
                    Identifier: [Object],
                    JSXIdentifier: [Object] },
                skipKeys: {},
                parentPath:
                NodePath {
                    parent: [Node],
                    hub: [Hub],
                    contexts: [Array],
                    data: {},
                    shouldSkip: false,
                    shouldStop: false,
                    removed: false,
                    state: undefined,
                    opts: [Object],
                    skipKeys: {},
                    parentPath: [NodePath],
                    context: [TraversalContext],
                    container: [Array],
                    listKey: 'body',
                    inList: true,
                    parentKey: 'body',
                    key: 0,
                    node: [Node],
                    scope: [Scope],
                    type: 'VariableDeclaration',
                    typeAnnotation: null },
                context:
                TraversalContext {
                    queue: [Array],
                    parentPath: [NodePath],
                    scope: [Scope],
                    state: undefined,
                    opts: [Object],
                    priorityQueue: [] },
                container: [ [Node] ],
                listKey: 'declarations',
                inList: true,
                parentKey: 'declarations',
                key: 0,
                node:
                Node {
                    type: 'VariableDeclarator',
                    start: 4,
                    end: 25,
                    loc: [SourceLocation],
                    id: [Node],
                    init: [Node] },
                scope:
                Scope {
                    uid: 0,
                    parent: null,
                    hub: [Hub],
                    parentBlock: [Node],
                    block: [Node],
                    path: [NodePath],
                    labels: [Map],
                    references: [Object],
                    bindings: [Object],
                    globals: {},
                    uids: {},
                    data: {},
                    crawling: false },
                type: 'VariableDeclarator',
                typeAnnotation: null },
            context:
            TraversalContext {
                queue: [ [Circular] ],
                parentPath:
                NodePath {
                    parent: [Node],
                    hub: [Hub],
                    contexts: [Array],
                    data: {},
                    shouldSkip: false,
                    shouldStop: false,
                    removed: false,
                    state: undefined,
                    opts: [Object],
                    skipKeys: {},
                    parentPath: [NodePath],
                    context: [TraversalContext],
                    container: [Array],
                    listKey: 'declarations',
                    inList: true,
                    parentKey: 'declarations',
                    key: 0,
                    node: [Node],
                    scope: [Scope],
                    type: 'VariableDeclarator',
                    typeAnnotation: null },
                scope:
                Scope {
                    uid: 0,
                    parent: null,
                    hub: [Hub],
                    parentBlock: [Node],
                    block: [Node],
                    path: [NodePath],
                    labels: [Map],
                    references: [Object],
                    bindings: [Object],
                    globals: {},
                    uids: {},
                    data: {},
                    crawling: false },
                state: undefined,
                opts:
                { ArrowFunctionExpression: [Object],
                    _exploded: {},
                    _verified: {},
                    BlockStatement: [Object],
                    Program: [Object],
                    ThisExpression: [Object],
                    Identifier: [Object],
                    JSXIdentifier: [Object] },
                priorityQueue: [] },
            container:
            Node {
                type: 'VariableDeclarator',
                start: 4,
                end: 25,
                loc: SourceLocation { start: [Position], end: [Position] },
                id:
                Node {
                    type: 'Identifier',
                    start: 4,
                    end: 7,
                    loc: [SourceLocation],
                    name: 'sum' },
                init:
                Node {
                    type: 'ArrowFunctionExpression',
                    start: 10,
                    end: 25,
                    loc: [SourceLocation],
                    id: null,
                    generator: false,
                    expression: true,
                    async: false,
                    params: [Array],
                    body: [Node] } },
            listKey: undefined,
            inList: false,
            parentKey: 'init',
            key: 'init',
            node:
            Node {
                type: 'ArrowFunctionExpression',
                start: 10,
                end: 25,
                loc: SourceLocation { start: [Position], end: [Position] },
                id: null,
                generator: false,
                expression: true,
                async: false,
                params: [ [Node], [Node] ],
                body:
                Node {
                    type: 'BinaryExpression',
                    start: 20,
                    end: 25,
                    loc: [SourceLocation],
                    left: [Node],
                    operator: '+',
                    right: [Node] } },
            scope:
            Scope {
                uid: 1,
                parent:
                Scope {
                    uid: 0,
                    parent: null,
                    hub: [Hub],
                    parentBlock: [Node],
                    block: [Node],
                    path: [NodePath],
                    labels: [Map],
                    references: [Object],
                    bindings: [Object],
                    globals: {},
                    uids: {},
                    data: {},
                    crawling: false },
                hub: Hub { file: [File], options: undefined },
                parentBlock:
                Node {
                    type: 'VariableDeclarator',
                    start: 4,
                    end: 25,
                    loc: [SourceLocation],
                    id: [Node],
                    init: [Node] },
                block:
                Node {
                    type: 'ArrowFunctionExpression',
                    start: 10,
                    end: 25,
                    loc: [SourceLocation],
                    id: null,
                    generator: false,
                    expression: true,
                    async: false,
                    params: [Array],
                    body: [Node] },
                path: [Circular],
                labels: Map { _c: Map {} },
                references: {},
                bindings: { a: [Binding], b: [Binding] },
                globals: {},
                uids: {},
                data: {} },
            type: 'ArrowFunctionExpression',
            typeAnnotation: null }
        */