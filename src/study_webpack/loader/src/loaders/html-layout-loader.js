const path = require('path')
const fs = require('fs')
/* 

*/
const loaderUtils = require('loader-utils')
let defaultOptions = {
    placeholder: '{{__content__}}'
}
module.exports = function (source) {
    // 异步
    let cb = this.async()
    let opts = loaderUtils.getOptions(this)
    opts = {...defaultOptions, ...opts}

    let {layout, placeholder} = opts
    fs.readFile(layout, 'utf8', function (err, html) {
        if (err) throw new Error(err)
       html = html.replace(placeholder, source)
       cb(err, `module.exports=${JSON.stringify(html)}`)
    })
    return source
}