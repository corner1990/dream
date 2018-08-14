let http = require('http')
for(var i =0; i < 5000; i++) {
    http.get({
        hostname: 'localhost',
        port: 5000,
        path: '/',
        method: 'GET'
    }, res => {
        res.on('data', data => {
            console.log(data.toString())
        })
    })
}