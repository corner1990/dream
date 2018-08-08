
let fs = require('fs')
let path = require('path')
let ws = fs.createWriteStream(path.join(__dirname, '1.txt'))
process.stdout.on('data', data => ws.write(data))