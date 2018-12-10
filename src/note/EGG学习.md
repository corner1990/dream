# egg.js
### egg.js
- 提供基于 Egg 定制上层框架的能力
- 高度可扩展的插件机制
- 内置多进程管理
- 基于 Koa 开发，性能优异
- 框架稳定，测试覆盖率高
- 渐进式开发

### 目录结构
```
├── package.json
├── app.js (app.js 和 agent.js 用于自定义启动时的初始化工作)
├── agent.js (可选)
├── app
|   ├── router.js(用于配置 URL 路由规则)
│   ├── controller(用于解析用户的输入，处理后返回相应的结果)
│   |   └── home.js
│   ├── service (用于编写业务逻辑层，可选)
│   |   └── user.js
│   ├── middleware (用于编写中间件，可选)
│   |   └── response_time.js
│   ├── schedule (用于定时任务，可选)
│   |   └── my_task.js
│   ├── public (用于放置静态资源，可选)
│   |   └── reset.css
│   ├── extend (用于框架的扩展，可选)
│   |   └── application.js app 对象指的是 Koa 的全局应用对象，全局只有一个，在应用启动时被创建。
│       ├── context.js (Context 指的是 Koa 的请求上下文，这是 请求级别 的对象)
│       ├── request.js (Request 对象和 Koa 的 Request 对象相同，是 请求级别 的对象)
│       ├── response.js (Response 对象和 Koa 的 Response 对象相同，是 请求级别 的对象)
│       ├── helper.js (Helper 函数用来提供一些实用的 utility 函数)
│   ├── view (用于放置模板文件)
│   |   └── home.tpl
├── |── model (用于放置领域模型)
│   |   └── home.tpl
│   └── extend (用于框架的扩展)
│       ├── helper.js (可选)
│       ├── request.js (可选)
│       ├── response.js (可选)
│       ├── context.js (可选)
│       ├── application.js (可选)
│       └── agent.js (可选)
├── config(用于编写配置文件)
|   ├── plugin.js(用于配置需要加载的插件)
|   ├── config.default.js
│   ├── config.prod.js
|   ├── config.test.js (可选)
|   ├── config.local.js (可选)
|   └── config.unittest.js (可选)
└── test(用于单元测试)
    ├── middleware
    |   └── response_time.test.js
    └── controller
        └── home.test.js
```

### 访问
| 文件       | app      | ctx      | service      | config      | logger      | helper          |
| ---------- | -------- | -------- | ------------ | ----------- | ----------- | --------------- |
| Controller | this.app | this.ctx | this.service | this.config | this.logger | this.app.helper |
| Service    | this.app | this.ctx | this.service | this.config | this.logger | this.app.helper |



### 初始化项目
```
mkdir egg-news
cd egg-news
npm init -y
cnpm i egg --save
cnpm i egg-bin --save-dev
```



- 添加 npm scripts 到 package.json：

  ```js
  "scripts": {
    "dev": "egg-bin dev"
  }
  ```


- 跑通路由

  ```
  ├─app
  │  │─router.js
  │  ├─controller
  │  │      news.js
  ├─config
  │      config.default.js
  |─package.json
  ```

- 配置路由

  ```js
  // app/router.js
  
  module.exports = app => {
      const { router, controller } = app;
      router.get('/news', controller.news.index);
  }
  
  ```

- 编写控制器

  ```js
  //- app\controller\news.js
  
  const { Controller } = require('egg');
  class NewsController extends Controller {
      async index() {
          this.ctx.body = 'hello world';
      }
  }
  module.exports = NewsController;
  ```

- 编写配置文件
  `exports.keys = 'zfpx';`

### 静态文件中间件
- Egg 内置了 static 插件
  static 插件默认映射 /public/ -> app/public/ 目录
  把静态资源都放到 app/public 目录即可
  bootcss

- 使用模板引擎

  ```
  ├─app
  │  │─router.js
  │  ├─controller
  │  │      news.js   
  │  ├─public
  │  │  ├─css
  │  │  │      bootstrap.css  
  │  │  └─js
  │  │          bootstrap.js         
  │  └─view
  │          news.ejs       
  ├─config
  │   config.default.js
  │   plugin.js
  ```

- 安装依赖的插件

  ```
  cnpm install egg-view-nunjucks --save
  ```

- 启用插件

  ```js
  //- {ROOT}\config\plugin.js
  
  exports.nunjucks = {
      enable: true,
      package: 'egg-view-nunjucks'
  }
  
  ```

- 配置模板


```js
// - {ROOT}\config\config.default.js

module.exports=app => {
    let config={};

config.keys='zfpx';

config.view={
    defaultExtension: '.html',
    defaultViewEngine: 'nunjucks',
    mapping: {
        '.html':'nunjucks'
    }
}
return config;
```
}

- 编写模板

```php
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="/public/bootstrap/css/bootstrap.css">
    <title>{{title}}</title>
</head>
<body>
    <div class="container">
        <div class="row justify-content-center mt-4">
            <div class="col-auto">
                   {% for news in list%}
                        <div class="card border-primary">
                            <img class="card-img-top" src="{{news.image}}" style="width:100%;" />
                            <div class="card-body">
                                <p class="card-text">
                                  <a href="{{news.url}}">{{news.title}}</a>
                                </p>
                            </div>
                        </div>
                    {% endfor %}
            </div>
        </div>
    </div>
</body>
</html>
6.5 编写控制器
const {Controller}=require('egg');
class NewsController extends Controller{
    async index() {
        const {ctx}=this;
        const list=[
            {
                id: '45154322_0',
                title: '世界首富早晚是这个人，坐拥7家独角兽公司，估值破数万！',
                url: 'http://tech.ifeng.com/a/20180904/45154322_0.shtml',
                image:'http://p0.ifengimg.com/pmop/2018/0905/CFFF918B94D561D2A61FB434ADA81589E8972025_size41_w640_h479.jpeg'
            },
            {
                id: '16491630_0',
                title: '支付宝们来了！将来人民币会消失吗？',
                url: 'http://finance.ifeng.com/a/20180907/16491630_0.shtml',
                image:'http://p0.ifengimg.com/pmop/2018/0907/2AF684C2EC49B7E3C17FCB13D6DEEF08401D4567_size27_w530_h369.jpeg'
            },
            {
                id: '2451982',
                title: '《福布斯》专访贝索斯：无业务边界的亚马逊 令对手生畏的CEO',
                url: 'https://www.jiemian.com/article/2451982.html',
                image:'https://img1.jiemian.com/101/original/20180907/153628523948814900_a580x330.jpg'
            }
        ];
        await ctx.render('index',{list});
    }
}
module.exports=NewsController;
```



###  读取远程接口服务
> 在实际应用中，Controller 一般不会自己产出数据，也不会包含复杂的逻辑，复杂的过程应抽象为业务逻辑层 Service。

- 添加配置

  ```js
  // - config.default.js
  
  config.news={
          newsListUrl: 'https://www.easy-mock.com/mock/5b923eb2321f1076a4fc13f4/api/news',
  }
  
  ```

- 编写Service

  ```js
  // - const {Service}=require('egg');
  class NewsService extends Service {
      async list(pageNum,pageSize) {
          const {ctx}=this;
          const {newsListUrl}=this.config.news;
          const result=await ctx.curl(newsListUrl,{
              method: 'GET',
              data: {
                  pageNum,pageSize
              },
              dataType:'json'
          });
          return result.data.data;
      }
  }
  module.exports=NewsService;
  
  ```

- 编写控制层

  ```js
  app/controller/news.js
  
  const {Controller}=require('egg');
  class NewsController extends Controller{
      async index() {
          const {ctx,service}=this;
          let {pageNum=1,pageSize=this.config.news.pageSize}=ctx.query;
          const list=await service.news.list(pageNum,pageSize);
          await ctx.render('index',{list});
      }
  }
  module.exports=NewsController;
  ```


### 扩展工具方法

- egg最重要的5个对象

  1. app 代表整个应用对象
  2. ctx 代表上下文对象
  3. request 代表请求对象
  4. response 对象
  5. helper 工具方法

- 框架提供了一种快速扩展的方式，只需在`app/extend`目录下提供扩展脚本即可
- Helper 函数用来提供一些实用的 `utility` 函数。
- 访问方式 通过 `ctx.helper` 访问到 helper 对象

**app\extend\helper.js**

```js
const moment=require('moment');
moment.locale('zh-cn');
exports.fromNow=dateTime => moment(new Date(dateTime)).fromNow();
```

**news.js**

```js
list.forEach(item => {
            item.createAt=ctx.helper.fromNow(item.createAt);
            return item;
});
```

**index.html**

```js
时间: {{helper.fromNow(news.createAt)}}
```

## 中间件

**app/middleware/robot.js**

```js
module.exports=(options,app) => {
    return async function(ctx,next) {
        const source=ctx.get('user-agent')||'';
        const matched=options.ua.some(ua => ua.test(source));
        if (matched) {
            ctx.status=403;
            ctx.body='你没有访问权限';
        } else {
            await next();
        }
    }
}
```

**config.default.js**

```js
    config.middleware=[
        'robot'
    ]
    config.robot={
        ua: [
            /Chrome/
        ]
    }
```

## 运行环境

框架有两种方式指定运行环境：

- 通过 `config/env` 文件指定，该文件的内容就是运行环境，如 prod。
- 通过 `EGG_SERVER_ENV` 环境变量指定。
- 框架提供了变量 `app.config.env` 来表示应用当前的运行环境。
- 支持按环境变量加载不同的配置文件，如 `config.local.js`， `config.prod.js` 等等

| EGG_SERVER_ENV | 说明         |
| -------------- | ------------ |
| local          | 本地开发环境 |
| prod           | 生产环境     |

```js
npm install  cross-env --save-dev
"scripts": {
    "start": "cross-env EGG_SERVER_ENV=local  egg-bin dev",
    "debug": "egg-bin debug"
}
```

## 单元测试

###  单元测试的优点

- 代码质量持续有保障
- 重构正确性保障
- 增强自信心
- 自动化运行

###  测试框架

- [mochajs](https://mochajs.org/)
- [power-assert](https://github.com/power-assert-js/power-assert)

### 测试约定

#### 测试目录结构

- 我们约定 `test` 目录为存放所有测试脚本的目录，测试所使用到的 `fixtures` 和相关辅助脚本都应该放在此目录下。

- 测试文件的目录和我们需要测试的文件目录必须保持一直

- 测试脚本文件统一按 ${filename}.test.js 命名，必须以 .test.js 作为文件后缀。 一个应用的测试目录示例：

  ```js
  test
  ├── controller
  │   └── home.test.js
  └── service
    └── user.test.js
  ```

#### 测试运行工具

统一使用 egg-bin 来运行测试脚本， 自动将内置的 Mocha、co-mocha、power-assert，nyc 等模块组合引入到测试脚本中， 让我们聚焦精力在编写测试代码上，而不是纠结选择那些测试周边工具和模块。

```json
  "scripts": {
    "test": "egg-bin test",
    "cov": "egg-bin cov"
  }
```

#### mock

正常来说，如果要完整手写一个 app 创建和启动代码，还是需要写一段初始化脚本的， 并且还需要在测试跑完之后做一些清理工作，如删除临时文件，销毁 app。

常常还有模拟各种网络异常，服务访问异常等特殊情况。

所以我们单独为框架抽取了一个测试 mock 辅助模块：egg-mock， 有了它我们就可以非常快速地编写一个 app 的单元测试，并且还能快速创建一个 ctx 来测试它的属性、方法和 Service 等。

#### app

在测试运行之前，我们首先要创建应用的一个 app 实例， 通过它来访问需要被测试的 Controller、Middleware、Service 等应用层代码。

```js
// test/controller/home.test.js
const { app, mock, assert } = require('egg-mock/bootstrap');

describe('test/controller/home.test.js', () => {

});
```

#### ctx

```js
const { app, mock, assert } = require('egg-mock/bootstrap');
describe('test/controller/news.test.js', () => {
  it('should get a ctx', () => {
    const ctx=app.mockContext({
          session: {
            user:{name:'leo'}
        }
    });
    assert(ctx.method === 'GET');
    assert(ctx.url==='/');
    assert(ctx.session.user.name == 'leo');
  });
});

```

####  测试执行顺序

特别需要注意的是执行顺序，尽量保证在执行某个用例的时候执行相关代码。

```js
describe('egg test', () => {
  before(() => console.log('order 1'));
  before(() => console.log('order 2'));
  after(() => console.log('order 6'));
  beforeEach(() => console.log('order 3'));
  afterEach(() => console.log('order 5'));
  it('should worker', () => console.log('order 4'));
});
```

#### 异步测试

egg-bin 支持测试异步调用，它支持多种写法：

```js
// 使用返回 Promise 的方式
it('should redirect', () => {
  return app.httpRequest()
    .get('/')
    .expect(302);
});

// 使用 callback 的方式
it('should redirect', done => {
  app.httpRequest()
    .get('/')
    .expect(302, done);
});

// 使用 async
it('should redirect', async () => {
  await app.httpRequest()
    .get('/')
    .expect(302);
});
```

#### Controller 测试

`app.httpRequest()`是 `egg-mock` 封装的 [SuperTest](https://github.com/visionmedia/supertest) 请求实例。

```js
const { app, mock, assert } = require('egg-mock/bootstrap');
describe('test/controller/home.test.js', () => {
  it('homeController', async () => {
        await app.httpRequest()
            .get('/')
            .expect(200)
            .expect('hello');

            let result = await app.httpRequest()
            .get('/')
            .expect(200)
                .expect('hello');
           assert(result.status == 200);
  });
});
```

#### post

```js
    router.post('/post',controller.home.post);
const { app, mock, assert } = require('egg-mock/bootstrap');
describe('test/controller/home.test.js', () => {
    it('homeController',async () => {
        let user={name: 'leo'};
        app.mockCsrf();
        await app.httpRequest()
            .post('/post')
            .type('form')
            .send(user)
            .expect(200)
            .expect(user);
  });
});
```

#### service

Service 相对于 Controller 来说，测试起来会更加简单， 我们只需要先创建一个 ctx，然后通过 ctx.service.${serviceName} 拿到 Service 实例， 然后调用 Service 方法即可。

```js
const { app, mock, assert } = require('egg-mock/bootstrap');
describe('test/service/news.test.js', () => {
    it('newsService',async () => {
        let ctx = app.mockContext();
        let result=await ctx.service.news.list(1,5);
        assert(result.length == 5);
    });
});
```

#### Extend 测试

应用可以对 Application、Request、Response、Context 和 Helper 进行扩展。 我们可以对扩展的方法或者属性针对性的编写单元测试。

#####  application

egg-mock 创建 app 的时候，已经将 Application 的扩展自动加载到 app 实例了， 直接使用这个 app 实例访问扩展的属性和方法即可进行测试。

app/extend/application.js

```js
let cacheData={};
exports.cache={
    get(key) {
        return cacheData[key];
    },
    set(key,val) {
        cacheData[key]=val;
    }
}
```

test/app/extend/cache.test.js

```js
const { app, mock, assert } = require('egg-mock/bootstrap');
describe('test/app/extend/cache.test.js', () => {
    it('cache',async () => {
        app.cache.set('name','zfpx');
        assert(app.cache.get('name') == 'zfpx');
  });
});
```

##### context

Context 测试只比 Application 多了一个 app.mockContext() 步骤来模拟创建一个 Context 对象。 app/extend/context.js

```js
exports.language=function () {
    return this.get('accept-language');
}
```

test/app/extend/context.test.js

```js
const { app, mock, assert } = require('egg-mock/bootstrap');
describe('test/app/extend/context.test.js',() => {
    let language="zh-cn";
    it('cache',async () => {
        const ctx=app.mockContext({
            headers: {
                'Accept-Language':language
            }
        });
        //console.log('ctx.lan',ctx.lan())
        assert(ctx.language() == language);
  });
});
```

##### Request

通过 ctx.request 来访问 Request 扩展的属性和方法，直接即可进行测试。

```js
module.exports={
    get isChrome() {
        const userAgent=this.get('User-Agent').toLowerCase();
        return userAgent.includes('chrome');
    }
}
const { app, mock, assert } = require('egg-mock/bootstrap');
describe('test/app/extend/request.test.js',() => {
    it('cache',async () => {
        const ctx=app.mockContext({
            headers: {
                'User-Agent':'I love Chrome'
            }
        });
        assert(ctx.request.isChrome);
  });
});
```

##### response

Response 测试与 Request 完全一致。 通过 ctx.response 来访问 Response 扩展的属性和方法，直接即可进行测试。

```js
module.exports = {
  get isSuccess() {
    return this.status === 200;
  },
};
describe('isSuccess()', () => {
  it('should true', () => {
    const ctx = app.mockContext();
    ctx.status = 200;
    assert(ctx.response.isSuccess === true);
  });

  it('should false', () => {
    const ctx = app.mockContext();
    ctx.status = 404;
    assert(ctx.response.isSuccess === false);
  });
});
```

##### ### Helper

Helper 测试方式与 Service 类似，也是通过 ctx 来访问到 Helper，然后调用 Helper 方法测试。

```js
module.exports = {
  money(val) {
    const lang = this.ctx.get('accept-language');
    if (lang.includes('zh-cn')) {
      return `￥ ${val}`;
    }
    return `$ ${val}`;
  },
};
describe('money()', () => {
  it('should RMB', () => {
    const ctx = app.mockContext({
      // 模拟 ctx 的 headers
      headers: {
        'Accept-Language': 'zh-CN,zh;q=0.5',
      },
    });
    assert(ctx.helper.money(100) === '￥ 100');
  });

  it('should US Dolar', () => {
    const ctx = app.mockContext();
    assert(ctx.helper.money(100) === '$ 100');
  });
});
```

