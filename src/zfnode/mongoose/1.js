let mongoose = require('mongoose')
const Schema = mongoose.Schema;
/**
 * 数据库 集合 文档
 */
// 1.连接数据库
// 2.定义骨架模型，对应于集合
// 3.定义数据库操作Model

// mondb://主机名:端口号/数据库名
let dbUrl = 'mongodb://localhost:27017/school'
let con = mongoose.createConnection(dbUrl, { useNewUrlParser: true })

// 定义骨架模型
let userSchema = new Schema({
    name: String,
    age: Number
})

// 定义数据库操作
let user = con.model('student', userSchema)
// 1。新增数据
// 可以使用回调函数
// user.create({name: 'lxl', age: 28}, (err, res) => {
//     console.log('res', res)
// })
// // 也可以使用promise
// user.create({name: 'lxl', age: 28}).then((res) => {
//     console.log('res', res)
// })

// 2.跟新数据
// user.update({name: 'leo'}, {age: 20}).then((res) => {
//     console.log('res', res)
// })
// 在mongose里，即使没有$set操作，也是跟新指定字段，其他字段不变
// user.update({name: 'leo'}, {$set: {name: 'leoleo'}, $inc: {age: 1}}).then((res) => {
//     // { ok: 1, nModified: 1, n: 1 } nModified: 1 表示实际更新的调试， n:表示要更新的条数
//     // 如果匹配上的条， namen就是几，然后实际跟新会进行比较，如果新值和旧值是一样的。则不进行更新
//     console.log('res', res)
// })
// 更新多条数据
// user.update({name: 'leo'}, {$set: {name: 'leoleo'}, $inc: {age: 1}}, {multi: true}).then((res) => {
//     // { ok: 1, nModified: 1, n: 1 } nModified: 1 表示实际更新的调试， n:表示要更新的条数
//     // 如果匹配上的条， namen就是几，然后实际跟新会进行比较，如果新值和旧值是一样的。则不进行更新
//     console.log('res', res)
// })

// 删除数据
// user.remove({name: 'leoleo'}).then(res => {
//     console.log('res', res)
// })

// 查询数据
// 参数： 查询条件， 需要返回的字段
// user.find({name: /haha/}, {name: 1, _id: 0}).then(res => {
//     console.log('res', res)
//     /* 
//     [ { name: 'hahahh' },
//     { name: 'hahahh' },
//     { name: 'hahahh' },
//     { name: 'hahahh' },
//     { name: 'hahahh' },
//     { name: 'hahahh' },
//     { name: 'hahahh' },
//     { name: 'hahahh' },
//     { name: 'hahahh' } ]
//      */
// })
// 分页处理
let pageName = 2
let pageSize = 3
// 调用exec的时候才真正开始执行查询，之前都是参数拼接处理
user.find({name: /haha/})
    .sort({age: -1})
    .skip((pageName -1 ) * pageSize)
    .limit(pageSize)
    .exec().then(res => {
        console.log('res', res)
    })