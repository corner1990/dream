let Koa = require('koa')

let app = new Koa()
// 222 使用第三方插件
// let bodyparser = require('koa-bodyparser')
app.listen(3000)

// 333 优化自己的的方法
function bodyparser () {
  // 如果这里是异步
  return async (ctx, next) => {
    await new Promise((resolve, reject) => {
      // 接收请求提，将接收道德请求体返回到页面
      let buffers = []
      ctx.req.on('data', buffer => buffers.push(buffer))
      ctx.req.on('end', () => {
        ctx.request.body = Buffer.concat(buffers)
        resolve()
      })
    })
    await next()
  }
}


app.use(bodyparser())
app.use(async (ctx, next) => {
  if (ctx.path == '/user' && ctx.method == 'GET') {
    ctx.body = (`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>form demo</title>
      </head>
      <body>
          <h1>This is fome demo!</h1>
          <form action="http://localhost:3000/user" method="post">
              <input type="text" name="name" placeholder="name"><br>
              <input type="password" name="password" id=""><br>
              <button type="submit">submit</button>
          </form>
      </body>
      </html>
    `)
  } else {
    await next()
  }
})

app.use(async (ctx, next) => {
  // 如果这里是异步
  if (ctx.path == '/user' && ctx.method == 'POST') {
    // 接收请求提，将接收道德请求体返回到页面
    ctx.set('Content-type', 'text/html;charset=utf8;')
    ctx.body = ctx.request.body
  } 
})

// 111下边的代码是使用自己写的parse方法
// app.use(async (ctx, next) => {
//   // 如果这里是异步
//   if (ctx.path == '/user' && ctx.method == 'POST') {
//     // 接收请求提，将接收道德请求体返回到页面
//     ctx.set('Content-type', 'text/html;charset=utf8;')
//     ctx.body = await bodyparser(ctx.req)
//   } 
// })
// z自己每次写这些代码回工作量很大，可以使用第三方插件 bodyparser
// yarn add bodyparser --save
// function bodyparser (req) {
//   // 如果这里是异步
//   return new Promise((resolve, reject) => {
//     // 接收请求提，将接收道德请求体返回到页面
//     let buffers = []
//     req.on('data', buffer => buffers.push(buffer))
//     req.on('end', () => {
//       resolve(Buffer.concat(buffers))
//     })
//   })
// }

 