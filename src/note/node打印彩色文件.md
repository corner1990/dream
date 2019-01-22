# node 打印彩色文字

> 我们很多时候都觉得自己使用`console.log`打印的文字看起来太单调，然后看别人写的框架封装的很漂亮。后来发现有一个chalk模块可以实现这个功能，后来就想啊，他们可以，我也可以的，遂百度，整理资料如下

### `chalk` 模块简单使用

- 安装

  ```bash
  npm i chalk
  
  ```

- `chalk`使用

  > 以下是官方demo

  ```js
  const chalk = require('chalk');
  const log = console.log;
   
  // Combine styled and normal strings
  log(chalk.blue('Hello') + ' World' + chalk.red('!'));
   
  // Compose multiple styles using the chainable API
  log(chalk.blue.bgRed.bold('Hello world!'));
   
  // Pass in multiple arguments
  log(chalk.blue('Hello', 'World!', 'Foo', 'bar', 'biz', 'baz'));
   
  // Nest styles
  log(chalk.red('Hello', chalk.underline.bgBlue('world') + '!'));
   
  // Nest styles of the same type even (color, underline, background)
  log(chalk.green(
      'I am a green line ' +
      chalk.blue.underline.bold('with a blue substring') +
      ' that becomes green again!'
  ));
   
  // ES2015 template literal
  log(`
  CPU: ${chalk.red('90%')}
  RAM: ${chalk.green('40%')}
  DISK: ${chalk.yellow('70%')}
  `);
   
  // ES2015 tagged template literal
  log(chalk`
  CPU: {red ${cpu.totalPercent}%}
  RAM: {green ${ram.used / ram.total * 100}%}
  DISK: {rgb(255,131,0) ${disk.used / disk.total * 100}%}
  `);
   
  // Use RGB colors in terminal emulators that support it.
  log(chalk.keyword('orange')('Yay for orange colored text!'));
  log(chalk.rgb(123, 45, 67).underline('Underlined reddish color'));
  log(chalk.hex('#DEADED').bold('Bold gray!'));
  ```

### 到这里应该考虑一下怎么弄的吧

- 先看一个简单的写法

  ```js
  console.log('\033[31m 红色字 \033[0m')
  console.log('\033[41;37m 红底白字 \033[0m')
  ```

- 语法介绍

  ```
  console.log("\033[字背景颜色;文字颜色m字符串\033[0m");
  ```

  - 字背景颜色和文字颜色之间是英文
  - 文字颜色后边有个m
  - 字符串前后可以么有空格，如果有，输出也是相同的空格

- 字体颜色**`30-37`**

  ```js
  console.log( "\033[30m 黑色字 \033[0m", '黑色')
  console.log("\033[31m 红色字 \033[0m")
  console.log("\033[32m 绿色字 \033[0m")
  console.log( "\033[33m 黄色字 \033[0m")
  console.log("\033[34m 蓝色字 \033[0m")
  console.log("\033[35m 紫色字 \033[0m")
  console.log("\033[36m 天蓝字 \033[0m")
  console.log("\033[37m 白色字 \033[0m")
  ```

- 背景颜色范围**`40-47`**

  ```js
  console.log("\033[40;37m 黑底白字 \033[0m")
  console.log("\033[41;37m 红底白字 \033[0m")
  console.log("\033[42;37m 绿底白字 \033[0m")
  console.log("\033[43;37m 黄底白字 \033[0m")
  console.log("\033[44;37m 蓝底白字 \033[0m")
  console.log("\033[45;37m 紫底白字 \033[0m")
  console.log("\033[46;37m 天蓝底白字 \033[0m")
  console.log("\033[47;30m 白底黑字 \033[0m")
  ```

- 控制选项说明

  ```base
  \33[0m 关闭所有属性
  \33[1m 设置高亮度
  \33[4m 下划线
  \33[5m 闪烁
  \33[7m 反显
  \33[8m 消隐
  \33[30m — \33[37m 设置前景色
  \33[40m — \33[47m 设置背景色
  \33[nA 光标上移n行
  \33[nB 光标下移n行
  \33[nC 光标右移n行
  \33[nD 光标左移n行
  \33[y;xH设置光标位置
  \33[2J 清屏
  \33[K 清除从光标到行尾的内容
  \33[s 保存光标位置
  \33[u 恢复光标位置
  \33[?25l 隐藏光标
  \33[?25h 显示光标
  ```

- 简单的封装调用案例

  ```js
  console.error = function (str) {
      console.log("\033[31m " + str + " \033[0m")
  }
  
  console.info = function (str) {
      console.log("\033[36m " + str+ " \033[0m")
  }
  
  console.wran = function (str) {
      console.log("\033[43;37m " + str + " \033[0m")
  }
  console.success = function (str) {
      console.log("\033[32m " + str + " \033[0m")
  }
  
  console.error('error')
  console.info('info')
  console.wran('info')
  console.success('success')
  
  // 优化封装方案
  let customizeFn = {
      error (str) {
          console.log("\033[31m " + str + " \033[0m")
      },
      info (str) {
          console.log("\033[36m " + str+ " \033[0m")
      },
      wran (str) {
          console.log("\033[43;37m " + str + " \033[0m")
      },
      success (str) {
          console.log("\033[32m " + str + " \033[0m")
      }
  }
  console = Object.assign(console, customizeFn)
  
  console.error('error')
  console.info('info')
  console.wran('info')
  console.success('success')
  ```

### 总结

> 这里简单的做了一个使用实例，具体怎么做，看自己需求，可以分装的优雅一点， 我这里图个省事，就这么完了，反正参数都在这里，可以玩出花的，不信自己可以去试试...









