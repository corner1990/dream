const { getRepoList, getRepoTags } = require('./request')
const Inquirer = require('inquirer')
const { warpLoading } = require('./utils')
const downdload = require('download-git-repo')
const util = require('util') // node 自带

/**
 * @desc 创建项目类
 */
class Creator {
  constructor(projectName, targetDir) {// 创建实例的时候会调用
    this.name = projectName
    this.target = targetDir
    this.fetchDownLoad = util.promisify(downdload)
  }
  /**
   * @desc 抓取模板
   */
  async fetchRepo() {
    // 失败重新拉取
    let repos = await warpLoading(getRepoList, 'fetch template from github ...')
    // 映射名称
    repos = repos.map(item => item.name)
    // 让用户选择
    let { repo } = await Inquirer.prompt([
      {
        name: 'repo',
        choices: repos,
        type: 'list',
        message: 'please choose a template to create project'
      }
    ])
    // 拿到结果
    return repo
  }
  /**
   * @des 获取tag
   */
  async fetchTag(repo) {
    let tags = await warpLoading(getRepoTags, 'fetch tags from github ...', repo)
    tags = tags.map(tag => tag.name)
    // 用户选择tag
    const { tag } = await Inquirer.prompt([{
      name: 'tag',
      type: 'list',
      message: 'please choose a tag to donwn template',
      choices: tags
    }])
    return tag
  }
  /**
   * @desc 下载模板
   * @param {*} repo 
   * @param {*} tag 
   * @returns { string } 
   */
  async download(repo, tag) {
    // 1. 拼接下载地址
    let path = `zhu-cli/${repo}${tag?'#'+tag: ''}`
    await this.fetchDownLoad(path, this.target)
    return this.target
  }
  /**
   * @des 实例化后创建项目调用
   */
  async create() {
    console.log('创建项目', this)
    // 创建项目
    let repo = await this.fetchRepo()
    // 2. 通过模板找到版本号
    let tag = await this.fetchTag(repo)
    
    // 3. 下载
    let downloadUrl = await this.download(repo, tag)
    console.log()
    console.log('create object success, ')
    console.log('downloadUrl', downloadUrl)
  }
}

module.exports = Creator