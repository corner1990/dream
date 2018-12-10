let mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId
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
    email: String
})

// 定义数据库操作
// 用户是为一个可以标记一个文档的
let user = con.model('student', userSchema)
// 文章 objectID
let Aritile = con.model('Article', new Schema({
    title: String,
    content: String,
    user: {
        type: ObjectId, // 类型
        ref: 'student', // 引用model名字
    },
}))

// 关联插入
// user.create({name: 'leo', email: 'leo@leo.com'})
//     .then(user => {
//         // user 保存后的文档对象
//         console.log('user', user)
//         return Aritile.create({
//             title: '标题',
//             content: '内容',
//             user: user.id
//         })
//     })
//     .then(res => {
//         console.log('res', res)
//     })

// 关联查询
// Aritile.find({})
//     .then(res => {
//         console.log('res', res)
//         res = res.forEach(item => {
//             user.findById(item.id).then(user => {
//                 return item.user = user
//             })
//         })
//         return res
//     })

// populate 填充，让mongoose吧user字段从第一个字符串转换成一个对象
Aritile.find().populate('user').exec().then(res => {
    console.log('res', res)
    /* 
    [ { _id: 5bf63729a6ea95a8749de58f,
    title: '标题',
    content: '内容',
    user:
     { _id: 5bf63728a6ea95a8749de58e,
       name: 'leo',
       email: 'leo@leo.com',
       __v: 0 },
    __v: 0 } ]
    */
})