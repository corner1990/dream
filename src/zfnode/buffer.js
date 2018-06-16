//Buffer 对象
//创建方式 Buffer 是global上的属性
//申请内存，可以存放图片 文本
//buffer 存的都是16进制的

//这种申请方式内存永远是比较感觉的，声明也比较费时
//通过长度来申请
let buffer = Buffer.alloc(6) 

//这样声明会比较快，但是可能会又脏值
let buffe = Buffer.allocUnsafe(6) 
//可以使用fill清空
buffe.fill(1, 2, 3)

// 通过字符串来申请
// console.log(Buffer.from('preter'))
// console.dir(Buffer.from([2, 4, 5, 9]));

// console.log(buffer)
// console.log(buffe)

// let b2 = Buffer.alloc(12)
// let b3 = '你'
// let b4 = '还好吗'

//参数为 内容 偏移量 长度 编码
// b2.write(b3, 0, 3, 'utf8')
// b2.write(b4, 3, 9, 'utf8')

// console.dir(b2.toString())

//常用方法： slice indexof copy concat split
// slice是浅拷贝
// Buffer 和二维数组是一样的，Buffer存的都是内存地址，请看实例
let buffer = Buffer.alloc(6, 1)
let newBuffer = buffer.slice(0, 3)
newBuffer[0] = 100
console.log(buffer)

//copy方法
let buffer = Buffer.alloc(6)
let buf1 = Buffer.from('你')
let buf2 = Buffer.from('好')
//调用规则：目标buffer 引用buffer 起始为止 结束为止 复制位数
// buf1.copy(buffer, 0, 3, 3)
// buf2.copy(buffer, 3, 6, 3)

// console.log(buffer.toString('utf8'))

/**
 * @description 把当前buffer对象的执行位置的值拷贝到target对象中去(浅拷贝)
 * @param {Buffer} target 需要拷贝内容的目标对象
 * @param {Number} offset 需要拷贝内容的目标对象写入的为止偏移值
 * @param {Number} start  拷贝内容的起始为止
 * @param {Number} end    拷贝内容的结束为止
 * 
 */
Buffer.prototype.myCopy = function (target, offset, start, end) {
    //思路
    // 开始循环， i = 0;
    // 通过赋值的开始为止和结束为止拿到循环测次数：len = end - start 
    //赋值： 
    // target： 目标的偏移值加上当前循环测次数 
    // source：拿到的值： 循环加起始位置
    // target = source
    let len = end - start
    for(let i = 0; i< len; i++) {
        // target = source
        target[offset + i] = this[i+start]
    }
}
buf1.myCopy(buffer, 0, 0, 3)
buf2.myCopy(buffer, 3, 0, 3)
console.log(buffer)
console.log(Buffer.from('你好'))

// concat方法学习
//传入两个参数，返回一个Buffer对象: 需要合并的buffer数组，合并后的长度（入过超过内容）），默认填充为0
//Buffer.concat([buf1, buf2], 100)
let buf1 = Buffer.from('李')
let buf2 = Buffer.from('兴龙')

// console.log(Buffer.concat([buf1, buf2], 200))
/**
 * @description 模拟实现 buffer 的 concat 方法
 * @param {Array} bufList 合并对象的数组 
 * @param {Number} length 合并后对像的最大长度，可以为空
 * 
 * 实现思路：
 * 1.判断传入对象数组的长度，如果为0，则直接返回一个空buffer对象，，如果为1，则返回这个对象
 * 2.创建len变量，穿件buffer对象的长度，穿件定位变量pos
 * 3.创建长度为len的buffer对象
 * 4.进行遍历bufList数组，拿到每一个buffer对象
 * 5.循环上一步拿到的buffer对象，并赋值到我们创建的buffer对象，每次都需要更新pos，
 * 7.返回我们处理后的buffer独享
 */
Buffer.myConcat = function (bufList, length) {
    //如果list的长度为0的话直接放回一个空buffer对象
    if(!bufList.length) return Buffer.alloc(0)
    //如果只传入一个buffer对象，则直接返回
    if (bufList.length == 1) return bufList[0]

    //拿到所有的长度
    let len = length || bufList.reduce((prev, cur, index, arr)=>{
        return prev + cur.length
    }, 0);
    //创建新的buffer对象
    let buf = Buffer.alloc(len)
    //设置一个计算位置的变量
    let pos = 0
    //循环第一次，拿到每一个buffer对象
    bufList.forEach((curBuf, index) => {[[1 , 2, 3], [3, 4, 5]]
        //第二次遍历，拿到buffer的内容， 然后写入到我们创建的buf中 [1, 2, 3]
        for(var i =0; i < curBuf.length; i++){
            buf[pos] = curBuf[i]
            pos++
        }
    })
    //假如长度超过内容的长度，则填充空余为止为0
    return buf.fill(0, pos)
}
console.log(Buffer.myConcat([buf1, buf2]))



var arr = [[12, 34, 56], [23, 45], [23, 56]]
console.log(arr.reduce((prev, cur, index, arr) => {
    return prev + cur.length
}, 0))

//indexof 方法： 字符串的，查看当前字符串有没有包含这个字符串，返回位置或者-1
console.log('abcdef'.indexOf('d'))
//buffer的indexof方法：
// 拿到String的下标，
// 可以穿第二个参数pos 偏移为止，表示从那个位置开始查找
// buf.lastIndexOf(String, pos) 


let buf = Buffer.from('环-球-易-购')
console.log(buf.indexOf('-', 11+1))
//手写一个split方法
/**
 * @description 一个buffer对象分割方法
 * @param {string} step  根据setp对buffer分割
 * @returns {Array}  分割后得到的数据
 * 
 * 实现思路：
 * 1.拿到分隔符，判断是否为空
 * 2.创建数据，保存分割后的数据
 * 3.创建pos变量，保存偏移为止
 * 4.创建变量拿到分割符号的长度
 * 5.第一次查找并赋值index，
 * 6.如果index的致不为-1，则进行循环赋值和更新index，pos
 * 7.最后把pos到当前对象的最大长度的内容添加到数组，
 * 返回对象
 */

Buffer.prototype.split = function(step) {
    //为空判断
    if (!step) throw new Error('setp is not definedg')
    let arr = [] //保存分割后的数据
    let pos = 0 //起始查找为止
    let len = Buffer.from(step).length //拿到分割符的length，防止分隔符是汉字，使用buffer.from
    let _self = this //当前对象
    let index = _self.indexOf(step, pos) //查找打的下标
    while(index !== -1) {//只要下边不为-1 
        //添加到数组 从pos偏移到index 当前查找的的下一个坐标
        arr.push(_self.slice(pos, index))
        //更新pos坐标
        pos = index+len
        //更新index的值
        index = _self.indexOf(step, pos)
    }
    //最后可能会有一部分内容被遗漏，直接使用这种方式添加
    arr.push(_self.slice(pos, _self.length))
    return arr
}
let buf = Buffer.from('环-球-易-购')
console.log(buf.split('-'))


