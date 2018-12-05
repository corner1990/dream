let mongoose = require('mongoose')
const Schema = mongoose.Schema;


// Object.keys(mongoose).map(item => console.log('item', item))
let dbUrl = 'mongodb://localhost:27017/school'
let con = mongoose.createConnection(dbUrl, { useNewUrlParser: true })

// 定义骨架模型
let userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: Number
})

// 定义数据库操作
let user = con.model('student', userSchema)
let arr = ['create','find', 'findOne', 'findById']
arr.map(key => {
    let fn = user[key].bind(user)
    user[key] = async (...args) => {
        return await fn(args)
            .then(
                res => res,
                err => err
            )
    }
})

// Object.keys(user.model).map(item => console.log('item', item))
user.create({age: 10, name: 'zhouejie'}).then(res => {
    console.log('res', res)
}, err => {
    console.log('err', err)
})
