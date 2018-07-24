# PhantomJS的使用

### 简介

- phantomjs 简单来说是一个基于 WebKit 的“无头浏览器”环境。对“无头”，你可以理解成没有一个前端的 GUI 界面，所有的东西都在后台运行。
- phantomjs 在“无头”界的名声，是源于从 WebKit 里得到的对 DOM / JS 的完整支持。
- 一个纯后台的，完整功能的浏览器，这东西就有很多可以想像的空间了 —— 抓取，测试等。

### 安装

- [下载phantomjs](http://phantomjs.org/download.html )

- Windows 和 OS X ，官方都直接提供了二进制包。但是， Linux ，没有。

- 通过 `phantomjs -h` 能看到支持的命令行参数。 

- 配置环境变量(win)

  -  下载完成后解压，单独放在一个文件夹里，如：`D:\Program Files (x86)\phantomjs-2.1.1-windows`；

  - 为方便使用，需设置环境变量，由于解压后`phantomjs.exe`可执行文件在之前文件夹的 `bin` 目录下，所以将`D:\Program Files (x86)\phantomjs-2.1.1-windows\bin`添加到环境变量中；
     （设置环境变量：控制面板->系统和安全->系统->高级系统设置->环境变量->编辑用户变量Path->将';D:\Program Files (x86)\phantomjs-2.1.1-windows\bin'添加到最末端即可）

  - win+R，输入cmd打开控制台，输入`phantomjs -v`,若输出了版本号，则证明安装成功了。 

### 使用

- 安装的时候解压的文件夹中的example目录下有很多官方的例子，那么我们该如何运行这些例子呢，看了官方的文档，直接命令行工具中输入`phantomjs hello.js`,但却报错：Can't open 'helloworld.js',接着又踩了另一个坑,输入了`phantomjs example/hello.js`,依旧报错
- **那么正确的运行方法是什么呢？原来文件需要绝对路径** 
  - 绝对路径（即`phantomjs + 文件的绝对路径`） 例如：`phantomjs D:\Program Files (x86)\phantomjs-2.1.1-windows\examples\hello.js`
  - 在文件所在路径下打开cmd，然后执行`phantomjs hello.js` 
  - 更多使用实例，请参考官方文档[http://phantomjs.org/api/](http://phantomjs.org/api/)

### 基本概念

- phantomjs 这个东西，最好单纯地把它看成是一个独立的工具，虽然它要执行的目标源文件，是需要用 nodejs 来写的，但它跟 nodejs 的关系也仅此而已。
- phantomjs 跟系统的 nodejs 无关，跟系统的 npm 也无关。不过 nodejs 在语法层面的东西它是没有问题的，比如 `require` 。 
-  phantomjs 中也没有 nodejs 的官方模块，phantomjs 自己做的一些 API ，从文档来看，<http://phantomjs.org/api/> ，只提到了 process / filesystem / system 。 
- 既然 phantomjs 跟系统的 nodejs 无关，那么自然地想把它无缝融合进 nodejs 相关的方案中其实不那么容易的。按官方的说法与支持的态度 —— 进程间通信，这样搞随便把不同语言的问题也解决了。 
