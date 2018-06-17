// 创建文件夹
// fs.mkdirSync
// 目录创建必须确保父级文件夹存在
fs.mkdir('a/b/c', err => {
    if (err) throw Error(err)
})