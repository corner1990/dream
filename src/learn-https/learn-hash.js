/**
 * 1. 不同的输入有不同的输出
 * 2. 不能从hash反推出结果
 * 3. 长度固定
 */

const Hash = (num, len = 8) => {
    // 用于不全的字符串
    const fillStr = '1234567890qwertyuiopasdfghjklzxcvbnm';
    // padStart()方法,padEnd()方法
    // ES2017 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。
    // padStart()用于头部补全，padEnd()用于尾部补全。
    return (num % 1024 +'').padStart(len, fillStr)
}

console.log(Hash(1))
console.log(Hash(128))
console.log(Hash(256))
console.log(Hash(1024))