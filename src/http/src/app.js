const Express = require('express');
const app = new Express();
const fs = require('fs');
const path = require('path');

const port = 3333;

// 处理
app.get('/', (req, res) => {
 
    res.send('hello world')
    
})
// 列表接口
app.get('/getList', (req, res) => {
    const list = [1, 2, 3, 4, 5, 6]
    res.json(list)
    
})

app.get('/index.html', (req, res, next) => {
    const options = {
        root: path.join((__dirname, './')),
        dotfiles: 'deny',
        headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
        }
    }

    res.sendFile('./index.html', options, err => {
        if (err) {
            next(err)
        } else {
            console.log('send index.html')
        }
    })
    
    //  res.send('index')
     
 })

// 监听端口
app.listen(port, () => {
    console.log(`express app listening on port ${port}`)
})