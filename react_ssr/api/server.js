const express = require('express')
const cors = require('cors')
const app = express()
let bodyParser = require('body-parser')
let session = require('express-session')
const port = 4001

// 处理跨域
// app.use(cors({
//   orgin: 'localhost:3000'
// }))
let users = [
  {id: 1, name: 'leo'},
  {id: 2, name: 'Jhon'}
]

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(session({
  saveUninitialized: true,
   resave: true,
   secret: 'hello'
}))

app.get('/api/users', function (req, res) {
res.json(users)
})
app.post('/api/login', function (req, res) {
  let user = req.body
  req.session.user = user
  res.json({
    code: 0,
    data: {
      user,
      msg: '登录成功'
    }
  })
})

app.get('/api/logout', function (req, res) {
  req.session.user = null
  res.json({
    code: 0,
    data: {
      user,
      msg: '退出成功'
    }
  })
})

app.get('/api/user', function (req, res) {
  let user = req.session.user
  if (user) {
    res.json({
      code: 0,
      data: {
        user,
        msg: '成功'
      }
    })
  } else {
    res.json({
      code: 1,
      data: {
        user,
        msg: '你没有登录'
      }
    })
  }
  
})
app.listen(port, () => {
  console.log(`api server start at ${port}`)
})