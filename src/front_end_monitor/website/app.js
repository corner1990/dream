let Koa = require('koa')
let API = require('./middlewere/api')
let SourceMap = require('./middlewere/sourceMap')
const Serve = require('koa-static')

let app = new Koa()
let port = 3000

app.use(API)
app.use(SourceMap)
app.use(Serve(__dirname + '/client'));

app.listen(port, () => {
    console.log(`${port} is listen`)
})
