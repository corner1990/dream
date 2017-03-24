## nodejs 简介

### 客户端的JavaScript是怎样的

- 什么是 JavaScript？
  + 脚本语言
  + 运行在浏览器中
  + 一般用来做客户端页面的交互（Interactive）

- JavaScript 的运行环境？
  + 是不是运行在浏览器呢？
  + 不够严谨
  + 运行在浏览器内核中的 JS 引擎（engine）

- 浏览器中的 JavaScript 可以做什么？
  + 操作DOM（对DOM的增删改、注册事件）
  + AJAX/跨域
  + BOM（页面跳转、历史记录、console.log()、alert()）
  + ECMAScript

- 浏览器中的 JavaScript 不可以做什么？
  + 文件操作（文件和文件夹的CRUD）
  + 没有办法操作系统信息
  + 由于运行环境特殊（我们写的代码是在不认识的人的浏览器中运行）

- 在开发人员能力相同的情况下编程语言的能力取决于什么？
  + -语言本身？-
  + 语言本身只是提供定义变量，定义函数，定义类型，流程控制，循环结构之类的操作
  + 取决于运行该语言的平台（环境）
  + 对于JS来说，我们常说的JS实际是ES，大部分能力都是由浏览器的执行引擎决定
  + BOM和DOM可以说是浏览器开放出来的接口
  + 比如：Cordova中提供JS调用摄像头，操作本地文件的API

  + Java既是语言也是平台
  + Java运行在Java虚拟机（跨操作系统）
  + PHP既是语言也是平台（跨操作系统）

  + C#语言平台：.NET Framework（Windows）
  + C#可以运行在MONO这样的平台
  + 因为有人需要将C#运行在Linux平台，所有出现了MONO


- JavaScript 只可以运行在浏览器中吗？
  + 不是
  + 能运行在哪取决于，这个环境有没有特定平台


### 什么是Node

- Node 就是 JavaScript 语言在服务器端的运行环境
- 所谓“运行环境（平台）”有两层意思：
  + 首先，JavaScript 语言通过 Node 在服务器运行，在这个意义上，Node 有点像 JavaScript 虚拟机；
  + 其次，Node 提供大量工具库，使得 JavaScript 语言与操作系统互动（比如读写文件、新建子进程），在这个意义上， Node 又是 JavaScript 的工具库。  

## 环境配置  

SX： [darwin](http://npm.taobao.org/mirrors/node/v5.7.0/node-v5.7.0.pkg)
  + Windows：
    * [x64](http://npm.taobao.org/mirrors/node/v5.7.0/node-v5.7.0-x64.msi)
    * [x86](http://npm.taobao.org/mirrors/node/v5.7.0/node-v5.7.0-x86.msi)
- 安装操作：
  + 一路*Next*


#### 更新版本

- 操作方式：
  + 重新下载最新的安装包；
  + 覆盖安装即可；
- 问题：
  + 以前版本安装的很多全局的工具包需要重新安装
  + 无法回滚到之前的版本
  + 无法在多个版本之间切换（很多时候我们要使用特定版本）



#### NVM工具的使用

> Node Version Manager（Node版本管理工具）

由于以后的开发工作可能会在多个Node版本中测试，而且Node的版本也比较多，所以需要这么款工具来管理


#### 安装操作步骤

1. 下载：[nvm-windows](https://github.com/coreybutler/nvm-windows/releases/download/1.1.0/nvm-noinstall.zip)
2. 解压到一个全英文路径
3. 编辑解压目录下的`settings.txt`文件（不存在则新建）

  + `root 配置为当前 nvm.exe 所在目录`
  + `path 配置为 node 快捷方式所在的目录`
  + `arch 配置为当前操作系统的位数（32/64）`
  + `proxy 不用配置`

4. 配置环境变量 可以通过 window+r  : sysdm.cpl

  + `NVM_HOME = 当前 nvm.exe 所在目录`
  + `NVM_SYMLINK = node 快捷方式所在的目录`
  + `PATH += %NVM_HOME%;%NVM_SYMLINK%;`
  + 打开CMD通过`set [name]`命令查看环境变量是否配置成功
  + PowerShell中是通过`dir env:[name]`命令

5. NVM使用说明：

  + https://github.com/coreybutler/nvm-windows/

6. NPM的目录之后使用再配置


##### 配置Python环境

> Node中有些第三方的包是以C/C++源码的方式发布的，需要安装后编译
> 确保全局环境中可以使用python命令




###### 环境变量的概念

> 环境变量就是操作系统提供的系统级别用于存储变量的地方

- Windows中环境变量分为系统变量和用户变量
- 环境变量的变量名是不区分大小写的
- 特殊值：
  + PATH 变量：只要添加到 PATH 变量中的路径，都可以在任何目录下搜索



###### Windows下常用的命令行操作

- 切换当前目录（change directory）：cd
- 创建目录（make directory）：mkdir
- 查看当前目录列表（directory）：dir
  + 别名：ls（list）
- 清空当前控制台：cls
  + 别名：clear
- 删除文件：del
  + 别名：rm

> 注意：所有别名必须在新版本的 PowerShell 中使用  
> 

#### [NRM](https://github.com/Pana/nrm)   Node 镜像管理工具 
#### [ICONV](https://www.npmjs.com/package/iconv) 编码转换插件

>以下的笔记中$ 后边的都是命令 

        node 编辑器 https://code.visualstudio.com/docs/?dv=win
### Node 命令的基本用法  
-   REPL环境  全称（read，eval，print，loop）  

        接受用户输入 => 执行用户输入  =>  打印结果到控制台 => 循环下一次   
        $ node 进入   
        $ node --use_strict  
        $ .exit 退出环境  

-   执行脚本    
        $ node -e 'console.log("hello world")'  

-   运行脚本    
    +   $ node index.js
    +   $ node path/index.js
    +   $ node path/index
    
-   查看帮助 
    +   node --help 

### 全局对象  
-   globa  
        类似于客户端JavaScript环境中的window
-   process  
        用于获取当前Node进程信息，一般用于获取环境变量之类的信息  
-   console  
        Node中内置的console模块，提供操作控制台的输入输出功能，常见的使用法师月客户端类似

### 异步操作  
- 异步的定义  
  +    现实生活中的打电话
  +    发短信
  +    程序中的setTimeout(),$ajax()
  +    文件操作 

- 什么是I/O
        可以理解为从输入到输出之间的转化过程
-   node采用chrome V8引擎处理JavaScript脚本，V8最大的特点就是单线程运行，一次只能运行一个任务  
-   Node 大量采用了异步编程（asynchronous operation），即任务不是马上执行，而是常在队列的尾部，等前面的任务执行完后再执行。
-   提到代码的响应能力

### 回调函数的设计
- 如果函数需要回调，一定是在参数的最后边  
- 错误优先的的回调函数  
  +   因为之后的操作大多数都是一步的方式，无法听过trycatch捕获异常
  +   错误优先的回到函数
<br>

        约定第一个参数为上一步的错误对象 

###  异步回调的问题  
- 相比较传统的代码
  + 异步事件驱动到的代码
  + 不容易阅读
  + 不容易调试
  + 不容易维护
  + 有可能会出现回到黑洞（缺点）  

### 进程和线程  
- 进程 （进行中的程序）
- 进程启动以后会默认启动一个线程（执行代码）  

### 多线程的问题  

- 多线程都是假的，
- 线程之间共享某些数据，同步某个状态很麻烦
- 最致命的：
    + 创建线程耗费
    + 线程数量有限，
    + CPU 在不同线程之间的转换，有个上下文转换，这个转换非常耗时

### 事件驱动  

- node中将所有的阻塞操作交给了内部实现的线程池  
- node 本身主线程主要就是不断地往返调度 


### 非阻塞的优势  
- 提高代码响应效率  
- 充分利用单核CPU的优势
- 改善I/O的不可预测带来的问题
- 如何提高一个人的工作效率  

### Node模块化结构  

- node采用的模块化结构是按照CommonJS规范
- 模块与文件是一一对应关系，即加载一个模块，实际上就是加载对应的一个模块文件

### 模块化开发的流程

- 创建模块  新建文件 
- 导出成员 module.exports = {}
- 载入模块 var calc = require('./xxx.js');
- 使用模块  calc.add(1,2)

### 模块内全局变量（伪）

- 我们在之后文件操作中必须使用的绝对路径 
- __dirname
    +  用于获取当前文件所在的目录的完整路径
    +  在REPL环境无效

- __filename
    + 用来获取当前文件的完整路径
    + 在REPL环境同样无效   

- module 
    + 模块对象 
    + node内部提供一个Module构建函数。所有模块都是Module的实例
    + 载入一个模块就是构建一个Module实例
    + module.id 模块的识别符 通常是带有绝对路径的模块文件名
    + module.filename 模块定义的文件的绝对路径
    + module.loaded 返回一个布尔值，表示模块是否完成加载
    + module.parent 返回一个对象，表示调用该模块的模块 
    + module.children 返回一个数组，表示该模块要用到的其他模块
    + module.exports 表示模块对外输出的值
- exports
    + 映射到module.exports的别名
- require  
    + require.cache
    + require.extensions
    + require.main
    + require.resolve()

### 模块的定义

- 一个新建的js文件就是一个模块
- 一个合格的模块是有导出成员的，否则模块就失去了定义的价值
- 模块内部是一个独立（封闭）的作用域（模块与模块之间不会有冲突）
- 模块之间必须通过导入或者导出的方式协同
- 导出方式
    + exports.name =value
    + module.exports = {name:value}

### 模块内部的私有空间 

- 每一个模块的内部都是一个私有的空间  

### require 加载文件的规则  

- require 加载文件是可以省略扩展名
    + require('./module')
    + //此文件按js文件执行
    + require('./module.js')
    + 此文件按JSON文件解析
    + require('./module.json')
    + //此文件预编译好的C++模块执行
    + //载入目录优先载入目录中的package.json中的main执行的文件
    + require('')

### 核心模块  
[Node API](https://nodejs.org/en/docs/)

- 核心模块的意义
    + 如果只是在服务端运行JavaScript代码，意义并不大，因为无法实现任何功能(读写文件，访问网络)
    + Node的用处在于他本身还提供的一系列功能模块，用于操作系统互动
    + 这些核心的功能模块在Node中内置

- 内置如下模块  
    + path：处理文件路径 
    + fs : 操作（CRUD）文件系统
    + child_process : 新建子进程
    + util ： 提供一系列的实用小工具
    + http ：提供HTTP服务器功能
    + url : 用于解析URL
    + querystring ： 解析URL中的查询字符串
    + crypto ： 提供加密解密功能
    + 其他

### NPM 包管理工具  

####[npm](https://www.npmjs.com/)  

- 包的概念

      包（package）：就是将一些预先设计好的功能或者说API封装到一个文件夹，提供给开发者实用；    

- 包的加载机制 
    + 优先在系统核心（优先级最高）的模块中查找
    + 然后再到当前项目中node_modules 目录中查找  

- NPM 概述  

    + 可以通过 NRM ： Node Registry Manager
    + NPM是随同NodeJS一起安装的包管理工具，能解决NodeJS代码部署上的很多问题，常见的使用场景有以下几种：
    + 允许用户从NPM服务器下载别人编写的第三方包到本地使用。
    + 允许用户从NPM服务器下载并安装别人编写的命令行程序到本地使用。
    + 允许用户将自己编写的包或命令行程序上传到NPM服务器供别人使用。  

- NPM 安装  

    + 使用命令安装  `$ npm install npm -g` 或者淘宝镜像 `$ cnpm install npm -g`  
    + 然后使用 `$ npm -v` 查看是否安装成功  

- NPM 配置 全局目录 

    + `$ npm config set prrfix [pathtonpm]`
    + 将npm目录配置到其他目录时，必须将该目录放到环境变量中，否则无法再全局使用  

- [NPM 常用命令](https://docs.npmjs.com/)  
  
    + `$ npm config`
    + `$ npm init`
    + `$ npm info`
    + `$ npm search`
    + `$ npm install`
    + `$ npm uninstall`
    + `$ npm list`
    + `$ npm outdated`
    + `$ npm update`
    + `$ npm run`
    + `$ npm cache [clean | ls]`

### path 模块操作  

- 在文件操作过程中，都（必须）使用物理路径（绝对路径）
- path 模块提供了一系列与路径相关的 API  
    + `$ path.join([p1],[p2],..)` => 链接过个路径
    + `$ path.basename(p,ext)` => 获取文件名
    + `$ path.dirname(p)` => 获取文件夹路径
    + `$ path.extname(p)` => 获取文件扩展名
    + `$ path.frmat(obj)` 和 `path.parse（p）` 
    + `$ path.delimiter` => 获取环境变量分隔符
    + `$ path.relative(from,to)`  => 获取from 到 to 的相对路径
```javascript
console.log('join用于拼接多个路径部分，并转化为正常格式');
const temp = path.join(__dirname, '..', 'lyrics', './友谊之光.lrc');
console.log(temp);

console.log('获取路径中的文件名');
console.log(path.basename(temp));

console.log('获取路径中的文件名并排除扩展名');
console.log(path.basename(temp, '.lrc'));

console.log('====================================');

console.log('获取不同操作系统的路径分隔符');
console.log(process.platform + '的分隔符为 ' + path.delimiter);

console.log('一般用于分割环境变量');
console.log(process.env.PATH.split(path.delimiter));

console.log('====================================');

console.log('获取一个路径中的目录部分');
console.log(path.dirname(temp));

console.log('====================================');

console.log('获取一个路径中最后的扩展名');
console.log(path.extname(temp));

console.log('====================================');

console.log('将一个路径解析成一个对象的形式');
const pathObject = path.parse(temp);
console.log(pathObject);

console.log('====================================');

console.log('将一个路径对象再转换为一个字符串的形式');
// pathObject.name = '我终于失去了你';
pathObject.base = '我终于失去了你.lrc';
console.log(pathObject);

console.log(path.format(pathObject));

console.log('====================================');

console.log('获取一个路径是不是绝对路径');
console.log(path.isAbsolute(temp));
console.log(path.isAbsolute('../lyrics/爱的代价.lrc'));

console.log('====================================');

console.log('将一个路径转换为当前系统默认的标准格式，并解析其中的./和../');
console.log(path.normalize('c:/develop/demo\\hello/../world/./a.txt'));

console.log('====================================');

console.log('获取第二个路径相对第一个路径的相对路径');
console.log(path.relative(__dirname, temp));

console.log('====================================');

console.log('以类似命令行cd命令的方式拼接路径');
console.log(path.resolve(temp, 'c:/', './develop', '../application'));

console.log('====================================');

console.log('获取不同平台中路径的分隔符（默认）');
console.log(path.sep);

console.log('====================================');

console.log('允许在任意平台下以WIN32的方法调用PATH对象');
// console.log(path.win32);
console.log(path === path.win32);

console.log('====================================');

console.log('允许在任意平台下以POSIX的方法调用PATH对象');
console.log(path === path.posix);
```

源码地址：
https://github.com/nodejs/node/blob/master/lib/path.js

### 同步或异步调用  

- fs模块对文件的几乎所有的操作都有同步调用和异步调用的形式
- 例如：readFile() 和 readFileSync()
- 区别：
    + 同步调用会阻塞代码的执行，异步则不会
    + 异步调用会将读取任务下达到任务队列，知道任务执行完成才回调
    + 异常处理方面，同步必须使用try-catch 方式，异步可以通过回调函数的第一个参数  

```javascript
console.time('sync');
try {
  var data = fs.readFileSync(path.join('C:\\Users\\iceStone\\Downloads', 'H.mp4'));
  // console.log(data);
} catch (error) {
  throw error;
}
console.timeEnd('sync');

console.time('async');
fs.readFile(path.join('C:\\Users\\iceStone\\Downloads', 'H.mp4'), (error, data) => {
  if (error) throw error;
  // console.log(data);
});
console.timeEnd('async');
```

### buffer  

      读取文件是没有指定编码，默认是utf8编码

### 文件读取  

- 异步文件读取   

     `fs.readFile(file[,option],callback(err,data))`  

- 同步文件读取  

    `fs.readFileSync(file[,option])`  

- 文件流的方式读取  
    ```
  fs.readStream(path[,options])

  const path = require('path');
  const fs = require('fs');
  let fireName = path.join(__dirname+'/../note/crumb.md');

  var str  = fs.createReadStream(fireName)
  var data = '';
  str.on('data',(chunk)=>{
    data+=chunk;
  })

  str.on('end',()=>{
    //通知结束  此时data是完整文档
    console.log(data)
  })
    ```


### 文件写入   

    为了确保操作没有额外的问题，一定使用绝对路径的方式  

- 异步文件写入  
    
     `fs.writeFile(file,data[,option],callback(err))`

- 同步文件写入  

     `fs.writeFileSync(file,data[,option])`

- 流式文件写入    

      `fs.createWriteStream(path[,option])`  

- 文件默认写入是覆盖  
- 异步追加  

  `fs.appendFile(file,data[,opotions],callback(err))`

- 同步追加  

  `fs.appendFileSync(file,data[,options])`  

### 其他文件操作  

- 重命名文件或目录

  `fs.rename(oldPath,newPath,callback)`  
  `fs.renameSync(oldPath,newPath)`
- 删除文件  

  `fs.unlink(path,callback(err))`  
  `fs.unlinkSync(path)`

### 目录操作 
- 创建一个目录  
    + fs.mkdir(path[,model],callback)
    + fs.mkdirSync(path[,model])
- 删除一个空目录  
    + fs.rmdir(path,callback)
    + fs.rmdirSync(path,callback)
- 读取一个目录  
    + fs.readdir(path,callback(err,files))
    + fs.readdirSync(path) //=> files  

### 文件监视  
- 利用文件监视实现自动markdown文件转换  
    + [marken](hhttps://github.com/chjj/marked)
    + [Browsersync](https://github.com/Browsersync/browser-sync)

- 实现思路  
    + 利用`fs`模块的文件监视功能监视指定的MD文件 
    + 当文件发生变化后借助`marked`to`html`功能将改变后的MD文件转换为HTML  
    + 再将得到的HTML替换到模板中
    + 最后利用Browse人死于农村实现浏览器自动刷新  
        browsersync需要用到Python
