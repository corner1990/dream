const babel = require('babel-core')
const types = require('babel-types')

const visitor = {
    ImportDeclaration (path, state={opts}) {
        let  { node } = path
        let { specifiers, source } = node
        
        // 判断是不是默认导入(全部导入),如果不是再进行处理
        if (state.opts.library == source.value && !types.isImportDefaultSpecifier(specifiers[0])) {
            let newImportSpecifiers = specifiers.map(spec => {
                types.importDeclaration([types.ImportDefaultSpecifier(spec.local)], types.stringLiteral(`${source.value}/${spec.local.name}`)) 
            })
    
            path.replaceWithMultiple(newImportSpecifiers)
        }
    }
}
// let code = "import { flatten, join } from 'lodash'"
// let res = babel.transform(code, {
//     plugins: [
//         { visitor }
//     ]
// })

// console.log('res', res.code)
// res import { flatten, join } from 'lodash';
module.exports = function(babel){
    return {
        visitor
    }
}

/* 
NodePath {
  parent:
   Node {
     type: 'Program',
     start: 0,
     end: 38,
     loc: SourceLocation { start: [Position], end: [Position] },
     sourceType: 'module',
     body: [ [Node] ],
     directives: [] },
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
        code: 'import { flatten, join } from \'lodash\'',
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
   { ImportDeclaration: { enter: [Array] },
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
        type: 'File',
        start: 0,
        end: 38,
        loc: [SourceLocation],
        program: [Node],
        comments: [],
        tokens: [Array] },
     hub: Hub { file: [File], options: undefined },
     contexts: [ [TraversalContext] ],
     data: {},
     shouldSkip: false,
     shouldStop: false,
     removed: false,
     state: undefined,
     opts:
      { ImportDeclaration: [Object],
        _exploded: {},
        _verified: {},
        BlockStatement: [Object],
        Program: [Object],
        ThisExpression: [Object],
        Identifier: [Object],
        JSXIdentifier: [Object] },
     skipKeys: {},
     parentPath: null,
     context:
      TraversalContext {
        queue: [Array],
        parentPath: undefined,
        scope: [Scope],
        state: undefined,
        opts: [Object],
        priorityQueue: [] },
     container:
      Node {
        type: 'File',
        start: 0,
        end: 38,
        loc: [SourceLocation],
        program: [Node],
        comments: [],
        tokens: [Array] },
     listKey: undefined,
     inList: false,
     parentKey: 'program',
     key: 'program',
     node:
      Node {
        type: 'Program',
        start: 0,
        end: 38,
        loc: [SourceLocation],
        sourceType: 'module',
        body: [Array],
        directives: [] },
     scope:
      Scope {
        uid: 0,
        parent: null,
        hub: [Hub],
        parentBlock: [Node],
        block: [Node],
        path: [Circular],
        labels: [Map],
        references: [Object],
        bindings: [Object],
        globals: {},
        uids: {},
        data: {},
        crawling: false },
     type: 'Program',
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
        parentPath: null,
        context: [TraversalContext],
        container: [Node],
        listKey: undefined,
        inList: false,
        parentKey: 'program',
        key: 'program',
        node: [Node],
        scope: [Scope],
        type: 'Program',
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
      { ImportDeclaration: [Object],
        _exploded: {},
        _verified: {},
        BlockStatement: [Object],
        Program: [Object],
        ThisExpression: [Object],
        Identifier: [Object],
        JSXIdentifier: [Object] },
     priorityQueue: [] },
  container:
   [ Node {
       type: 'ImportDeclaration',
       start: 0,
       end: 38,
       loc: [SourceLocation],
       specifiers: [Array],
       source: [Node] } ],
  listKey: 'body',
  inList: true,
  parentKey: 'body',
  key: 0,
  node:
   Node {
     type: 'ImportDeclaration',
     start: 0,
     end: 38,
     loc: SourceLocation { start: [Position], end: [Position] },
     specifiers: [ [Node], [Node] ],
     source:
      Node {
        type: 'StringLiteral',
        start: 30,
        end: 38,
        loc: [SourceLocation],
        extra: [Object],
        value: 'lodash' } },
  scope:
   Scope {
     uid: 0,
     parent: null,
     hub: Hub { file: [File], options: undefined },
     parentBlock:
      Node {
        type: 'File',
        start: 0,
        end: 38,
        loc: [SourceLocation],
        program: [Node],
        comments: [],
        tokens: [Array] },
     block:
      Node {
        type: 'Program',
        start: 0,
        end: 38,
        loc: [SourceLocation],
        sourceType: 'module',
        body: [Array],
        directives: [] },
     path:
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
        parentPath: null,
        context: [TraversalContext],
        container: [Node],
        listKey: undefined,
        inList: false,
        parentKey: 'program',
        key: 'program',
        node: [Node],
        scope: [Circular],
        type: 'Program',
        typeAnnotation: null },
     labels: Map { _c: Map {} },
     references: { flatten: true, join: true },
     bindings: { flatten: [Binding], join: [Binding] },
     globals: {},
     uids: {},
     data: {},
     crawling: false },
  type: 'ImportDeclaration',
  typeAnnotation: null }
*/