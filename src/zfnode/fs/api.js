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
function rmDir(dir) {
    // 读取到文件内容
    let files = fs.readdirSync(dir) 
    for (var i =0; i < files.length; i++) {
        let newPath = path.join(dir, files[i])
        //判断文件是文件夹还是文件
        let stat = fs.statSync(newPath)
        
        if (stat.isDirectory()) {
            // 如果是文件夹就一直递归走下去
            rmDir(newPath)
        } else { //如果是文件，则直接删除当前文件
            fs.unlinkSync(newPath)
        }
    }
}

rmDir('a')
