let mongoose = require('mongoose')

/**
 * 动态创建数据库
 * @param {String} url 数据库url
 * @param {string} name 数据库名称
 * @param {Object} schema 可以定义的schema， 这里没有做过多的处理，自己可以处理批量或者直接返回
 * @param {String} doc 集合的名称
 */
const createTable = async (url, name, schema, doc ) => {
  let dbUrl = `mongodb://root2:123456@${url}/school`
 console.log('dbUrl', dbUrl)
  const Schema = mongoose.Schema;
  return mongoose.createConnection(dbUrl, { useNewUrlParser: true })
                    .then(function(res) {
                        // let temp = new Schema(schema)

                        // 定义数据库操作
                        // let model = res.model(doc, temp)

                        // return model
                        res.createUser({
                            name: 'test',
                            pwd: 123456,
                            roles:[
                                {
                                    role:"readWrite",
                                    db:"school"
                                },
                                'read'
                           ]
                        })
                    }, function (err) {
                        console.log('err', err)
                    })
//   const conn = mongoose.createConnection('mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]', options);
}

/**
 * 使用
 */
let test = createTable('localhost:27017', 'hello', {
  name: String,
  age: Number
}, 'testCreate')
// .then(function (mode) {
//     console.log('mode', mode)
//     // mode.create({name: 'textCreate', age: 10})
//     // .then(
//     //   res => {console.log('res', res)},
//     //   err => {console.log('err', err)}
//     // )
// })

// test.create({name: 'textCreate', age: 10})
//   .then(
//     res => {console.log('res', res)},
//     err => {console.log('err', err)}
//   )


