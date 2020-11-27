//  数字证书 #
// 数字证书是一个由可信的第三方发出的，用来证明所有人身份以及所有人拥有某个公钥的电子文件

const { generateKeyPairSync, createSign, createVerify, createHmac, createHash,  } = require('crypto')
let passphrase = 'passphrase'
let rsa = generateKeyPairSync('rsa', {
  modulusLength: 1024,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem' // base64格式的秘钥
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase // 私钥密码
  }
})

// 模拟ca 
let caPassphrase = 'caPassphrase'
let caRsa = generateKeyPairSync('rsa', {
  modulusLength: 1024,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem' // base64格式的秘钥
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase: caPassphrase // 私钥密码
  }
})

let info = {
  domain: 'http:127.0.0.1:3000',
  publicKey: rsa.publicKey
}

/**
 * @desc 创建签名
 * @param { any } content 需要加密的信息
 * @param { string } privateKey 私钥
 * @param { string } passphrase 密码
 */
function getSign(content, privateKey, passphrase) {
  let signObj = createSign('RSA-SHA256')
  signObj.update(content)
  // 创建签名
  return signObj.sign({
    key: privateKey,
    format: 'pem',
    passphrase
  }, 'hex')
}
// 吧申请信息发哥哥CA机构，请求办法证书
let hash = createHash('sha256').update(JSON.stringify(info)).digest('hex')
// ca签名
let sign = getSign(hash, caRsa.privateKey, caPassphrase)
// 基本的证书
let cert = {
  info,
  sign
}
console.log('cert', cert)
// 客户端使用ca的公钥 验证证书得合法性， 如果合法，取出公钥

/**
 * @desc 验证签名
 * @param {*} content 
 * @param {*} sign 
 * @param {*} publicKey 
 */
function verifySgin(content, sign, publicKey) {
  let verifyObj = createVerify('RSA-SHA256')
  verifyObj.update(content)
  return verifyObj.verify(publicKey, sign, 'hex')

}

let vaild = verifySgin(hash, sign, caRsa.publicKey)
// 验证通过后 拿到服务器的公钥
let serverPublicKey = cert.info.publicKey
// 拿到公钥后，使用公钥加密，然后发送数据给服务器
console.log('vaild', vaild)