// 操作数据化逻辑
let mongoose = require('mongoose')
let config = require('../config')
let { db_url } = config

// 连接数据库
mongoose.connect(db_url, {useNewUrlParser: true})

// 骨架Schema
let UserSchema = new mongoose.Schema({
  username: String,
  password: String
})


// 创建一个模型
let User = mongoose.model('User', UserSchema)

// 对外暴露模型
module.exports = User