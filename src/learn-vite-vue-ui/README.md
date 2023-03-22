# 手写组件库

### 准备Monorpo环境
> 单个仓库，多个项目，方便独立编译，减少互相依赖
> 常见得库，如Vant， ElementUI,  Vue3都是这样子的方式。
> 需要用到的工具有：lerna， pnpm， yarn等，
> pnpm： 简单高效，相对yarn和lerna 要简单，操作方便，安装依赖快，

### 使用`pnpm`
#### 安装
```sh
npm i pnpm -g
```

### 初始化package.json
```
pnpm init 
```

#### 新增配置文件 .npmrc
> shamefully-hoist: 如果某些工具仅在根目录的node_modules时才有效，可以将其设置为true来提升那些不在根目录的node_modules，就是将你安装的依赖包的依赖包的依赖包的...都放到同一级别（扁平化）。说白了就是不设置为true有些包就有可能会出问题。
> 
```sh
# 输入内容
shamefully-hoist = true
```

### moorepo 实现
> 为了项目之间互相引用，新建一个`pnpm-workspace.yaml`文件，将所有的包管理起来

```yaml
    packages:
    - 'packages/**'
    - 'examples'
```
> 通过以上配置，就将项目下的`packages`目录和`examples`目录关联了起来。如果需要关联更多的项目，只需要继续新增目录即可
> `packages`目录存放左右的组件
>  `examples` 用来调试组件； examples文件夹需要使用vite 搭建一个基本得vue3脚手架项目
>

### 安装对应的依赖
> 为了方便让每个包可以引用公用包，安装需要一个`-w`参数
> 
```sh
    pnpm i vue@next typescript less -D -w
```

#### 配置`tsconfig.js`;
> 初始化
    ```sh
        npx tsc --init
    ```
> 修改`tsconfig.js`配置的内容
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "jsx": "preserve",
    "strict": true,
    "target": "ES2015",
    "module": "ESNext",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "moduleResolution": "Node",
    "lib": ["esnext", "dom"]
  }
}
```


### 使用vite搭建vue3项目
1. 初始化仓库
  ```sh
  # 创建 examples 目录
  # 进入 examples 目录，使用npnpm初始化
  pnpm init
  ```
2. 安装`vite` 和`@vitejs/plugin-vue`支持`.vue`文件的转译
   ```sh
    pnpm install vite @vitejs/plugin-vue -D -w
   ```

3. 配置 `vite.config.ts`;
   1. 新建`vite.config.ts`
    ```ts
     import { defineConfig } from 'vite';
     import vue from '@vitejs/plugin-vue'

     export default defineConfig({
       plugins: [vue()]
     })
    ```
4. 在`examples`根目录下新建`index.html`文件， 内容如下：
  ```html
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>learn vite vue UI</title>
      </head>
      <body>
          <div id="app"></div>
          <script src="main.ts" type="module"></script>
          <!-- 注意： vite 是基于esmodule的 所以type="module" -->
      </body>
      </html>
  ```

5. 在`examples`根目录下新建`app.vue`模板， 内容如下
  ```vue
  <template>
    <div>
      启动测试  
    </div>
   </template>
  ```
6. 在`examples`根目录下新建`main.ts`
  ```ts
    import { createApp } from 'vue';
    import App from './app.vue';

    const app = createApp(App);

    app.mount('#app')
  ```
7. 处理找不到模块“./App.vue”或其相应的类型声明 报错
   1. 在`examples`根目录下新建`env.d.ts`
   2. 内容如下
  ```ts
    declare module '*.vue' {
      import type { DefineComponent } from 'vue';
      const VueComponent: DefineComponent<{}, {}, any>;
      export default VueComponent;
    }
  ```
8. 配置启动项目
   > 在`examples/package.json`文件中配置`scripts`脚本
   ```json
      {
        "scripts": {
          "start": "vite"
        },
      }
   ```
9. 在终端中进入`examples/`目录，使用`pnpm run start`启动项目
    > 等待项目启动成功， 打开浏览器预览


### 本地调试
1. 新建包文件
   > 进入`/packages`目录，新建`utils`目录
2.  `utils`包：存放我们公共方法，工具函数等
   > 因为他是一个单独的包，所以需要吹刷
3. 在`packages/utils/package.json`文件中修改包的名称为自己项目的名称, 例如：`@my-learn-vite-ui/utils`
4. `packages/utils/`中新建入口文件`index.ts`
  ```ts
  // 写一个简单的函数用来测试
   export const testFn = (numA: number, numB: number): number => numA + numB;
  ```

### 新建组件库包`my-learn-vite-ui`
1. 在`/packages/`目录下新建`components`目录
   > `components`用来存放各种UI组件的包
2. 初始化`components`包, 进入`/packages/components`,
   ```sh
   # 初始化 components 包
   pnpm init
   ```
3. 使用`pnpm`安装刚才创建的`utils`包
   ```sh
   pnpm install @my-learn-vite-ui/utils

   # pnpm会自动创建个软链接直接指向我们的utils包；此时components下的packages
   ```

4. 此时`/packages/components/package.json`内容如下：
   > `my-learn-vite-ui/utils`对应的版本为：`workspace:^1.0.0`；因为`pnpm`是由`workspace`管理的，所以有一个前缀`workspace`可以指向`utils`下的工作空间从而方便本地调试各个包直接的关联引用。
   ```json
  {
     "name": "my-learn-vite-ui",
     "version": "1.0.0",
     "description": "",
     "main": "index.js",
     "scripts": {
       "test": "echo \"Error: no test specified\" && exit 1"
     },
     "keywords": [],
     "author": "",
     "license": "ISC",
     "dependencies": {
       "@my-learn-vite-ui/utils": "workspace:^1.0.0"
     }
   }

   ```


### 尝试开始一个`Button`组件
  1. 在`/packages/components/`目录下新建`src`目录；
  2. 在`/packages/components/src`目录下新建`button`, `icons`两个目录
  3. 在`/packages/components/src/button`目录新建两个文件: `button.vue`, `index.ts`;
  4. 内容如下
    ```vue
    <!-- button 内容 -->
    <template>
      <div class="btn">
        测试按钮
      </div>
    </template>
    ```
    ```ts
    // index.ts 内容
    import Button from './button.vue';
    
    export default Button;
    ```
  
### 在`examples`项目中使用button组件
  1. 使用`pnpm` 安装自己的组件库
    ```sh
    # 使用终端进入 examples 根目录
    pnpm install my-learn-vite-ui;
    ```
  2. 在 `/examplex/app.vue` 文件中使用`button`组件
    ```php
      <template>
      <div>
        启动测试
        <Button />
      </div>
      </template>

      <script>
        import { Button } from 'my-learn-vite-ui';
        export default {
            name: "examples-app",
            components: {
                Button
            },
            setup() {
                return {}
            },
        }
      </script>
    ```
    > 不出意外，就可以在页面看到自己的按钮组件了


### 编写`button`组件的`type`文件
  ```ts
   import { ExtractPropTypes } from 'vue';
   // ExtractPropTypes是vue3中内置的类型声明, 作用是接收一个类型，然后把对应的vue3所接收的props类型提供出来，后面有需要可以直接使用
  //  import type 表示只导入类型

   export const ButtonType = ['default', 'primary', 'success', 'warning', 'danger', 'info'];

   export const ButtonSize = ['large', 'normal', 'small', 'mini'];

   export const buttonProps = {
       type: {
           type: String,
           value: ButtonType 
       },
       size: {
           type: String,
           value: ButtonSize
       }
   }

   export type ButtonProps = ExtractPropTypes<typeof buttonProps>;
  ```

### 让组件支持`app.use`注册
  > 需要修改`button`组件的`index.ts`文件
  ```ts
  import Button from './button.vue';
  import { withInstall } from '@my-learn-vite-ui/utils'

  interface ComponentName {
       name: string;
   }
   type SFCWithInstall<T> = T&Plugin;


   const withInstall = <T>(comp: T & ComponentName) => {
       (comp as SFCWithInstall<T>).install = (app: App) => {
           // 注册组件
           app.component(comp.name, comp)
       }
   }

   export const DefaultButton = withInstall(Button);
   export default Button;
  ```

### 配置`vite`打包
1. 在`/packages/components`目录下新建`vite.config.ts`
2. 在文件中新增类容如下
  ```ts
   import { defineConfig } from 'vite';
   import vue from '@vitejs/plugin-vue';
   // 打包cjs(CommonJS)和esm(ESModule)两种形式,
   // cjs模式主要用于服务端引用(ssr),
   // 而esm就是我们现在经常使用的方式，它本身自带treeShaking而不需要额外配置按需引入(前提是你将模块分别导出)
   export default defineConfig({
       build: {
           "target": "modules", // 打包方式为module
           outDir: 'es', // 打包文件目录
           minify: false, // 是否压缩
           // cssCodeSplit: true, // css 分离
           rollupOptions: {
               external: ['vue'], // 忽略打包vue文件
               input: ['src/index.ts'], // 入口文件
               output: [
                   {
                       format: 'es',
                       entryFileNames: '[name].js', // 默认打包为 *.es.js, 这里修改为 *.js
                       preserveModules: true, // 让包目录和现在目录对应
                       dir: 'es', // 配置打包根目录
                       preserveModulesRoot: 'src'
                   }, {
                       format: 'cjs',
                       entryFileNames: '[name].js',
                       preserveModules: true, // 让包目录和现在目录对应
                       dir: 'lib', // 配置打包目录
                       preserveModulesRoot: 'src',
                   }
               ]
           },
           lib: {
               entry: './index.ts',
               formats: ['es', 'cjs']
           }
       },
       plugins: [
           vue()
       ]
   })
  ```

### 处理声明文件'*.d.ts';
> 依赖插件`vite-plugin-dts` 完成
>
1. 安装插件
   ```sh
     pnpm i vite-plugin-dts -D -w
   ```
2. 在`/packages/components/vite.config.ts`文件中配置`vite-plugin-dts` 插件
   ```ts
   // 引入插件
   import dts from 'vite-plugin-dts'; // 处理d.ts 声明文件

   // 配置插件
    {
       plugins: [
        // 新增插件配置
           dts({
               // 指定ts配置文件，这里使用统一的配置，也可以自己在component下新建, 配置对应的路径即可
               tsConfigFilePath: '../../tsconfig.json',
           }),
           
           dts({
               outputDir: 'lib', // 因为这个插件默认打包到es下，我们想让lib目录下也生成声明文件需要再配置一个
               tsConfigFilePath: '../../tsconfig.json', 
           })
       ]
    }
   ```
3. 在`/tsconfig.json`中将`allowJs`, 设置为`true`


### 样式问题
1. 安装样式处理依赖
   ```sh
   pnpm i cpy fast-glob -D -w
   ```
2. `cpy`用来讲指定的文件复制至指定的目录
3. `cpy`插件配置， 在`/packages/compoents`目录下新建文件`copy-less.ts`文件，内容如下
  ```ts
   import copy from 'cpy';
   import { resolve } from 'path';
   // 源文件
   const sourceDir = resolve(__dirname, './src')

   // lib 目录
   const libDir = resolve(__dirname, './lib')

   // es 目录
   const esDir = resolve(__dirname, './es');

   const copyLess = async () => {
       await copy(`${sourceDir}/**/*.less`, libDir)
       await copy(`${sourceDir}/**/*.less`, esDir)
   }

   // 拷贝样式文件
   copyLess();
  ```
4. 使用`cpy`包
   1. 在`/packages/components/package.json`中新加一条`scripts`命令: `"copyLess": "esno ./copy-less"`
   2. 在`/packages/components/src/button`目录中新建一个`index.less`文件，用来测试是否可以拷贝成功
   3. 使用终端进入`/packages/components/`目录，然后运行： `pnpm run copyLess`
   4. 在`/packages/components/es` 和`/packages/components/lib`目录中查看`button/`目录中是否存在`index.less文件`

### `less`文件编译
1. 安装对应的插件
   ```sh
   pnpm i @types/less less -D -w
   ```
2. 更细`/packages/components/copy-less`文件中的配置。新增`less`编译逻辑
   ```ts
   import copy from 'cpy';
   import { resolve, dirname } from 'path';
   import less from 'less';
   import glob from 'fast-glob';
   import { promises as fs } from 'fs'

   // 源文件
   const sourceDir = resolve(__dirname, './src')

   // lib 目录
   const libDir = resolve(__dirname, './lib')

   // es 目录
   const esDir = resolve(__dirname, './es');

   // 编译less
   const buildLess = async () => {
       const srcDir = resolve(__dirname, './src')
       // 获取打包后的.less 目录
       const lessFilePaths = await glob('**/*.less', { cwd: srcDir, onlyFiles: true });
       // console.log('lessFiles', lessFiles)

       // 遍历路径
       lessFilePaths.forEach(async (pathStr: string, idx: number) => {
           // 当前less 文件完整路径
           const filePath = `${srcDir}/${pathStr}`;
           console.log('filePath', filePath)
           // 读取文件内容
           const contents = await fs.readFile(filePath, 'utf-8');

           // less 编译为 css
           const cssContents = await less.render(contents, {
               // 执行 src 下对应目录为
               paths: [srcDir, dirname(filePath)]
           })

           // console.log('cssContents', cssContents, pathStr)
           // 从路径列表拿到当前路径 处理路径
           const cssPath = lessFilePaths[idx].replace('.less', '.css')
           // console.log('cssPath', cssPath)
           
           // 写入css文件至对应的目录
           await fs.writeFile(resolve(libDir, cssPath), cssContents.css);
           await fs.writeFile(resolve(esDir, cssPath), cssContents.css);
       })
   }

   // 首次拷贝
   const copyLess = async () => {
       await copy(`${sourceDir}/**/*.less`, libDir)
       await copy(`${sourceDir}/**/*.less`, esDir)
       buildLess()
   }

   // 拷贝样式文件
   copyLess();
   ```

### 最后处理
1. 在`/packages/components/vite.config.ts`中，修改`external`的内容，让打包忽略`vue, .less文件`
  ```ts
  {
    rollupOptions: {
      external: ['vue', /\.less/],
    }
  }
  ```
2. 在`/packages/components/`目录下新建文件`style-plugin.ts`， 内容如下
  ```ts

   const StylePlugin = () => {
       return {
           name: 'style',
           generateBundle(config:  Record<string, any>, bundle: Record<string, any>) {
               const keys = Object.keys(bundle);
               // bundle 打包后的文件目录以及代码内容
               console.log('bundle', bundle);
               console.log('config', config)
               for (const key of keys) {
                   const bundler: any = bundle[key];
                   // rollup 内置方法，将所有输入文件code中的 .less 文件替换成 .css;
                   this.emitFile({
                       type: 'asset',
                       fileName: key, // 文件名不便
                       source: bundler.code.replace(/\.less/g, '.css')
                   })
               }
           }
       } as any
   }

   export default StylePlugin;
  ``` 
3. 在 `/packages/components/vite.config.ts`中使用自定义组件， 完整配置文件如下
```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts'; // 处理d.ts 声明文件
import style from './style-plugin';
// 打包cjs(CommonJS)和esm(ESModule)两种形式,
// cjs模式主要用于服务端引用(ssr),
// 而esm就是我们现在经常使用的方式，它本身自带treeShaking而不需要额外配置按需引入(前提是你将模块分别导出)
export default defineConfig({
    build: {
        "target": "modules", // 打包方式为module
        outDir: 'es', // 打包文件目录
        minify: false, // 是否压缩
        // cssCodeSplit: true, // css 分离
        rollupOptions: {
            external: ['vue', /\.less/], // 忽略打包vue文件
            input: ['src/index.ts'], // 入口文件
            output: [
                {
                    format: 'es',
                    entryFileNames: '[name].js', // 默认打包为 *.es.js, 这里修改为 *.js
                    preserveModules: true, // 让包目录和现在目录对应
                    dir: 'es', // 配置打包根目录
                    preserveModulesRoot: 'src'
                }, {
                    format: 'cjs',
                    entryFileNames: '[name].js',
                    preserveModules: true, // 让包目录和现在目录对应
                    dir: 'lib', // 配置打包目录
                    preserveModulesRoot: 'src',
                }
            ]
        },
        lib: {
            entry: './index.ts',
            formats: ['es', 'cjs']
        },
    },
    plugins: [
        vue(),
        dts({
            // 指定ts配置文件，这里使用统一的配置，也可以自己在component下新建, 配置对应的路径即可
            tsConfigFilePath: '../../tsconfig.json',
        }),
        
        dts({
            outputDir: 'lib', // 因为这个插件默认打包到es下，我们想让lib目录下也生成声明文件需要再配置一个
            tsConfigFilePath: '../../tsconfig.json', 
        }),
        style()
    ]
})
```