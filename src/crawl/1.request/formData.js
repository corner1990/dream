const path = require('path')
const request = require('request')
const fs = require('fs')
// 在html 如果有文件的话需要指定encrytype = "multipart-formdata"

let formData = {
    name: 'test',// 普通文本字段
    content: fs.createReadStream(path.resolve(__dirname, 'content.txt'))
}

// 发起请求
// $.ajax
// $.get
// $.post

request.post({
    url: 'http://localhost:8080/upload',
    formData
}, function (err, res, body) {
    console.log(err)
    console.log(body)
})

/* 
* 客户端上传两次相同的问题，两次的文件名完全一样，也会生成新的文件，不会覆盖原来的文件
*/