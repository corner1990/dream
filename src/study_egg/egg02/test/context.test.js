
const {app, assert} = require('egg-mock/bootstrap')
describe('测试context的扩展功能', function () {
    it('测试isCheome功能是否正常', async () => {
        // ctx.get(key) = ctx.request.headers[key]
        // 添加请求头
        let ctx = app.mockContext({
            headers: {
                'user-agent': 'I love chrome ver much!'
            }
        })
        assert(ctx.isChrome)
    })
})