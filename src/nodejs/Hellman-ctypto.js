let { createDiffieHellman } = require('crypto')

// 客户端
let client = createDiffieHellman(512)
let clietKeys = client.generateKeys() // A
let prime = client.getPrime() // p
let generator = client.getGenerator() // N


// 服务器
let server = createDiffieHellman(prime, generator)
let serverKeys = server.generateKeys() // B


// 客户端计算
let client_secret = client.computeSecret(serverKeys)
// 服务端计算
let server_secret = server.computeSecret(clietKeys)

console.log('client_secret', client_secret.toString('hex'))
console.log('server_secret', server_secret.toString('hex'))

/* 
let N = 23
let p = 5
let secret1 = 6

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
*/