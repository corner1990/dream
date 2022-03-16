const SecWebSocketKey = 'NXvJN8tEsybLI4yqTmW2Ig==';
const SecWebSocketAccept = '4MwZdxjPtlPspXPNnxUSJbOEep0=';

const CODE = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';

const crypto = require('crypto');

// 编译key
const toAcceptKey = (wsKey) => {
    return crypto.createHash('sha1').update(wsKey + CODE).digest('base64')
}

const result = toAcceptKey(SecWebSocketKey);
console.log(result)

exports.toAcceptKey = toAcceptKey;