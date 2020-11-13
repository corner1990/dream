class Promise{
  constructor(fn) {
    this.status = 'inint'
    this.success = []
    this.error = []
    // 回调函数
    let resolve  = res => {
      this.status =  'fulfilled'
      // 调用成功回调函数
      this.success.forEach(fn => fn(res))
    }
    let reject = err => {
      this.status =  'fulfill'
      this.error.forEach(fn => fn(err))
    }

    // 函数事件
    fn(resolve, reject)
  }
  then(success, error) {
    this.success.push(success)
    this.error.push(error)
  }
}

let p = new Promise((resolve, reject)  => {
  setTimeout(() => {
    let num  = Math.random()
    if (num > 0.5) {
      resolve(num)
    } else {
      reject(num)
    }
  }, 1000)
}).then(res => {
  console.log('res', res)
}, err => {
  console.log('err', err)
})