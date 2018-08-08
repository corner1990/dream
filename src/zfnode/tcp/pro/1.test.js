//  与进程建立链接
// process.argv.forEach(arg => console.log(arg))

// 与父进程痛惜
// process.argv.forEach(arg => process.stdout.write(arg))

process.argv.slice(2).forEach(arg => process.stdout.write(arg))