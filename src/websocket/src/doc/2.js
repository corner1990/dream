// 获取字节长度
let buf = Buffer.from([0b00000001, 0b00000000]);

console.log('brn', buf.readUInt16BE(0))
console.log('le', buf.readUInt16LE(0))
// 获取长度
const getLength = (buffer) => {
    const byte = buffer.readUInt8(0); // 变成十进制
    const str = byte.toString(2); // 编程二进制
    let length = parseInt(str.substring(1), 2);

    if (length === 126) {
        length = buffer.readUInt16BE(1)
    } else if (length === 127) {
        length = buffer.readBigInt64BE(1)
    }

    return length
}

console.log(getLength(Buffer.from([0b11111110, 0b00000000, 0b00000001])))
