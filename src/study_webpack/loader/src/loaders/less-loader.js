const less = require('less')
// 处理less
module.exports = function (source) {
    less.render(source, (err, res) => {
        // console.log('res,css', res.css)
        this.callback(err, res.css)
    })
}