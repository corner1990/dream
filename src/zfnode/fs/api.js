// 创建文件夹
// fs.mkdirSync
// 目录创建必须确保父级文件夹存在
const fs = require('fs')
fs.mkdir('a', err => {
    if (err) throw Error(err)
})

//创建目录 make mkdir a/b/c
//同步创建 性能低
// const fs = require('fs')

// function makep (dir) {
//     let paths = dir.split('/')
   
//     for (let i = 1; i < paths.length; i++) {
//         let newPath = paths.slice(0, i).join('/')
//        // 创建前需要先判断有没有当前牡蛎
//         try {
//             // 如果读取不到文件，则说明没有当前目录，可以直接创建
//             fs.accessSync(newPath, fs.constants.R_OK)
//         } catch (e) {
//             fs.mkdirSync(newPath)
//         }
//     }
// }
// makep('a/b/c/d')

// 异步创建目录 性能相对比较好
// 需要注意的是，异步使用的时候永远不能使用for循环
const fs = require('fs')
function makep (dir) {
    let paths = dir.split('/')
    let index = 1;

    function createDir (index, fn) {
        if (index > paths.length) {
            return fn && fn()
        }
        
        let newPath = paths.slice(0, index).join('/')
        fs.access(newPath, err => {
            if (err) {//如果文件不存在 ，就会走着里
                fs.mkdir(newPath, err=>{
                    if(err) throw new Error(err)
                    createDir(index+1)
                })
            } else {
                createDir(index+1)
            }
        })
    }
    createDir(index)
}

makep('a/b/c/d/e/f', function () {
    console.log('创建完毕')
})


// 删除文件夹
const fs = require('fs', err => {
    console.log(err)
})

// fs.rmdir('a')
fs.rmdirSync('a')

//删除文件
fs.unlink('a.js', err => {})
fs.unlinkSync('b.js')

//查看文件加的内容，是文件还是文件夹
// fs.stat
const fs = require('fs')
fs.stat('a', (err, stat) => {
    // stat.isDirectory() //判断是否是一个文件夹
    // stat.isFile() //判断是否是一个文件

    if (stat.isDirectory()) {
        // 读取当前文件夹下的内容
        fs.readdirSync('a', (err, files) => {
            console.log(files)
        })
    }
    console.log(stat)
})

// 删除文件夹
// 同步实现
const fs = require('fs')
const path = require('path')

/**
 * 
 * @param {string} dir 
 */
function removeDir(dir) {
    // 读取到文件内容
    let files = fs.readdirSync(dir) 
    // 假如文件加不为空，则进入循环，为空的话直接跳过循环，直接删除当前代码
    for (var i =0; i < files.length; i++) {
        let newPath = path.join(dir, files[i])
        //判断文件是文件夹还是文件
        let stat = fs.statSync(newPath)
        
        if (stat.isDirectory()) {
            // 如果是文件夹就一直递归走下去
            removeDir(newPath)
        } else { //如果是文件，则直接删除当前文件
            fs.unlinkSync(newPath)
        }
    }
    // 等代码循环完毕，最后删掉文件夹
    fs.rmdirSync(dir)
}

removeDir('a')

// 异步删除 
// promise实现
const fs = require('fs')
const path = require('path')
function rmPromise (dir) {
    //返回一个promise对象
    return new Promise((resolve, reject) => {
        //拿到文件状态
        fs.stat(dir, (err, stat) => {
            //如果文件是文件夹，则走这里，否则走else逻辑
            if (stat.isDirectory()) {
                fs.readdir(dir, (err, files) => {
                    // 如果又错误，则世界抛出错误
                    if (err) reject(err)
                    // 使用map方法映射，得到新的路径
                    files = files.map(file => path.join(dir, file))
        
                    //遍历文件夹，读取内容，然后调用自身
                    files = files.map(file => rmPromise(file))
                    
                    //使用promise.all拿到所有promise执行后的结果，并删除当前目录
                    Promise.all(files).then(()=> {fs.rmdir(dir, resolve)})
                })
            } else {
                //如果dir是文件，则直接删除，并且把resolve作为回调函数
                fs.unlink(dir, resolve)
            }
            
        }) 
    })
}
rmPromise('a')
