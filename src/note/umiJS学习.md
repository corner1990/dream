# umiJS学习

### 安装umiJS

> 小提示一句，如果说经常把yarn和npm混用的话会出现一些奇奇怪怪的问题，具体什么问题可以自己摸索

```javascript
// yarn or npm 
yarn global add umi # or npm install -g umi
```

### 创建一个项目

- 新建项目目录
- 使用umi新建页面
  - 使用umi命令创建
  - 自己手动创建
- 启动项目
- 打包发布

```powershell
// 1.新建目录
mkdir myapp
cd myapp

// 2.初始化项目
yarn create umi

// 出现需要的功能，可以选择，目前集成了antd，code splitting，pwa，dll，hard source
// a = 全选
// i = 全选 || 取消全选
// 空格 = 单项选择

// 初始化目录结构
Mode                LastWriteTime         Length Name
----                -------------         ------ ----
d-----       2018/10/18     14:42                mock
d-----       2018/10/18     14:42                src
-a----       2018/10/18     14:42            245 .editorconfig
-a----       2018/10/18     14:42             13 .env
-a----       2018/10/18     14:42             37 .eslintrc
-a----       2018/10/18     14:42            244 .gitignore
-a----       2018/10/18     14:42             70 .prettierignore
-a----       2018/10/18     14:42            175 .prettierrc
-a----       2018/10/18     14:42            337 .umirc.js
-a----       2018/10/18     14:42            688 package.json

// 4.安装依赖
yarn 

// 5.启动项目
yarn start
在浏览器输出 http://localhost:8000 查看页面
```

### 目录以及约定

> 为了简化操作，可以尽可能的使用umi的约定方式，
>
> 一个复杂的项目应用目录结构如下：

```powershell
.
├── dist/                          // 默认的 build 输出目录
├── mock/                          // mock 文件所在目录，基于 express
├── config/
    ├── config.js                  // umi 配置，同 .umirc.js，二选一
└── src/                           // 源码目录，可选
    ├── layouts/index.js           // 全局布局
    ├── pages/                     // 页面目录，里面的文件即路由
        ├── .umi/                  // dev 临时目录，需添加到 .gitignore
        ├── .umi-production/       // build 临时目录，会自动删除
        ├── document.ejs           // HTML 模板
        ├── 404.js                 // 404 页面
        ├── page1.js               // 页面 1，任意命名，导出 react 组件
        ├── page1.test.js          // 用例文件，umi test 会匹配所有 .test.js 和 .e2e.js 结尾的文件
        └── page2.js               // 页面 2，任意命名
    ├── global.css                 // 约定的全局样式文件，自动引入，也可以用 global.less
    ├── global.js                  // 可以在这里加入 polyfill
├── .umirc.js                      // umi 配置，同 config/config.js，二选一
├── .env                           // 环境变量
└── package.json
```

### ES6语法支持

> 配置文件、mock 文件等都有通过 `@babel/register` 注册实时编译，所以可以和 src 里的文件一样，使用 ES6 的语法和 es modules 。

### dist

> 打包静态文件默认输出路径，可以通过outputPath修改

### Mock

> 约定根目录下所有的.js文件会被解析为mock文件
>
> 比如在mock目录内创建一个user.js,文件内容如下：

```javascript
export default {
  '/api/users': ['a', 'b'],
}
```

> 然后在浏览器里访问 <http://localhost:8000/api/users> 就可以看到 `['a', 'b']` 了。

### src

> 约定`src`为源码目录，但是可选，简单项目可以不加`src`这层目录
>
> 比如下边的两种结构相同

```javascript
+ src
  + pages
    - index.js
  + layouts
    - index.js
- .umirc.js
```

```
+ pages
  - index.js
+ layouts
  - index.js
- .umirc.js
```

### layouts布局

> 全局布局，实际上是路由外嵌套了一层

- 我们的路由

  ```javascript
  [
    { path: '/', component: './pages/index' },
    { path: '/users', component: './pages/users' },
  ]
  ```

- 如果有layouts的路由

  ```
  [
    { path: '/', component: './layouts/index', routes: [
      { path: '/', component: './pages/index' },
      { path: '/users', component: './pages/users' },
    ] }
  ]
  ```

### src/pages

> 约定 pages 下所有的 `(j|t)sx?` 文件即路由。关于更多关于约定式路由的介绍，请前往路由章节。

### src/pages/404.js

> 404 页面。注意开发模式下有内置 umi 提供的 404 提示页面，所以只有显式访问 `/404` 才能访问到这个页面

### src/pages/document.ejs

> 有这个文件时，会覆盖默认的 HTML 模板。需至少包含以下代码，

```html
<div id="root"></div>
```

### src/pages/.umi

> 这是 umi dev 时生产的临时目录，默认包含 `umi.js` 和 `router.js`，有些插件也会在这里生成一些其他临时文件。可以在这里做一些验证，**但请不要直接在这里修改代码，umi 重启或者 pages 下的文件修改都会重新生成这个文件夹下的文件。**

### src/global.(j|t)sx?

> 在入口文件最前面被自动引入，可以考虑在此加入 polyfill

### src/global.(css|less|sass|scss)

> 这个文件不走 css modules，自动被引入，可以写一些全局样式，或者做一些样式覆盖。

### .umirc.js 和 config/config.js

> umi 的配置文件，二选一。


## 路由

### 约定式路由

- 假设 `pages` 目录结构如下：

  ```powershell
  + pages/
    + users/
      - index.js
      - list.js
    - index.js
  ```

- umi 会自动生成路由配置如下：

  ```javascript
  [
    { path: '/', component: './pages/index.js' },
    { path: '/users/', component: './pages/users/index.js' },
    { path: '/users/list', component: './pages/users/list.js' },
  ]
  ```

- 动态路由

  > umi 里约定，带 `$` 前缀的目录或文件为动态路由

  + 比如以下目录结构

    ```
    + pages/
      + $post/
        - index.js
        - comments.js
      + users/
        $id.js
      - index.js
    ```

  + 会生成路由配置如下：

    ```javascript
    [
      { path: '/', component: './pages/index.js' },
      { path: '/users/:id', component: './pages/users/$id.js' },
      { path: '/:post/', component: './pages/$post/index.js' },
      { path: '/:post/comments', component: './pages/$post/comments.js' },
    ]
    ```

### 可选的动态路由

- umi 里约定动态路由如果带 `$` 后缀，则为可选动态路由。

  - 比如以下结构：

    ```
    + pages/
      + users/
        - $id$.js
      - index.js
    ```


  - 会生成路由配置如下：

    ```javascript
    [
      { path: '/': component: './pages/index.js' },
      { path: '/users/:id?': component: './pages/users/$id$.js' },
    ]
    ```

### 嵌套路由

> umi 里约定目录下有 `_layout.js` 时会生成嵌套路由，以 `_layout.js` 为该目录的 layout 。

- 比如以下目录结构：

  ```
  + pages/
    + users/
      - _layout.js
      - $id.js
      - index.js
  ```

- 会生成路由配置如下：

  ```javascript
  [
    { path: '/users': component: './pages/users/_layout.js'
      routes: [
       { path: '/users/', component: './pages/users/index.js' },
       { path: '/users/:id', component: './pages/users/$id.js' },
     ],
    },
  ]
  ```

### 全局 layout

> 约定 `src/layouts/index.js` 为全局路由，返回一个 React 组件，通过 `props.children` 渲染子组件。

- 相同的全局layout

```
export default function(props) {
  return (
    <>
      <Header />
      { props.children }
      <Footer />
    </>
  );
}
```

- 不同的layout

```javascript
export default function(props) {
  if (props.location.pathname === '/login') {
    return <SimpleLayout>{ props.children }</SimpleLayout>
  }
  
  return (
    <>
      <Header />
      { props.children }
      <Footer />
    </>
  );
}
```

### 404 路由

> 约定 `pages/404.js` 为 404 页面，需返回 React 组件。

```javascript
export default () => {
  return (
    <div>I am a customized 404 page</div>
  );
};

// 注意：开发模式下，umi 会添加一个默认的 404 页面来辅助开发，但你仍然可通过精确地访问 /404 来验证 404 页面。
```


### 通过注释扩展路由

> 约定路由文件的首个注释如果包含 **yaml** 格式的配置，则会被用于扩展路由。

文档目录

```javascript
+ pages/
  - index.js
```

如果 `pages/index.js` 里包含：

```
/**
 * title: Index Page
 * Routes:
 *   - ./src/routes/a.js
 *   - ./src/routes/b.js
 */
```

则会生成路由配置：

```javascript
[
  { path: '/', component: './index.js',
    title: 'Index Page',
    Routes: [ './src/routes/a.js', './src/routes/b.js' ],
  },
]
```

### 配置式路由

> 如果你倾向于使用配置式的路由，可以配置 `routes` ，**此配置项存在时则不会对 src/pages 目录做约定式的解析**。

栗子：

```javascript
export default {
  routes: [
    { path: '/', component: './a' },
    { path: '/list', component: './b', Routes: ['./routes/PrivateRoute.js'] },
    { path: '/users', component: './users/_layout',
      routes: [
        { path: '/users/detail', component: './users/detail' },
        { path: '/users/:id', component: './users/id' }
      ]
    },
  ],
};

// 注意：component 是相对于 src/pages 目录的
```

### 权限路由

> umi 的权限路由是通过配置路由的 `Routes` 属性来实现。约定式的通过 yaml 注释添加，配置式的直接配上即可。

比如有以下配置：

```javascript
[
  { path: '/', component: './pages/index.js' },
  { path: '/list', component: './pages/list.js', Routes: ['./routes/PrivateRoute.js'] },
]

// 然后 umi 会用 ./routes/PrivateRoute.js 来渲染 /list。
```

`./routes/PrivateRoute.js` 文件示例

```javascript
export default (props) => {
  return (
    <div>
      <div>PrivateRoute (routes/PrivateRoute.js)</div>
      { props.children }
    </div>
  );
}
```

### 路由过度动画

> 路由动效应该是有多种实现方式，这里举 [react-transition-group](https://github.com/reactjs/react-transition-group) 的例子。

- 安装依赖

```
 yarn add react-transition-group
```

> 在 layout 组件（`layouts/index.js` 或者 pages 子目录下的 `_layout.js`）里在渲染子组件时用 TransitionGroup 和 CSSTransition 包裹一层，并以 `location.key` 为 key，

```javascript
import withRouter from 'umi/withRouter';
import { TransitionGroup, CSSTransition } from "react-transition-group";

export default withRouter(
  ({ location }) =>
    <TransitionGroup>
      <CSSTransition key={location.pathname} classNames="fade" timeout={300}>
        { children }
      </CSSTransition>
    </TransitionGroup>
)
```

上面用到的 `fade` 样式，可以在 `src` 下的 `global.css` 里定义：

```javascript
.fade-enter {
  opacity: 0;
  z-index: 1;
}

.fade-enter.fade-enter-active {
  opacity: 1;
  transition: opacity 250ms ease-in;
}
```

- 可以配合[Animate.css](https://daneden.github.io/animate.css/)使用



### 新建页面

- 使用命令行创建，加入我们希望访问的路径是/user/info,命令如下：

  ```
  umi g page user/info
  // 等待命令行先创建成功以后，就可以在浏览器访问该页面了
  ```

- 手动创建， 自己的创建目录，页面文件

### 在页面间跳转

- 声明式

```javascript
import Link from 'umi/link';

export default () => (
  <Link to="/list">Go to list page</Link>
);
```



- 命令式

```javascript
import router from 'umi/router';

function goToListPage() {
  router.push('/list');
}
```

### 配置

> umi 允许在 `.umirc.js` 或 `config/config.js` （二选一，`.umirc.js` 优先）中进行配置，支持 ES6 语法。

简单的例子：

```javascript

// ref: https://umijs.org/config/
import {resolve} from "path";
export default {
  plugins: [
    // ref: https://umijs.org/zh/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: {
        immer: true, //default:false
        dynamicImport: {
          webpackChunkName: true,
          loadingComponent: './components/Loading.js', // 配置动态加载model
          hmr: true
        }
      },
      dynamicImport: {  // 配置动态加载
        webpackChunkName: true,
        loadingComponent: './components/Loading.js',
        level: 1
      },
      targets: {
        ie: 10,
      },
      title: 'iss2',
      dll: {
        exclude: [],
        include: ["dva", "dva/router", "dva/saga", "dva/fetch", "antd/es"],
      },
      // 配置渐进增强
      pwa: false,
      routes: {
        exclude: [
          
        ],
      },
      esLint: true,
      // hardSource: /* isMac */process.platform === 'darwin',
      title: 'ISS', //页面展示title
    }],
    [ // 自定义插件 插件加载顺序是按照我们配置的顺序加载
      './plugins/initMeta.js'
    ]
  ],
  alias: {
    '@': resolve(__dirname, './src'),
    "utils": resolve(__dirname,"./src/utils"),
  },
  // fastClick: true, // 移动端延迟300毫秒的问题
  // theme: {
  //   "@primary-color": "#1DA57A"
  // },
  // routes: [],
  theme: "./theme/theme.config.js",
  chainWebpack(config) {
    config.module.rule('svg')
      .test(/\.svg$/i)
      .use('svg-sprite-loader')
      .loader(require.resolve('svg-sprite-loader'));

      // 配置eslint
      config.module.rule('eslint')
        .test(/\.(js|mjs|jsx)$/)
        .enforce('pre')
        .use(['eslint-loader'], {options: {
          formatter: require('react-dev-utils/eslintFormatter'), 
          eslintPath: require('eslint')}
        })
        .loader(require.resolve('eslint-loader'))
  },
   // 接口代理示例
    proxy: {
     "/api/v1/weather": {
       "target": "https://api.seniverse.com/",
       "changeOrigin": true,
       "pathRewrite": { "^/api/v1/weather": "/v3/weather" }
     },
     "/api/v2": {
       "target": "http://192.168.0.110",
       "changeOrigin": true,
       "pathRewrite": { "^/api/v2" : "/api/v2" }
     }
   },
}

```

### 按需加载

> 出于性能的考虑，我们会对模块和组件进行按需加载。

- 按需加载组件

```javascript
// 通过 umi/dynamic 接口实现，比如：
import dynamic from 'umi/dynamic';

const delay = (timeout) => new Promise(resolve => setTimeout(resolve, timeout));
const App = dynamic({
  loader: async function() {
    await delay(/* 1s */1000);
    return () => <div>I will render after 1s</div>;
  },
});
```

- router实例

```javascript
import dynamic from 'umi/dynamic';

let routes = [
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: "layouts__index" */'../../layouts/index.js'), loading: require('E:/iss-website/src/components/Loading.js').default  }),
    "routes": [
      {
        "path": "/",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "layouts__index" */'../index.js'), loading: require('E:/iss-website/src/components/Loading.js').default  }),
        "_title": "ISS",
        "_title_default": "ISS"
      },
      {
        "path": "/login",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "layouts__index" */'../login/index.js'), loading: require('E:/iss-website/src/components/Loading.js').default  }),
        "_title": "ISS",
        "_title_default": "ISS"
      }
    ],
    "_title": "ISS",
    "_title_default": "ISS"
  },
  {
    "component": () => React.createElement(require('E:/iss-website/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false }),
    "_title": "ISS",
    "_title_default": "ISS"
  }
];
export default routes
```

- 按需加载模块

```js
import('g2').then(() => {
  // do something with g2
});
```



### 部署发布

- 默认在命令行使用命令打包，然后拿到静态文件目录部署在服务器

- 静态资源在非根目录或 cdn

  > 这时，就需要配置 [publicPath](https://umijs.org/config/#publicPath)。至于 publicPath 是啥？具体看 [webpack 文档](https://webpack.js.org/configuration/output/#output-publicpath)，把他指向静态资源（js、css、图片、字体等）所在的路径。

  ```javascript
  export default {
    publicPath: "http://yourcdn/path/to/static/"
  }
  ```


```javascript
// 打包文件
yarn build 

./dist
├── index.html
├── list.html
└── static
    ├── pages__index.5c0f5f51.async.js
    ├── pages__list.f940b099.async.js
    ├── umi.2924fdb7.js
    └── umi.cfe3ffab.css

// 注意：静态化暂不支持有变量路由的场景。
```

- HTML 后缀

> 有些静态化的场景里，是不会自动读索引文件的，比如支付宝的容器环境，那么就不能生成这种 html 文件
> 

```
├── index.html
├── list
│   └── index.html

// 而是生成如下页面
├── index.html
└── list.html

```

- 配置方式是在 .umirc.js 里

```javascript
export default {
  exportStatic: {
    htmlSuffix: true,
  },
}
```

- umi build 会生成

```
./dist
├── index.html
├── list.html
└── static
    ├── pages__index.5c0f5f51.async.js
    ├── pages__list.f940b099.async.js
    ├── umi.2924fdb7.js
    └── umi.cfe3ffab.css
```

- 静态化后输出到任意路径

```javascript
export default {
  exportStatic: {
    htmlSuffix: true,
    dynamicRoot: true,
  },
}
```



### nginx 配置

```nginx
server {
        listen       8082;
        server_name  localhost;
        location / {
            root   E:/mix_vue/dist;#定位到项目的目录
            #index  index.html index.htm;
	        try_files $uri $uri/ /index.html;#根据官网这规则配置
        }
	location ~ \.php${
	    proxy_pass	http://mixVueServer;#根据后端语言做反向代理处理跨域问题
	    proxy_set_header	Host	$host;
	    proxy_set_header	X-Real-IP	$remote_addr;
	}
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }

```

