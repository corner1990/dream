let mongoose = require('mongoose')

/**
 * 动态创建数据库
 * @param {String} url 数据库url
 * @param {string} name 数据库名称
 * @param {Object} schema 可以定义的schema， 这里没有做过多的处理，自己可以处理批量或者直接返回
 * @param {String} doc 集合的名称
 */
const createTable = (url, name, schema, doc ) => {
  let dbUrl = `${url}/${name}`
  const Schema = mongoose.Schema;
  let con = mongoose.createConnection(dbUrl, { useNewUrlParser: true })

  // 定义骨架模型
  let temp = new Schema(schema)

  // 定义数据库操作
  let model = con.model(doc, temp)

  return model
}

/**
 * 使用
 */
let test = createTable('mongodb://localhost:27017', 'hello', {
  name: String,
  age: Number
}, 'testCreate')

test.create({name: 'textCreate', age: 10})
  .then(
    res => {console.log('res', res)},
    err => {console.log('err', err)}
  )