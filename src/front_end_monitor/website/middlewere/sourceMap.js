// 第一步 解析map文件
// const fs = require('fs')
// const path = require('path')
// // firefox 维护的一个库，可以解析打包后的map文件
// let sourceMap = require('source-map')

// let sourcemanFilePath = path.join(__dirname, './main.0ac9c1fa.chunk.js.map')
// module.exports = (ctx, next) => {
//     // 8行 10列
//     if (ctx.path === '/soucemap') {
//         // 读取文件内容
//         let sourceMapContent = fs.readFileSync(sourcemanFilePath, 'utf8')
//         // 解析为对象
//         let fileObj = JSON.parse(sourceMapContent)

//         let col = 10
//         let row = 8
//         // 返回展示效果
//         ctx.body = fileObj
//     }
//     return next()
// }

//  这里还有一些问题 后期处理
const fs = require('fs')
const path = require('path')
// firefox 维护的一个库，可以解析打包后的map文件
let sourceMap = require('source-map')

let sourcemanFilePath = path.join(__dirname, './main.0ac9c1fa.chunk.js.map')

let sourcesPathMap = {}
let fixPath = fPath => fPath.replace(/\.[\.\/]+/, '')
module.exports = async (ctx, next) => {
    // 8行 10列
    if (ctx.path === '/soucemap') {
        // 读取文件内容
        let sourceMapContent = fs.readFileSync(sourcemanFilePath, 'utf8')
        // 解析为对象
        let fileObj = JSON.parse(sourceMapContent)
        let { sources } = fileObj
        sources.map((item, index) => {
            sourcesPathMap[index] = item
        })
        // 假设这个是报错的行和列
        let line = 9
        let column = 1
        const consumer = await new sourceMap.SourceMapConsumer(sourceMapContent)
        let res = consumer.originalPositionFor({line, column})
        
        // source line column name

        // let originSource = sourcesPathMap[res.source];

        // let sourcesContent = fileObj.sourcesContent[sources.indexOf(originSource)];
        // let sourcesContentArr = sourcesContent.split('\n');
        // let sourcesContentMap = {};

        // sourcesContentArr.forEach((item, index) => {
        // sourcesContentMap[index] = item;
        // });

        // res.sourcesContentMap = sourcesContentMap;

        // 返回展示效果
        // ctx.body = consumer
        ctx.body = res
    }
    return next()
}