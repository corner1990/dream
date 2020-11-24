// 命令模式
// 执行命令时，发布者和执行者分开
// 中间加入命令对象，作为中转站

// 三种角色

// Receiver接受者角色：该角色就是干活的角色，命令传递到这里是应该被执行的
// Command命令角色：需要执行的所有命令都在这里声明
// Invoker调用者角色：接收到命令，并执行命令
// 做饭对象
class Cooker{
  constructor(name) {
    this.name = name
    this.count = 0
  }
  /**
   * @desc 准备做饭
   */
  cook() {
    console.log(`${this.name}开始做饭...`)
    setTimeout(() => {
      this.cookpend()
    }, 300)
  }
  // 做饭中
  cookpend() {
    if (this.count < 3) {
      console.log(`${this.name}正在做饭...`)
      this.count += 1
      setTimeout(() => {
        this.cookpend()
      }, 300)
      return false
    }
    this.cookend()
  }
  // 做完饭了
  cookend() {
    this.count = 0
    console.log(`${this.name}将做好的菜上到了餐桌`)
  }
}
class Cleaner{
  constructor(name) {
    this.name = name
    this.count = 0
  }
  /**
   * @desc 准备打扫卫生
   */
  clean() {
    console.log(`${this.name}开始打扫卫生...`)
    setTimeout(() => {
      this.cleanpend()
    }, 300)
  }
  // 做饭中
  cleanpend() {
    if (this.count < 3) {
      console.log(`${this.name}正在打扫卫生...`)
      this.count += 1
      setTimeout(() => {
        this.cleanpend()
      }, 300)
      return false
    }
    this.cleanend()
  }
  // 做完饭了
  cleanend() {
    this.count = 0
    console.log(`${this.name}打扫完卫生后，并将门窗关好!`)
  }
}

class CookCommand{
  constructor(cooker) {
      this.cooker=cooker;
  }
  execute() {
      this.cooker.cook();
  }
}
class CleanCommand{
  constructor(cleaner) {
      this.cleaner=cleaner;
  }
  execute() {
      this.cleaner.clean();
  }
}
// 调用模型
class Customer{
  constructor(command) {
      this.command=command;
  }
  cook() {
    this.command.execute();
  }
  clean() {
    this.command.execute();
  }
}

// 创建做饭实例
const cooker = new Cooker('张阿姨')
const cookCommand = new CookCommand(cooker)
// cooker.cook()
let custom = new Customer(cookCommand)
// 调用cook敏命令
// custom.cook()


const clean = new Cleaner('李大叔')
const cleanCommand = new CleanCommand(clean)
// clean.clean()
custom.command = cleanCommand
// 调用clean 命令
custom.clean()