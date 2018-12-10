
const {app, assert} = require('egg-mock/bootstrap')
describe('测试response的扩展功能', function () {
    it('测试isOk功能是否正常', async () => {
       
        let ctx =  app.mockContext()
        ctx.status = 200
        assert(ctx.response.isOk)
    })
})