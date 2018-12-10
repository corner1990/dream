let { app, assert } = require('egg-mock/bootstrap')
/* 
* 测试异步模块有三种写法
* 1. 使用done回调
* 2. 返回promise
* 3. 使用 async await
*/
describe('测试home控制器',  () => {
    // 使用async 测试接口
    // it('测试home接口', async () => {
    //     await app.httpRequest()
    //         .get('/')
    //         .expect(200)
    //         .expect('Hello world')
    // })

    // 使用promse写
    // it('测试home接口', () => {
    //     return app.httpRequest()
    //         .get('/')
    //         .expect(200)
    //         .expect('Hello world')
    // })
    // 使用done方法
    it('测试home接口', done => {
        app.httpRequest()
            .get('/')
            .expect(200, done)
            .expect('Hello world')
    })
    it('测试home post请求', async () => {
        let data = {
            name: 'leo'
        }
        await app.httpRequest()
                .post('/post')
                .type('application/x-www-form-urlencoded') // 指定请求体的类型 ，也可以是表单， form
                .send(data)
                .expect(200)
                .expect(res => {
                    // 可以在在这个函数内部自己做一个对比
                    // res 是服务端的响应对象
                    let { body } = res
                    console.log('res', body)
                    return true
                })
    })
})