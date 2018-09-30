function createMiddleware () {
   function sageMiddelware ({getState, dispatch}) {
       function createChannel () {
           let taker = {}
           function subscribe(actionType, fn) {
               taker[actionType] = fn
           }
           function publish (action) { // {type: "ADD_ASYNC"}
               // 查看是否有函数监听
            //    debugger
               let tmp = taker[action.type]
                // 如果有监听，则执行监听函数，并删除对象属性
               if(tmp) {
                   delete taker[action.type]
                   tmp(action)
               }
           }
           return {subscribe, publish, taker}
       }
       let channel = createChannel()
       /**
        * 负责执行完毕generator
        * @param {function} generator 
        */
       function run (generator) {
           let it = generator() // 第一次调用，拿到一个迭代器
           function next (input) {
                let {value: effect, done} = it.next(input) // 拿到take函数执行后的结果
                if (!done) {
                    // 如果迭代器没有执行完毕，则继续执行

                    // 判断是不是一个迭代器函数
                    // effect[Symbol.iterator] 如果这个属性是一个function的话，就是一个generator函数
                    if (typeof effect[Symbol.iterator] === 'function') {
                        run(effect)
                        next() // 不需要这个run执行结束，就可以调用next了
                    }
                    switch(effect.type) {
                        case 'take':
                            // take 等待一个动作发生
                            // 相当于注册一个监听
                            let { actionType } = effect
                            channel.subscribe(actionType, next)
                        break
                        case 'put': 
                            // 派发动作
                            let { action } = effect
                            console.log('put')
                            dispatch(action)
                            next(action)
                        break
                        case 'fork':
                            let {worker} = effect
                            run(worker)
                            next()
                        break
                        default:
                        break
                    }
                }
           }
           next()
       }
       sageMiddelware.run = run
       return function (next) {
           return function (action) {
               // 发布动作
               channel.publish(action)
               next(action)
           }
       }
   }
   return sageMiddelware
}
export default createMiddleware