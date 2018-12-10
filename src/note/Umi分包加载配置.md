# Umi分包加载配置

### webpack配置

> 在.umirc.js或者config.js中配置，使用webpack的优化模块`optimization.splitChunks`实现，
>
> 具体是api这里不做解释，自己去官网看看，说的很清楚，这是[传送门](https://webpack.js.org/configuration/optimization/)
>
> 配置代码如下：

```javascript
config.optimization.splitChunks({
        chunks: 'all', 
        automaticNameDelimiter: '.', 
        name: true,
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 10,
        maxInitialRequests: 5,
        cacheGroups: {
            vendors: {
                name: 'vendors',
                chunks: 'all',
                test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|lodash|lodash-decorators|redux-saga|re-select|dva|moment)[\\/]/,
                priority: -10,
            },
            antdesigns: {
                name: 'antdesigns',
                chunks: 'all',
                test: /[\\/]node_modules[\\/](@ant-design|antd)[\\/]/,
                priority: -11,
            },
          default: {
            minChunks: 1,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      })
```

### `umi-plugin-react`中的修改

> 新增chunks的配置，内容如下：

```
chunks: ['antdesigns', 'vendors', 'default.umi',  'umi']
```

- 到此为止就可以实现打包了，但是别高兴的太早，你会发现css丢了，没有加载进来，接下来我用一个奇蠢的方式解决一下

### 手写一个umi插件

> 资金新建目录，名字随便取，我这里考虑携带的是addCsssLink.js

- 在项目根目录新建文件，文件名为`addCsssLink.js`

- 代码：

  ```javascript
  /**
   * 处理css
   * @param {object} api umi的入口对象 
   */
  let fs = require('fs')
  let path = require('path')
  let p = path.resolve(__dirname, '../dist')
  
  export default (api) => {
  	api.onBuildSuccess(() => {
  		fs.readdir(p, (err, files) => {
  			if (err) {
  				return console.log('err', err)
  			}
  			
  			let reg = /^(antd|default)(\S+)(\.css)$/
  			// files 是dist目录下的所有文件， 过滤拿到需要使用的css，
  			files = files.filter(item => reg.test(item))
  			// 处理为link标签字符串
  			files = files.map(item => `<link rel="stylesheet" type="text/css" href="/${item}">`)
  			// 之后会是使用这个标签做分隔符 ，这里需要添加上
  			files.unshift('</title>')
  			// console.log('files', files)
  
  			// 读取到index.html 内容
  			fs.readFile(path.join(p, 'index.html'), {flag: 'r'}, (err, data) => {
  				data = data.toString()
  				data = data.split('</title>')
  				// 解析到文件
  				let [first, secound] = data
  				files.unshift(first)
  				files.push(secound)
  				// 将拼装好的文件写入index.html
  				fs.writeFile(path.join(p, 'index.html'),files.join(''), (err) => {
  					if (err) {
  						throw new Error(err)
  					}
  					console.log('css insert ok')
  				})
  			})
  			
  		})
  	});
  }
  ```

  > 为简单省事，我这里是写死的并没有把那个文件名改为变量。动态创建reg就好了，这里就偷个懒

- 在配置文件中引入自定义插件
- 再次打包文件，搞定。好了，问题搞定了，肚子好饿，吃饭先。。。。。