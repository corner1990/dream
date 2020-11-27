const crypto = require('crypto')
let content = '123456'
let md5Hash = crypto.createHash('md5').update(content).update(content).digest('hex')
console.log('md5Hash', md5Hash, md5Hash.length)
// md5Hash ea48576f30be1669971699c09ad05c94 32
let salt ='123456'
let sha1 = crypto.createHmac('sha256', salt).update(content).update(content).digest('hex')

console.log('sha1', sha1, sha1.length)
// sha1 5a6332b13631636dee5cd2ba2689e239de85dbf89c4e0cb65793ea5c46a2408a 64