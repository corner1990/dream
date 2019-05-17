const express = require('express')
const cors = require('cors')
const app = express()
const port = 4001

// 处理跨域
app.use(cors({
  orgin: 'localhost:3000'
}))
let users = [
  {id: 1, name: 'leo'},
  {id: 2, name: 'Jhon'}
]
app.get('/api/users', function (req, res) {
res.json(users)
})
app.listen(port, () => {
  console.log(`api server start at ${port}`)
})