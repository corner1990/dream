### 将当前包挂到全局
- 新建bin目录，并在bin目录新建执行文件
- 在`package.json`中配置执行文件
```
// 添加如下内容， 其中www.js为我们配置的执行文件
 "bin": {
    "my-server": "bin/www.js"
  }

// www.js 开头必须是下面这句 指定执行环境为node
#! /usr/bin/env node

// 每次修改完配置以后，都需要重新使用 npm link 重新挂在
```
- 进度当前包的跟目录，使用`npm link` 将包挂在到全局
