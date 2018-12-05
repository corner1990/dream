// heaper
const {app, assert} = require('egg-mock/bootstrap')
describe('测试header的扩展功能', function () {
    it('测试sum功能是否正常', async () => {
        let ctx = app.mockContext()
        assert(ctx.helper.sum(1, 2) === 3)
    })
})