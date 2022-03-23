const crypto = require('crypto');

const content = 'learn ndoe hash';
// md5 默认只有32位长度 长度越长 越不容易被碰撞
const mdHash = crypto.createHash('md5').update(content).update(content).digest('hex');
console.log('mdHash', mdHash, mdHash.length);

// 可以是任意随机字符串
const salt = '1234567890'
const sha1Hash = crypto.createHmac('sha256', salt).update(content).update(content).digest('hex');
// 长度更长 提高了被碰撞出来结果的难度
console.log('sha1Hash', sha1Hash, sha1Hash.length)
