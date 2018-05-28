//模块分为三个大类：
//先不考虑第三方模块
//核心模块 内置模块
//文件模块 我们自己写的(自定义模块)

//fs里边有一个新增的 判断文件存不存在 fs.access
//如果找不到哦啊文件会抛出一个错误，如果找到了，就不会发生任何异常
const fs = require('fs')

fs.accessSync('./1.txt');

//解决路径问题
const path = require('path')

//resolve方法可以给他一个文件名，他回根据当前运行的路径，拼出一个绝对路径
//__dirname：当前文件所在的文件的路径，他和cwd的有区别

// console.log(path.resolve('./1.txt')); //解析绝对路径
// console.log(path.resolve(__dirname, '1.txt'));
// path.join : 拼接路径使用，可以传递多个参数
// console.log(path.join('a', 'n')); 

// 获取基本路径
// path.basename: 经常使用，获取去除了后缀名的名字
// console.log(path.basename('1.txt', '.txt'));

// 获取文件的后缀名(最后一个.后边的内容)
// console.log(path.extname('1.txt'));

// console.log(path.posix.delimiter) //win下得到的是; mac&linux下是:

// console.log(path.sep); //获取路径分割符： win下是\ Linux下是/

// vm 虚拟机 模块 runinThisContext

let vm = require('vm') //eval是依赖于环境的
var a = 1;
// vm.runInThisContext('console.log(a);');
// eval('console.log(a);')