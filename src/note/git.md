# 流行框架第二天：Git与Angular入门

## 复习

- Node Node.js --- 类似一个操作系统
  + 一个JS的运行环境
  + 主要用于开发Web应用程序（回想登陆的例子）
  + 很多的前端开发工具都是基于node这个平台
  + 所用的工具就相当于一些软件

- NVM （可选的）
  + Node Version Manager(Node的版本管理工具)
  + 因为node的版本比较多，很多时候我们可能依赖多个版本，并要求自由切换
  + 使用
    * nvm use [对应的版本号] [平台架构（如果是32系统需要写32,64位不用管）]
    * nvm install <version> [arch]  安装
    * nvm uninstall <version> 卸载
    * nvm list 查看已经安装版本
  + 官网
    * https://github.com/coreybutler/nvm-windows

- NPM 
  + node package manager(node的包管理工具)
  + npm管理包非常方便，我们只需要记住使用哪个包就可以了
  + 使用
    - npm install xxx 
    - 安装一个包到项目本地，必须要联网
    - 安装完成过后项目根目录下会多一个node_modules文件夹，所有的下载下来的包全部在里面
    
    - 由于需要记录项目依赖哪些东西，所以需要一个配置文件“package.json”，可以通过npm init命令生成
    - 以后安装包的时候将其--save
    
    - --save就是将我们安装的包名字和包版本记录到配置文件中的dependencies节点中
    - --save-dev
    - 项目依赖分两种，一个就是普通的项目依赖比如bootstrap，还用一种只是开发阶段需要用的，这种属于开发依赖比如gulp，开发依赖最终记录在devDependencies节点里面

    - npm uninstall xxx --save

    - npm install xxx -g(全局安装包)
      + 如果你安装的是一个工具，工具要在每一个地方都能用，这种情况下一般全局安装。
    
- Bower
  + Web sites are made of lots of things ― frameworks, libraries, assets, and utilities. Bower manages all these things for you.
  + Bower就是用来管理项目中所有的依赖，主要用于Web页面开发时使用的包管理，比如jquery，bootstrap
  + 
  > 重复的轮子太多，抓住轮子与轮子之间的共性
  > 

- Gulp  FIS3
- http://www.ydcss.com/archives/94

- msi - microsoft installer 微软安装器

## GIT

### 什么是GIT

- 是一个源代码管理工具
- 在一个项目中，凡是由开发人员编写的都算是源代码
- 源代码有必要管理起来？
- 让源代码可以被追溯，主要记录每次变更了什么，谁主导这次变化
- 人为的维护比较麻烦，
- GIT是Linux之父当年为了维护管理Linux的源代码写的一个工具
- Git 之前 很多使用 svn vss tfs hs ......


- https://guides.github.com/

### 安装GIT

- git命令行工具
- 基于git命令行的一个客户端软件（提供一个界面去管理源代码）

### GIT命令操作

- 初始化一个本地GIT仓储

```shell
cd 当前项目目录
git init // 初始化一个本地的仓库
```

> 就是在本地文件夹中添加了一个.git的文件夹用于记录所有的项目变更信息

- 查看本地仓储的变更状态

git status
用于查看本地仓储的状态
第一次查看，显示的是一坨没有被跟踪的文件

git status -s // -s 是输出简要的变更日志

- 添加本地暂存（托管）文件

git add
可以将一个没有被跟踪的文件添加到跟踪列表

类似于node_modules这种性质的文件是不应该被跟踪

- 添加本地GIT忽略清单文件

在代码库文件夹的根目录添加一个.gitignore文件
此文件用于说明忽略的文件有哪些

- 提交被托管的文件变化到本地仓储

git commit
将本地的变化提交的本地的仓库文件夹归档
一般在有了一个小单元的整体变化后再提交

- 对比差异

git diff
可以用于对比当前状态和版本库中状态的变化

- 提交日志

git log 
可以查看提交日志

- 回归到指定版本

git reset --hard

- 为仓储添加远端（服务器端）地址

- 将本地仓储的提交记录推送到远端的master分支

- 拉取远端master分支的更新记录到本地

- 回归到指定版本

### GITHUB基本使用

- https://github.com/
- GITHUB是一个GIT服务的提供商，
- 
- 提出社交化编程

http://zoomzhao.github.io/code-guide/
https://github.com/jobbole/awesome-javascript-cn
https://github.com/jobbole/awesome-css-cn


- GIT分支

git remote add origin https://github.com/xxx/xx
链接一个github并创建一个版本库
git git push -u origin master 
将本地git库的文档推送到github origin库 master分之上
git pull origin master
从origin版本库的master分值获取线上代码

git branch 查看当前版本库的分支
git branch xx 创建分支
git checkout xx 切换分支

需要使用git托管静态页面的需要新建一个分支 gh-pages
然后使用git push -u origin gh-pages







## Angular入门

### 简介

- 知识储备
- 什么是Angular
  + 快速构建Web应用程序
  + 单页面应用程序
- Angular的特性
- 为什么要用Angular
  + 让Web应用程序开发更简单，更快捷
- 带领前端进入MV*的时代

### 开始使用
  
- 引用Angular
  + 下载
  + bower
  + npm
- 基本使用