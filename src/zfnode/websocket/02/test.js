let code = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
let crypto = require('crypto')
let key = 'ijWLSJaIXZ+6kAUCRzIRCw=='
let accept = crypto.createHash('sha1').update(code + key).digest('base64')
console.log(accept)