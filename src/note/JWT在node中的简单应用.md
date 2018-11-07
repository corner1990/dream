# JWT在node中的简单应用

> JSON Web Token（缩写 JWT）是目前最流行的跨域认证解决方案。
>
> 是为了在网络应用环境间传递声明而执行的一种基于JSON的开放标准（[(RFC 7519](https://tools.ietf.org/html/rfc7519)).该token被设计为紧凑且安全的，特别适用于分布式站点的单点登录（SSO）场景。

### 主要解决的问题

- 跨域认证的问题
- 单点登陆的问题
- 省去服务端读取Session的步骤，这样更符合RESTful的规范

### JWT 构成

- header(头部，包括类别（typ）、加密算法（alg）)
- payload(载荷，需要传递的用户信息)
- signature(签名，根据alg算法与私有秘钥进行加密得到的签名字串)

```javascript

//SECREATE_KEY 是我们保存再服务端服务端的随机字符串，用来生成和效验签名的时候使用
// 1. Headers
let header{
  "alg": "HS256",
  "typ": "JWT"
}
// 2. Claims
let payload= {
  "age": "12",
  "name": "leo"
}
// 3. Signature
// 根据alg算法与私有秘钥进行加密得到的签名字串；
// 这一段是最重要的敏感信息，只能在服务端解密；
let sign = HMACSHA256(  
    base64UrlEncode(header) + "." +
    base64UrlEncode(payload),
    SECREATE_KEY
 )

```



### node中使用jwt

- 环境准备
  + 配置服务器，mongodb
  + 安装mongoose插件
  + 安装Express， 这里是为了方便学习，可以使用node原生写，也是ok的就是麻烦一点
  + 安装node的jwt模块`npm i jwt-simple --save`
- 这里为了做效验，定义一个简单的sechema

```javascript
1.新建一个目录，命名为amin
2.进入admin目录，新建目录model，app.js, config.js,
3.进入model目录，新建user.js该文件用来链接mongodb

// admin/model/user.js 代码
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

// admin/config 内容
// 配置常量
module.exports = {
  db_url: 'mongodb://localhost:27017', // 本地mongodb的链接地址
  secret: 'hello wold' // 生成token的时候用的密钥
}
```

- 在`admin/app.js`中写主程序

> 思路如下，实现一个简单的用户登陆注册功能
>
>   1.用户注册，
>
> 2. 用户登陆，
> 3. 用户跳转效验

```javascript
// 后端服务器
let Express = require('express')
let bodyParser = require('body-parser')
let jwt = require('jwt-simple')
let config = require('./config')
let { secret } = config

// 返回一个监听函数
let app = Express()
// 中间件需要处理的内容
app.use(bodyParser.json())
let User = require('./model/user')

// 需要实现的功能
// 处理跨域， 使用cors实现
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
// 1.用户注册
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
// 2.用户登录
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

// 4.公用效验权限中间件
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
//3. 解析请求头，拿到token， authorization: Bearer token
app.post('/order', auth, async function (req, res, next) {
  res.json({
    code: 0,
    data: req.user
  })
})

app.listen(3000)

```

### 总结

> 以上是简单的jwt在node中的应用，当然我们还可以加入过期时间，别的什么的，具体是自己的使用常见，我只抛砖引玉
>
> 传送梦： [jwt-simple](https://www.npmjs.com/package/jwt-simple)

