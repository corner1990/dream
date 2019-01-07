const mysql = require('mysql')

// 创建连接
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    passwrod: 'root',
    database: 'juejin'
})

// 链接数据库
connection.connect()

// quer是执行sql语句的意思， 并非仅仅是用来查询
/**
 * @parmas 
 */
connection.query(`SELECT 1+1 和, 2 - 1 差`, function (err, res, fields) {
    console.log(err)
    console.log(res)
    console.log(fields)
})