let path = require('path')
// 启动服务的配置项
let config = {
    hostname: 'localhost',
    port: 3000,
    dir: path.join(__dirname, '..', 'public')
}
let debug = require('debug')('static:config')
debug('config')
module.exports = config
