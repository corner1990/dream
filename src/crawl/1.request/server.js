const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const multer = require('multer')

// 当服务器端收到请求体的时候，如果他是一个formdata类型，则会吧接受礼拜能的并解析里边的数据，
// 数据分成两种，一种是普通的文本，一种是文件
// 普通文本： req.body 
// 文件： req.file
const upload = multer({
    // 指定文件的临时存放目录
    dest: path.resolve(__dirname, 'uploads')
})
let app = express()
// 下边那个中间件生效取决于请求头中的Content-Type的值
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.post('/signup', function (req, res) {
    let user = req.body
    res.json(user)
})

/* single表示这个请求form中只有一个类型字段 */
app.post('/upload', upload.single('content'),function (req, res) {
    let file = req.file
    let body = req.body
    console.log(file)
    console.log(body)
    res.json({
        msg: 'ok',
        status: 200
    })
})

app.listen(8080)