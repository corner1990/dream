/* 使用post请求 */
let request = require('request')
const options = {
    url: 'http://localhost:8080/signup',
    method: 'POST',
    json: true,
    headers: {
        "Content-Type": "application/json"
    },
    body: {
        name: 'leo',
        age: 9
    }
}

request.post(options, function (err, res, body) {
    if (!err && res.statusCode == 200) {
        console.log(body)
    } else {
        console.log(err)
    }
})