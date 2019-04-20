const Koa = require('koa')
let app = new Koa();
let config = require('./config')
let { port } = config
let getPage = require('./apis/getData')

app.listen(port, () => {
  console.log(`server start ${port}`)
})

getPage()