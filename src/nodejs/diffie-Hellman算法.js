//  Diffie-Hellman算法
// Diffie-Hellman算法是一种密钥交换协议，它可以让双方在不泄漏密钥的情况下协商出一个密钥来
// 简单实现

let N = 23
let p = 5
let secret1 = 9

let A = Math.pow(p, secret1) % N

// 将 P N A 发送给b服务器
console.log(`A: ${A}; P: ${p}; N: ${N}`)

// b服务器有自己 secret2 和 B
let secret2 = 8
let B = Math.pow(p, secret2) % N
console.log(`B: ${B}; P: ${p}; N: ${N}`)

// A计算
console.log(Math.pow(B, secret1) % N)

// b 计算公钥
console.log(Math.pow(A, secret2) % N)