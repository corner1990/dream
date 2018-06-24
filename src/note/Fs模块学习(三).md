# Fs模块学习(三)

> 这里主要是进一步使用其他方法删除目录，提高自己对fs模块提供的api的熟悉度

### 异步删除（深度模式）

> 核心思想就是遍历完成某一个目录以后，在遍历另外一个目录，最后开始冒泡删除

```javascript
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

```

### 同步删除目录(广度模式)

> 核心思想：遍历目录，把所有的路径都放入一个程序池，然后循环删除所有文件

```javascript
/**
 * 广度遍历删除文件
 */
const fs = require('fs')
const path = require('path')
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

```

### 广度删除（异步调用）

> 实现思路和同步模式一样，只是讲调用方式改成了异步

```javascript
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
```

### 简单的学习回顾

> 之前就学习了node，始终感觉写的不扎实，运用起来不是很熟练，最近决心花一段时间好好的提高一下自己的node水平，以上内容仅仅是个人学习和观点，如果有更好的思路，请和我分享....

