let Koa = require('koa')
let app = new Koa()
const _ = require('koa-route');
let json = {}
const res = {
  report: (ctx) => {
    console.log(ctx.query)
    let name = ctx.query.name
    if (json[name]) {
      json[name]++
    } else {
      json[name] = 1
    }
    ctx.body = 'hello'
  },

  json: (ctx) => {
    ctx.body = json
  }
};

app.use(_.get('/report', res.report));
app.use(_.get('/', res.json));
app.listen(3000)