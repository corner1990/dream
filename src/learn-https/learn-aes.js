const crypto = require('crypto');
// AES 为常用的对称加密
const key = '1234567890123456'
const iv = '1234567890123456';

const encrypt = (data) => {
    // 加密长度为128 时 key的长度为16位
    // 加密长度为256时 key的长度为32为
    const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    cipher.update(data);
    return cipher.final('hex')
}

const decrypt = (data) => {
    const cipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    cipher.update(data, 'hex');
    return cipher.final('utf8')
};

const msg = 'hello';

const encryptMsg = encrypt(msg);
console.log('encryptMsg', encryptMsg);

const decryptMsg = decrypt(encryptMsg);
console.log('decryptMsg', decryptMsg);