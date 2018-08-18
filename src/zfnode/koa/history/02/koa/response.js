// 自己封装的 response 对象

let response = {
    get body () {
        return this._body
    },
    set body (body) {
        this._body = body
    }
}

module.exports = response
