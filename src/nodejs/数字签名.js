// // 数字签名
// // 数字签名的基本原理是用私钥去签名，而用公钥去验证签名
let {
    generateKeyPairSync,
    createSign,
    createVerify
} = require('crypto')

let rsa = generateKeyPairSync('rsa', {
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
})

let content = 'hello'
let signObj = createSign('RSA-SHA256')
signObj.update(content)
let sign = signObj.sign({
  key: rsa.privateKey,
  format: 'pem',
  passphrase: 'passphrase'
}, 'hex')
// let sign = getSign(content, rsa.privateKey, 'passphrase')
console.log('signInfo:', sign)
// 创建签名对象
let verifyObj = createVerify('RSA-SHA256')

verifyObj.update(content)
let isValid = verifyObj.verify(rsa.publicKey, sign, 'hex')
console.log('isValid', isValid)

