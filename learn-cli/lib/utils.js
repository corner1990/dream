const ora = require('ora')
const { cache } = require('webpack')
/**
 * @desc 等待函数
 * @param { number } time 等待市场
 * @return void
 */
const sleep = time => new Promise((resolve) => setTimeout(() => resolve(), time))
/**
 * @desc 加载函数
 * @param { function } fn 需要被调用的方法
 * @param { string } msg laoding message
 * @param  {...any} args 需要传递给fn的参数
 */
const warpLoading = async (fn, msg, ...args) => {
  let spinner = ora(msg)
  try {
    let repos = await fn(...args)
    spinner.succeed()
    return repos
  } catch(e) {
    spinner.fail('request faild, refetch...')
    await sleep(100)
    return warpLoading(fn, msg, ...args)
  }

} 

module.exports = {
  warpLoading
}