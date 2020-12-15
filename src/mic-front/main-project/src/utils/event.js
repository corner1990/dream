const event = {
  clientList: {},
  listen (key, fn) {
      if (!this.clientList[key]) {
          this.clientList[key] = []
      }
      this.clientList[key].push(fn)   // 订阅的消息添加进缓存列表
  },
  trigger (type, money) {
      let fns = this.clientList[type]
      if (!fns || fns.length === 0) { // 如果没有绑定对应的消息
          return false
      }
      fns.forEach(fn => {
          fn.apply(this, [money])
      })
  }
}
export default event