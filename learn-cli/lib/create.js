const path = require('path')
const fs = require('fs-extra')
const Inquirer = require('inquirer')
const chalk = require('chalk')
const Creator = require('./Creator')

const createProject = async (projectName, options) => {
  console.log('projectName', projectName)
  // 创建项目
  const cwd = process.cwd(); // 获取当前命令执行的目录
  let targetDir = path.join(cwd, projectName)
  // 判断是否存在当前目录
  if (fs.existsSync(targetDir)) {
    // 是否强制创建
    if (options.force) {
      fs.remove(targetDir)
    } else {
      // 提示用户
      let { action } = await Inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: 'Target directroy is already exists pick an action:',
          choices: [
            { name: 'overwrite', value: 'overwrite' },
            { name: 'cancel', value: 'cancel' },
          ]
        }
      ])
      // 根据用户的选择操作
      if (action == 'overwrite') {
        console.log(`\r\n during ${chalk.red('remove')} ${chalk.cyan(targetDir)} ${chalk.cyan('...')}`)
        fs.remove(targetDir)
        console.log(`\r\n  ${chalk.red('remove')} ${chalk.cyan(targetDir)} ${chalk.blue('success')} \r\n`)
      } else if (action == 'cancel') {
        return false
      }
    }
  }
  // 创建项目
  const create = new Creator(projectName, targetDir)
  create.create()
}

module.exports = createProject;