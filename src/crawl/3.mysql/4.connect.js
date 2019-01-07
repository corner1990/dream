const mysql = require('mysql')

// 创建连接
function connect () {
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        passwrod: 'root',
        database: 'juejin'
    })

    connection.connect(err => {
        if (err) {
            console.log('链接失败', err)
            // 避免重复链接，所以需要延迟2s
            setTimeout(connect, 2000)
        }


        // 如果链接成功，在查询过程中也有可能出现问题, 则重新链接
        connection.on('error', function () {
            connect()
        })
    })
}


// 链接数据库
connect()

// // quer是执行sql语句的意思， 并非仅仅是用来查询
// /**
//  * @parmas 
//  */
// connection.query(`SELECT 1+1 和, 2 - 1 差`, function (err, res, fields) {
//     console.log(err)
//     console.log(res)
//     console.log(fields)
// })