let fs = require('fs')
let path = require('path')
let p = path.resolve(__dirname, './')
console.log('p', p)
fs.readFile(path.join(p, '1.txt'), {flag: 'r'}, (err, data) => {
    if (err) {
        return console.log('err', err)
    }
    
    console.log('res', data.toString())
})