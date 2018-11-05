// 后端服务器
let Express = require('express')
let bodyParser = require('body-parser')
// let jwt = require('jwt-simple')
let jwt = require('./jwt-simple')
let config = require('./config')
let { secret } = config

// 返回一个监听函数
let app = Express()
// 中间件需要处理的内容
app.use(bodyParser.json())
let User = require('./model/user')
// 需要实现的功能
// 处理跨域
// jwt 和cookie没有关系
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Orgin', '*') // 允许的域名
  res.setHeader('Access-Control-Allow-headers', 'Content-Type,Authorization') // 允许的请求头
  res.setHeader('Access-Control_Allow-Methods', 'GET,POST,DELETE,PUT,OPTIONS')
  if (req.method === 'OPTIONS') {
    res.end()
  } else {
    next()
  }
  
})
// 用户注册
app.post('/reg', async function (req, res, next) {
  let user = req.body
  try {
    // 添加以后返回的结果
    user = await User.create(user)
    
    res.json({
      code: 0,
      data: {
        user: {id: user._id, name: user.username}
      },
      msg: '注册成功'
    })

  } catch (e) {
    res.json({
      code: 1,
      msg: '注册失败'
    })
  }
  
})
// 用户登录
app.post('/login', async function (req, res, next) {
  let user = req.body
  
  user = await User.findOne(user)
  
  if (user) {
    // 用户存在，返回登录成功
    let token = jwt.encode({
      id: user._id,
      username: user.username
    }, secret)
    res.json({
      code: 0,
      data: {
        token
      }
    })
  } else {
    res.json({
      code: 1,
      meg: '用户不存在'
    })
  }
})

// 公用效验权限中间件
let auth = (req, res, next) => {
  let authorization = req.headers['authorization']
  
  if (authorization) {
    let token = authorization.split(' ')[1]
    // 解析token
    try { // 如果被篡改，就会无法解析报错
      let user = jwt.decode(token, secret)
      req.user = user
      next() // 取出token表示的内容 表示没有被篡改过
    } catch (e) {
      res.status(404).send('Not Allowed')
    }
  } else {
    res.status(404).send('Not Allowed')
  }
}
// 用户效验可以通过 Authorization 
// 解析请求头，拿到token， authorization: Bearer token
app.post('/order', auth, async function (req, res, next) {
  res.json({
    code: 0,
    data: req.user
  })
})

app.listen(3000)

