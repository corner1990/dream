// AES
// http://nodejs.cn/api/crypto.html#crypto_decipher_update_data_inputencoding_outputencoding
// algorithm用于指定加密算法，如aes-128-ecb、aes-128-cbc等
// key是用于加密的密钥
// iv参数用于指定加密时所用的向量
// 如果加密算法是128，则对应的密钥是16位，加密算法是256，则对应的密钥是32位

const crypto = require('crypto')
// 加密
function encrypt(data, key, iv) {
  let decipher = crypto.createCipheriv('aes-128-cbc', key, iv)
  // let decipher = crypto.Cipher('aes-128-cbc', key, iv)
  decipher.update(data)
  return decipher.final('hex')
}

// 解密
function decrypt(data, key, iv) {
  // let decipher = crypto.Decipher('aes-128-cbc', key, iv)
  let decipher = crypto.createDecipheriv('aes-128-cbc', key, iv)
  decipher.update(data)
  return decipher.final('utf8')
} 

let key = '1234567890123456'
let iv = '1234567890123456'

let data = 'hello world'
let encrypted = encrypt(data, key, iv)
console.log('encrypted', encrypted)

let decrypted = decrypt(encrypted, key, iv)
console.log('decrypted', decrypted)
