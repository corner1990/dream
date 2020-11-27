// 对称加密
// 对称加密是最快速、最简单的一种加密方式,加密(encryption)与解密(decryption)用的是同样的密钥(secret key)
// 主流的有AES和DES
// 1.1.1 描述
// 1.1.2 简单实现
// 消息 msg
// 密钥 secretKey

let secretKey = 3
// 加密 
function encrypt(str, key) {
  let buf = Buffer.from(str)
  for (let i =0; i< buf.length; i++) {
    buf[i] = buf[i]+key
  }

  return buf.toString()
}
// 解密

function decrypt(str, key) {
  let buf = Buffer.from(str)
  for (let i = 0; i < buf.length; i++) {
    buf[i] = buf[i] - key;
  }
  return buf.toString()
}

// 信息
let msg = 'hello world'

let secret = encrypt(msg, secretKey)
console.log('加密信息:', secret)

let desceret = decrypt(secret, secretKey)
console.log('解密信息:', desceret)

