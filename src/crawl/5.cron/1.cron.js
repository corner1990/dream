// const CronJob = require('cron').CronJob;
// const job = new CronJob('* * * * *', function () {
//     console.log('每秒')
// }) 
// job.start()

// cron用来周期性的执行某种任务或等待处理某些事件的一个守护进程


 
const chalk = require('chalk');
const log = console.log;
 
// Combine styled and normal strings
log(chalk.blue('Hello') + ' World' + chalk.red('!'));
 
console.log( "\033[30m 黑色字 \033[0m", '黑色')
console.log("\033[31m 红色字 \033[0m")
console.log("\033[32m 绿色字 \033[0m")
console.log( "\033[33m 黄色字 \033[0m")
console.log("\033[34m 蓝色字 \033[0m")
console.log("\033[35m 紫色字 \033[0m")
console.log("\033[36m 天蓝字 \033[0m")
console.log("\033[37m 白色字 \033[0m")

console.log("\033[40;37m 黑底白字 \033[0m")
console.log("\033[41;37m 红底白字 \033[0m")
console.log("\033[42;37m 绿底白字 \033[0m")
console.log("\033[43;37m 黄底白字 \033[0m")
console.log("\033[44;37m 蓝底白字 \033[0m")
console.log("\033[45;37m 紫底白字 \033[0m")
console.log("\033[46;37m 天蓝底白字 \033[0m")
console.log("\033[47;30m 白底黑字 \033[0m")

let obj = {
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
console = Object.assign(console, obj)
console.error('error')
console.info('info')
console.wran('info')
console.success('success')
