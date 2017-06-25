# nuxt.js

### 安装

```
//需要安装 vue-cli 才可以使用

//下载模板
vue init nuxt/starter <project-name>
//安装依赖
cd <project-name>
npm install

//启动项目
npm run dev 
//注： 默认运行在 http://localhost:3000
```

### 目录结构

-  `assets` :资源目录,用于组织编译静态资源如 `LESS` 、`sass` 或 `JavaScript`
- `components` : 组件目录，用于组织应用的 Vue.js 组件。Nuxt.js 不会扩展增强该目录下 Vue.js 组件，即这些组件不会像页面组件那样有 `asyncData` 方法的特性。
- `layouts`: 布局目录,用于组织应用的布局组件
- `middleware`: 中间件目录，用于存放应用的中间件
- `pages`: 页面目录，用于组织应用的路由及视图。Nuxt.js 框架读取该目录下所有的 `.vue` 文件并自动生成对应的路由配置。*该目录名为Nuxt.js保留的，不可更改。*
- `plugins`：插件目录，用于组织那些需要在 `跟vue.js应用` 实例化之前需要运行的 `javascript` 插件。
- `stort`:`store` 目录用于组织应用的 [Vuex 状态树](http://vuex.vuejs.org/) 文件。 Nuxt.js 框架集成了 [Vuex 状态树](http://vuex.vuejs.org/) 的相关功能配置，在 `store` 目录下创建一个 `index.js` 文件可激活这些配置。
- `nuxt.config.js
- `nuxt.config.js`  文件:用于组织Nuxt.js 应用的个性化配置，以便覆盖默认配置。
- `package.json` 文件: 用于描述应用的依赖关系和对外暴露的脚本接口



### 别名

- 目录别名

| 别名          | 目录          |      |
| :---------- | :---------- | ---- |
| ~           | /           |      |
| ~assets     | /assets     |      |
| ~components | /components |      |
| ~pages      | /pages      |      |
| ~plugins    | /plugins    |      |
| ~strict     | /strict     |      |
| ~stor       | /store      |      |

- 文件别名

  | 别名      | 使用方法                                | 描述               |
  | ------- | ----------------------------------- | ---------------- |
  | ~stroe  | `const store = require('-store')`   | 导入`vuex`状态树      |
  | ~router | `const router = require('~router')` | 导入`vue-router`实例 |

  ​