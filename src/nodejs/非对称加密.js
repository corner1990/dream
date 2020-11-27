// 非对称加密
// 互联网上没有办法安全的交换密钥
// 单向函数
// 单向函数顺向计算起来非常的容易，但求逆却非常的困难。也就是说，已知x，我们很容易计算出f(x)。但已知f(x)，却很难计算出x
// 整数分解又称素因数分解,是将一个正整数写成几个约数的乘积
// 给出45这个数，它可以分解成 9×5,这样的分解结果应该是独一无二的

// 公钥
let p = 3 , q = 11 // 计算完立即销毁
let n = p * q
let fN = (p - 1) * (q - 1) // 欧拉函数
let e = 7

// for (var d = 1; e * d % fN !== 1; d++) {
//   d++
// }
for (var d = 1; e * d % fN !== 1; d++) {//拓展欧几里得算法
  d++;
}
// 欧拉函数 小于或等于n的正整数中与n互质的数的数目
// 在数论，对正整数n，欧拉函数是小于或等于n的正整数中与n互质的数的数目（因此φ(1)=1）。此函数以其首名研究者欧拉命名(Euler's totient function)，它又称为Euler's totient function、φ函数、欧拉商数等。 例如φ(8)=4，因为1,3,5,7均和8互质。 从欧拉函数引伸出来在环论方面的事实和拉格朗日定理构成了欧拉定理的证明。


console.log('d', d)
let publicKey = { e, n }
let privateKey = { d, n }
console.log('publicKey', publicKey)
console.log('privateKey', privateKey)
// 加密
function encrypt(data) {
  return Math.pow(data, publicKey.e) % publicKey.n
}
// 解密
function decrypt(data) {
  return Math.pow(data , privateKey.d) % privateKey.n
}
/**
公开 N e c
私密 d
e * d % fN == 1
(p - 1) * (q - 1)
N = p * q
*/
let data = 5
let secret = encrypt(data)
console.log('secret', secret)

let desecret = decrypt(secret)
console.log('desceret', desecret)
