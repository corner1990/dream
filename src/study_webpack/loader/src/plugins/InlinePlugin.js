// 场景
// 有一个页面，假如代码量比较小，我们就没有必要使用外链，直接将文件放入行内即可
const fs = require('fs')
class InlinePlguin {
    constructor (options) {
        this.options = options
    }
    apply (compiler) {
        compiler.hooks.compilation.tap('compilation', function (compilation) {
            compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync('changeTags', function (data, calback) {
                let { body } = data
                body.forEach(bodyTag => {
                    /* 
                    bodyTag格式如下
                    { tagName: 'script',closeTag: true,attributes: { type: 'text/javascript', src: 'boundle.js' } }
                    */
                    let src= bodyTag.attributes.src
                    console.log('src', src)
                    // 删除src属性
                    delete bodyTag.attributes.src
                    // 拿到引用文件
                    let source = compilation.assets[src].source()
                    bodyTag.innerHTML = source
                    // 删除文件，防止生成无用文件
                    delete compilation.assets[src]
                })
                //  返回处理后的结果
                calback(null, data)
                // console.log('body', body)
            })
        })
    }
}

module.exports = InlinePlguin
