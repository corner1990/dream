### 配置webpack  px 自动转为 rem

### 安装`amfe-flexible`（用于设置 rem 基准值）

```bash
yarn add amfe-flexible
or 
npm i -S amfe-flexible
```

### 使用`amfe-flexible`

```javascript
// src/main.js 中引入 amfe-flexible
import 'amfe-flexible'
```



### 安装 postcss-pxtorem（postcss-pxtorem是一款 postcss 插件，用于将单位转化为 rem）

> 注意 版本太高会报错，需要安装指定版本

```bash
npm install postcss-pxtorem@5.1.1 --save-dev
or
yarn add postcss-pxtorem@5.1.1

# 安装loader
npm install postcss-loader@6.1.1 --save-dev
or
yarn add postcss-loader@6.1.1
```

### `index.html`中添加`meta`标签

```php+HTML
// src/public/index.html viewport 标签替换为如下内容
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
```

### `vue.config.js`中添加配置

```javascript
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
  
module.exports = {
    css: {
        loaderOptions: {
        postcss: {
            plugins: [
            autoprefixer(),
            pxtorem({
                rootValue: 75,
                propList: ['*'],
                "selectorBlackList":["van-"]   //排除vant框架相关组件
            })
            ]
        }
        }
    }
};
```

### 新建`postcss.config.js'文件

```javascript
// 跟目录下新建postcss.config.js 内容如下
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
module.exports = ({ file }) => {
    let remUnit
    if (file && file.dirname && file.dirname.indexOf('vant') > -1) {
        remUnit = 37.5
    } else {
        remUnit = 75
    }
    return {
        plugins: [
            autoprefixer(),
            pxtorem({
                rootValue: remUnit,
                propList: ['*'],
                selectorBlackList: ['van-circle__layer']
            })
        ]
    }
}

// 注：动态设置rootValue的大小，即对于vant-ui框架的组件 将rootValue设置成37.5，对于我们自己的750宽度的设计稿的将rootValue设置成75
```

### 重启项目

> 这里就完成了配置，重启vue server 查看是否生效

### 备注

```javascript

// postcss.config.js 通用配置
module.exports = {
  plugins: {
    'autoprefixer': {
      overrideBrowserslist: [
        "Android 4.1",
        "iOS 7.1",
        "Chrome > 31",
        "ff > 31",
        "ie >= 8"
      ]
    },
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*']
    }
  }

}
```

