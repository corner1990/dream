/**
 * 
 * @param {*} bufffer 字节数组
 * @param {*} mask 长度为4的字节数组
 */
const unMask = (buffer, mask) => {
    const len = buffer.length;
    for(let i = 0; i < len; i++) {
        buffer[i]^= mask[i % 4]
    }
}

const mask = Buffer.from([1,0,1,0])
const buffer = Buffer.from([0,1,0,1,0,1,0,1])

unMask(buffer, mask)
console.log(buffer)
