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
/**
 * @desc 创建文件加函数
 * @param  {string} dir 需要创建的文件夹名
 * @return {none}     none
 *
 * 实现思路：
 * 1.分割路径
 * 2.循环路径(使用fs.accessSync 读取新目录路径(newPath)，确保每一级目录都存在，不存在就创建一个)
 * 3.完成目录创建
 */
function makep (dir) {
    // 分割拿到路经数组
    let paths = dir.split('/')

   // 对路径数组遍历，确保每一级目录都存在
    for (let i = 1; i < paths.length; i++) {
        let newPath = paths.slice(0, i).join('/')
       // 创建前需要先判断有没有当前目录
        try {
            // 如果读取不到文件，则说明没有当前目录，可以直接创建
            fs.accessSync(newPath, fs.constants.R_OK)
        } catch (e) {
            // 如果说上边读取不到该目录，就会报错，走catch语句，我们在这里之间创建目录
            fs.mkdirSync(newPath)
        }
    }
}
makep('a/b/c/d')

// 异步创建目录 性能相对比较好
// 需要注意的是，异步使用的时候永远不能使用for循环
const fs = require('fs')
/**
 * @desc 异步创建目录
 * @param  {string} dir 我们创建目录传入的目录名称
 *
 * 实现思路：
 * 1.在函数内内部创建遍历，保存路径数组（paths），偏移量（index）
 * 2.内部创建一个方法，建立作用于，然后函数调用自身实现创建
 */
function makep (dir) {
    // 分割出路路径，设置index记录当前路径偏移量(为了保证第一次使用slice方法可以截取的到值，index初始化值为1)
    let paths = dir.split('/')
    let index = 1;
    /**
     * @desc 创建目录方法
     * @param  {number}   index [当前遍历路径的偏移量]
     * @param  {Function} fn    [创建以后的回掉函数]
     * @return {[type]}         [description]
     *
     */
    function createDir (index, fn) {
        //判断如果index大于当前paths的length，则说明目录创建完毕，不在继续回调，并讲会调用函数触发
        if (index > paths.length) {
            return fn && fn()
        }
        // 根据index截取新的目录路径
        let newPath = paths.slice(0, index).join('/')
        // 使用fs.access方法读取目录，查看是否报错，如果报错，就直接创建
        // 如果没有报错，就回调自身，并将index++
        fs.access(newPath, err => {
            if (err) {//如果文件不存在 ，就会在这里创建newPath的目录
                fs.mkdir(newPath, err=>{
                    if(err) throw new Error(err)
                    createDir(index+1)
                })
            } else {
                // 如果当前吗剥存在，就调用自身
                createDir(index+1)
            }
        })
    }
    // 第一次调用
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
 *
 * 实现思路：
 *  1.拿到文件目录之后使用fs.readdirSync同步读取文件目录的内容
 *  2.遍历拿到的内容files
 *  3.使用psth.join拼接处当前文件路径，使用fs.stat读取文件
 *  4.判断当前file是文件还是文件目录
 *  5.如果是文件则直接删除
 *  6.如果是目录，则调自己，并将新拼接的路径传入函数(进入下一次循环)
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

/**
 * @description  promsie 实现异步删除目录
 * @param  {string} dir 需要删除的目录
 * 实现思路：
 *    1.拿到目录以后使用fs.stat读取当前目录
 *    2.判断是否是文件目录， 如果是，则回调自己，如果是文，就直接删除文件
 */
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
                // 如果dir是文件，则直接删除，并且把resolve作为回调函数
                fs.unlink(dir, resolve)
            }

        })
    })
}
rmPromise('a')

const fs = require('fs')
const path = require('path')

/**
 *
 * @desc 异步深度循环删除目录
 * @param {string} dir 需要删除的目录
 * @param {function} callback 回调函数
 *
 * 实现思路：
 * 1.读取文件目录拿到当前目录所有的files
 * 2.调用next方法，并从0开始遍历files
 * 3.遍历结束，调用callbanck
 */
function rmdir (dir, callback) {
fs.readdir(dir, (err, files) => {
    /**
     * @desc 内部循环遍历使用的工具函数
     * @param {Number} index 表示读取files的下标
     */
    function next(index) {
        // 如果index 等于当前files的时候说明循环遍历已经完毕，可以删除dir，并且调用callback
        if (index == files.length) return fs.rmdir(dir, callback)
        // 如果文件还没有遍历结束的话，继续拼接新路径，使用fs.stat读取该路径
        let newPath = path.join(dir, files[index])
        // 读取文件，判断是文件还是文件目录

        fs.stat(newPath, (err, stat) => {
            if (stat.isDirectory() ) {
                // 因为我们这里是深度循环，也就是说遍历玩files[index]的目录以后，才会去遍历files[index+1]
                // 所以在这里直接继续调用rmdir，然后把循环下一个文件的调用放在当前调用的callback中
                rmdir(newPath, () => next(index+1))
            } else {
                // 如果是文件，则直接删除该文件，然后在回调函数中调用遍历nextf方法，并且index+1传进去
                fs.unlink(newPath, () => next(index+1))
            }
        })
    }
    next(0)
})
}

 rmdir('a', () => {console.log('文件删除完毕')})


/**
 * 广度遍历删除文件
 */
const fs = require('fs')
const path = require('path')

// 同步删除

/**
 * @desc 同步广度删除
 * @param {string} dir 需要删除的目录
 *
 * 实现思路
 * 1.创建需要的变量，arr=> 保存所有的路径的文件池 current => 当前遍历到的路径 index => 记录比遍历的下标
 * 2.使用while循环，拿到所有的路径
 * 3.使用fs.stat判断，如果当前路径是一个目录，使用fs.readdirSync 读取所有文件内容，
 * 4.使用map函数映射files路经(拼接当前遍历到的carrent和file),
 * 5.添加到文件池中去
 */
function rmdir(dir) {
    let arr = [dir]
    let current = null
    let index = 0

    while(current = arr[index++]) {
        // 读取当前文件，并做一个判断，文件目录分别处理
        let stat = fs.statSync(current)
        //如果文件是目录
        if (stat.isDirectory()) {
            //读取当前目录，拿到所有文件
            let files = fs.readdirSync(current)
            // 将文件添加到文件池
            arr = [...arr, ...files.map(file => path.join(current, file))]
        }
    }
    //遍历删除文件
    for (var i = arr.length - 1; i >= 0; i--) {
        // 读取当前文件，并做一个判断，文件目录分别处理
        let stat = fs.statSync(arr[i])
        // 目录和文件的删除方法不同
        if (stat.isDirectory()) {
            fs.rmdirSync(arr[i])
        } else {
            fs.unlinkSync(arr[i])
        }
    }
}

rmdir('a')


/**
 * 广度遍历删除文件 异步删除文件
 */
const fs = require('fs')
const path = require('path')

/**
 * @desc 广度遍历删除文件目录
 * @param {String}     需要删除的目录
 * @param {FUnction}   任务完成以后执行的回调函数
 * 
 * 实现思路：
 * 1.创建文件池（arr），创建一个current对象，遍历的时候使用
 * 2.创建一个next方法，遍历查找文件和读取文件目录使用
 * 3.创建一个rm方法，主要用来删除文件
 */
function rmdir (dir, callback) {
    var arr = [dir] //文件池，保存所有的文件
    var current = null //遍历文件的时候保存临时文件

    /**
     * 
     * @param {Number} index 表示遍历文件池的下标 
     */
    function next (index) {
        current = arr[index] //拿到当前遍历的值
        if (!current) return rm(index-1) //判断是否为空，为空的话说明已经遍历结束，开始删除文件
        //遍历删除所有文件和目录
        //读取文件，对文件和文件目录进行不同的操作
        fs.stat(current, (err, stat) => {
            if (stat.isDirectory()) {
                //如果是文件目录就读取文件目录的内容
                fs.readdir(current, (err, files) => {
                    //映射出新的路径，然后添加到文件池
                   var temp = files.map( file => path.join(current, file))
                    arr = [...arr, ...temp]
                    //遍历文件池下一个文件
                    next(index+1)
                })
            } else {
                //如果是文件，则直接遍历文件池下一个文件
                next(index+1)
            }
        })

        /**
         * @desc 删除目录方法
         * @param {Number} index 需要删除的文件的标，
         * 
         * 实现思路：
         * 1.通过index拿到当前需要删除的文件[文件目录]，判断是否为空，为空就直接清空文件池，调用callback
         * 2.如果不为空，则使用fs.stat读取文件，查看是文件还是文件目录，
         * 3.调用不同的方法删除该文件,并且调用自身，index在-1以后传入
         * 
         */
        function rm (index) {
            current = arr[index]
            //如果为空，说明文件删除完毕，调用callback
            if (!current) {
                arr = null;
                return callback && callback()
            }
            //如果文件不为空，则读取文件类型，然后调用不同的方法删除文件[文件目录]
            fs.stat(current, (err, stat) => {
                if (stat.isDirectory()) {
                    fs.rmdir(current, err => rm(index-1))
                } else {
                    fs.unlink(current, err => rm(index-1))
                }
            })
        }
    }
    //第一次开始遍历文件目录
    next(0)
}
rmdir('a', ()=>{console.log('文件删除完毕')})
