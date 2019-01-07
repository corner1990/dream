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

// query是执行sql语句的意思， 并非仅仅是用来查询
/**
 * @parmas 
 */
// connection.query(`SELECT 1+1 和, 2 - 1 差`, function (err, res, fields) {
//     console.log(err)
//     console.log(res)
//     console.log(fields)
// })

// 存储数据
connection.query(`INSERT INTO student(id, name, age, hobby) VALUES(1, 'leo2', 12, 'running') `, function (err, res) {
    console.log(err)
    console.log(res)
})

