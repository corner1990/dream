### 手动配置热更新
```javascript
// 手动出发热更新
if (module.hot) {
//  module.hot.accept()
// 指定某一个文件自动更新
 module.hot.accept('a.js', function () {
     console.log('hot update')
 })

}

// 抽离样式侯不能实现热更新
// 目前的解决方案就是开发环境下关闭抽离css
// 一下是配置
// module
rules: [
            {
                test: /\.less$/i,
                use: ExtractTextWebpackPlugin.extract({
                    use: [ 'css-loader', 'less-loader' ],
                    fallback: 'style-loader' // 在这里配置使用style-loader
                })
              },
        ]
// plugin
new ExtractTextWebpackPlugin({
            filename: 'css/index.css',
            disable: true, // 配置禁用
        })

// 我们可以根据环境变量,来动态切换该插件是否启用
```
### 跟新环境变量`cross-env`
> 可以跨平台修改环境变量
```javascript
// 在我们运行命令的时候调用, 即package.json中
 "scripts": {
    "dev": "cross-env NODE_ENV=development-test webpack-dev-server",
    "build": "cross-env NODE_ENV=production-test webpack"
  }

// 然后我们在webpack.config.js中可以通过process拿到变量
let isDev = process.env.NODE_ENV == 'development-test'

// 使用这个插件注入一个全局的名字
// 然后我们就可以在任何地方拿到__DEV__来做判断条件
new webpack.DefinePlugin({
    __DEV__: isDev
}),

// 任意地方可以进行如下判断
if (__DEV__) consle.log('开发')
else console.log('生产')
```
### webpack处理图片
```javascript
// 安装file-loader url-loader
// html 引入图片需要依赖html-withimg-loader
{
    rules: [
            {// css 引入图片配置为相对路径,使用publicPath
                test: /\.less$/i,
                use: ExtractTextWebpackPlugin.extract({
                    use: [ 'css-loader', 'less-loader' ],
                    fallback: 'style-loader',
                    publicPath: '../' // 配置相对路径
                })
            },
            {
                test: /\.(png|gif|jpg)$/i,
                use: [
                    {// js引入图片
                        loader: 'url-loader',
                        options: {
                            limit: 5, // 超过5字节, 就会调用file-loader打包一个真实的文件
                            outputPath: 'images/', // 图片输出路径
                        }
                    }
                ]
            },
            {// 配置html里引用图片
                test: /\.html$/i,
                use: 'html-withimg-loader'
            }
        ]
}
```

### 简单的js处理配置
> 有几个常用的依赖模块
- `babel-core` 核心包
- `babel-loader` 转化js
- `babel-env`将es6转码为es5
- `babel-preset-env`草案里的
- `babel-preset-stage-0` 编译高级语法
- `babel-preset-react` 编译react
```javascript
{
      rules: [
            {
                test: /\.jsx$/i,
                // 如果我们把所所有的包都编译，会导致文件体积很大，
                // 所以我们会使用exclude排除某个目录不被编译，include，指定引用那个目录
        
                exclude: /node_modules/,
                include: /src/,
                use: [
                    {
                        loader: 'babel-loader',
                        // // 通常我们不会这么写，我们配置babel-loader以后，插件会自动查找根目录下的.babelrc
                        // options: {
                        //     // 这里的顺序和css一样，从后到前
                        //     preset: ['env', 'stage-0', 'react']
                        // }
                    }
                ]
            }
}
// .babelrc 内容
{
  "presets": [
    "env",
    "react",
    "stage-0"
  ],
  "plugins": [
    "transform-class-properties",
    "transform-decorators",
    "transform-react-constant-elements",
    "transform-react-inline-elements"
  ]
}

```

### `reslove`配置
> 这里可以配置很多东西，比如别名，省略后缀名等...

```javascript
{
     resolve: {
        // 别名
        alias: {
            'bootstrap': path.resolve(__dirname, './node_modules/bootstrap/dist/css/bootstrap.css'),
        },
        // 省略后缀名
        extensions: [' ', '.js', '.css', '.less'],
        // 第三方库
        modules: ['node_modules', 'lib']
    }
}
```

### `webpack.ProvidePlugin`设置全局变量
> 我们可以将某些变量挂在到全局, 例如jQuery, 这个插件会不我们使用到的插件都注入当前文件，我们需要配置抽离
> expose-loader 暴露全局变量插件

```javascript
// 提供全局变量插件
new webpack.ProvidePlugin({
    $: 'jquery'
})

// expose-loader 配置
// 在 rules 新增一个配置项， 内容如下
 {
    test: /jquery/,
    use: [
        {
            loader: 'expose-loader',
            options: '$'
        }
    ]
}

// 测试 假设有a.js b.js 我们在a.js 引用jQuery，引用b.js
// 然后我们可以在b.js直接使用jQuery(a.js中必须在引用b.js之前引用jQuery，否则b.js无法调用到jQuery)
```

