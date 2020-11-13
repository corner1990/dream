const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const port = 3333
// 设置静态路由
app.use(express.static('public'))
app.use(bodyParser.json())
app.get('/', (req, res) => {
  res.send('hello express')
})

const todoList = [
  {
    id: 1, 
    name: '吃饭'
  },
  {
    id: 2, 
    name: '读书'
  },
  {
    id: 3, 
    name: '睡觉'
  },
  {
    id: 4, 
    name: '打豆豆'
  }
]
let selected = [1]
app.get('/getListInfo', (req, res) => {
  res.json({
    todoList,
    selected
  })
})

app.get('/toggleTodo', (req, res) => {
  let { id } = req.query
  id -= 0

  if (selected.find(item => item === id)) {
    selected = selected.filter( item => item !== id)
  } else {
    selected.push(id)
  }
  res.json({
    code: 0,
    msg: 'ok',
    data: {
      selected
    }
  })
})
// 监听端口
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
