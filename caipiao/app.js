const Koa = require('koa')
let app = new Koa();
let config = require('./config')
let { port } = config
let getData = require('./apis/getData')

app.use(getData())
app.listen(port, () => {
  console.log(`server start ${port}`)
})
