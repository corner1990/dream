const { generateKeyPairSync, privateEncrypt, publicDecrypt } = require('crypto')

// 生成一对密钥对， 一个是公钥，一个是私钥
const rsa = generateKeyPairSync('rsa', {
    modulusLength: 1024, // 长度
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem', // base64格式的密钥
    },
    privateKeyEncode: {
        type: 'pcks8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: 'passphrase'
    }
})

const message = 'learn use RSA!';
// 加密
let encryptMsg = privateEncrypt({
    key: rsa.privateKey, passphrase: 'passphrase'
}, Buffer.from(message, 'utf-8'));

console.log('encryptMsg', encryptMsg)

// 解密
let decrypteMsg = publicDecrypt(rsa.publicKey, encryptMsg);
console.log('decrypteMsg', decrypteMsg.toString('utf-8'))