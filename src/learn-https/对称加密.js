// 罗马加密
const IV = 4;

// 加密 算法
const encrypt = (msg) =>  {
    const buf =  Buffer.from(msg);
    for( let i = 0; i < buf.length; i++) {
        buf[i] = buf[i] + IV;
    }

    return buf.toString()
}

// 解密算法
const decrypt = (msg) => {
    const buf = Buffer.from(msg);
    
    for( let i = 0; i < buf.length; i++) {
        buf[i] = buf[i] - IV;
    }

    return buf.toString()
}

const message = 'hello';

const encryptMsg = encrypt(message)
console.log('encryptMsg', encryptMsg);

const decryptMsg = decrypt(encryptMsg)
console.log('decryptMsg', decryptMsg);

