# 学习手写cli
### 创建一个可执行脚本
```js
#! /usr/bin/env node
```

### 配置package中的bin字段
```json
{
  "bin": "./bin/cli",
}
// 配置别名
{
  "bin": {
    "cli": "./bin/cli",
    "crumb-cli": "./bin/cli"
  },
}
```

### 使用命令链接到本地
> 会根据package.json 中的name创建包名
```bash
npm link
or
npm link --force
```
#### 删除链接
```bash
npm unlink cli name
```

### 配置可执行命令 commander
```js

```

### 命令行交互开发 inquirer

### 将模板下载 download-git-repo

### 根据用户的选择，动态生成内容 metalmith
