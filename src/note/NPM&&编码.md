# NPM && 编码

## NPM

> 安装node之后只能使用Node语言特性以及核心函数，我们还需要一个系统来下载，安装和管理第三方模块。在Node看这个系统被称为Node的包管理器(Node Package Manager => NPM)

- npm提供的功能

  - 公共注册服务，用户可以把自己的写的包上传到服务器上
  - 命令行工具，用户可以通过npm命令把别人的包下载到自己的电脑上，还可以自己的模块依赖的其他模块
  - 搜索第三方报的地址

  ```
  https://www.npmjs.com/
  ```

### npm 安装包

  - 打开终端或者命令行工具执行一下命令执行安装依赖的模块

  ```
  npm install <package-name>
  npm i mime
  //此命令会从服务器下载此模块到当前目录下的node_modules目录下，如果node_modules目录不存在则会创建一个，也可以安装特定的版本
  
  npm install <package name>@<version spec>
  npm i mime@2.1
  
  //简写 
  npm i mime@2.1
  ```

  

### npm 卸载包

```javascript
npm uninstall <package-name>
```
### npm 更新包

- 我们可以通过一下命令更新包

```javascript
npm update <package-name>
```
### 包的安装模式

- 本地安装模式

> 默认情况下安装命令会吧对应的包安装套当前目录下，这叫做本地安装。
>
> 如果暴力有可执行文件NPM会把可执行文件安装到`./node_modules/.bin` 目录下，本地安装的模块只能在当前目录和当前目录的子目录里面使用

- 全局安装如果希望安装的包能够在计算机的所有目录下都能使用，就需要全局安装

```
npm install <package-name> -g
```

- 在全局安装的模式下，npm会把包安装到全局目录，通过此命令可以查看当前全局目录的位置

```
npm root -g
C:\Users\Administrator\AppData\Roaming\npm\node_modules //这是目录
```

- 如果需要修改全局安装目录，可以使用一下命令

```
//加入想修改全局目录为： D:\node.js\node_global
npm config set prefix “D:\node.js\node_global”
```

- 如果包里有可执行文件，会把执行的文件安装到node_modules的上一级目录中。

```
C:\Users\Administrator\AppData\Roaming\npm\
```

- 全局安装的一般是需要在任意目录下面执行的命令比如 `babel`

```
npm install babale-cli -g
```

- 如果全局安装的命令不能用则可能是没有正确配置用户变量`PATH`,需要在系统变量中为PATH变量添加全局请按照目录
- 默认情况下在全局安装目录下面的模块是不能在任意文件夹下直接加载的，如果想要在任意目录下面直接加载，需要在系统变量中新建一个名为`NODE_PATH`的变量，它的值为全局安装目录下的`node_modules`所在位置。 

### 注册，登陆和发布模块

- 注册npm账号： [https://www.npmjs.com/](https://www.npmjs.com/)
- 登陆 `npm login`
- 发布 `npm publish`

## yarn

> Yarn 是一个依赖管理工具。它能够管理你的代码，并与全世界的开发者分享代码。 代码是通过包（有时也被称为模块）进行共享的。 在每一个包中包含了所有需要共享的代码，另外还定义了一个`package.json`文件，用来描述这个包。 

- 初始化一个新的项目

```
yarn init
```

- 添加一个依赖包

```
yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]
```



- 更新一个依赖包

  ```
  yarn upgrade [package]
  yarn upgrade [package]@[version]
  yarn upgrade [package]@[tag]
  ```

  

- 删除一个依赖包

  ```
  yarn remove [package]
  ```

  

- 安装所有的依赖包

  ```
  yarn || yarn install
  ```

- 参考[yarn](https://yarn.bootcss.com/)



























