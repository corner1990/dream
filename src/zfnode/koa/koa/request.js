/**
 * @description koa 自己封装的对象
 */
let url = require('url')
let request = {
    get query () {
        //  当我们调用request.query 的时候就会调用到这个方法
        return url.parse(this.req.url, true).query
    },
    set query (val) {
        // request.query = 100 我们赋值的时候回调用到这个函数
        this.a = val
    },
    get method () {
        return this.req.method
    }
}

module.exports = request