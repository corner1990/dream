/* get使用 */
let request = require('request')

request.get('https://juejin.im/', function (err, response, body) {
    console.log('err', err)
    // console.log('response', response)
    console.log('body', body)
})