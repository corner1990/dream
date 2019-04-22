const Koa = require('koa')
let app = new Koa();
let config = require('./config')
let { port } = config
let getPage = require('./apis/getPage')
// let getData = require('./apis/getData')

app.use(getPage())
app.listen(port, () => {
  console.log(`server start ${port}`)
})
