
// rsa 验证
let { generateKeyPairSync, privateEncrypt, publicDecrypt } = require('crypto')

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
    passphrase: 'server_passphrase'
  }
})

let msg = 'hello world'
// 加密
let enc_prv = privateEncrypt({
  key: rsa.privateKey,
  passphrase: 'server_passphrase'
}, Buffer.from(msg, 'utf8'))

console.log('enc_prv', enc_prv.toString('hex')) 

// 解密
let dec_pub = publicDecrypt(rsa.publicKey, enc_prv)
console.log('dec_pub', dec_pub.toString('utf8'))
