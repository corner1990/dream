// 学习非对称加密
const P = 3, Q = 11;
const N = P * Q;

const FN = (P-1) * (Q - 1);

const e = 3;

// { e, N } 公钥 { 7， 33 }， 发送给客户端使用


let d = 1
// 计算 私钥： 用公钥推算私钥, 这里依赖一个FN，才能进行推导
//  e * d % FN === 1 就是我们需要的私钥
for (; e * d % FN !== 1; d++) {
    d++;
}
console.log('d', d)

// 计算
let data = 5;
let c = Math.pow(data, e) % N;

console.log('c', c);

let c2 = Math.pow(c, d) % N;
console.log('c2', c2)

