- build 负责打包的文件夹 gulp 编译ts， 打包样式， 打包单文件组件
- dist 最终打包后的结果输出目录
- packages 存放当前组件库的组件
- typings 配置自己的类型声明
- .npmrc 需要此配置增加文件依赖可以正常使用
- tsconfig ts 配置


### packages
    > components 存放所有组件， 最终通过index.ts 导出
    > theme-chalk 做样式 BEM
    > utils 存放所有模块以来的公共方法