const { generateKeyPairSync, privateEncrypt, publicDecrypt, createSign, createVerify } = require('crypto');
// 创建密钥
const rsa = generateKeyPairSync('rsa', {
    modulusLength: 1024,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: 'passphrase'
    }
});

const file = 'learn rsa';
// 创建签名
const sign = createSign('RSA-SHA256');
// 放入文件内容
sign.update(file);
// 用rsa私钥签名，输出一个16进制的字符串
const signInfo = sign.sign({
    key: rsa.privateKey,
    format: 'pem',
    passphrase: 'passphrase'
}, 'hex');

console.log('signInfo', signInfo)


// 创建验证签名对象
const verifyObj = createVerify('RSA-SHA256');
// 放入文件内容
verifyObj.update(file);
// 验证签名是否合法
const isValid = verifyObj.verify(rsa.publicKey, signInfo, 'hex')

console.log('isValid', isValid)