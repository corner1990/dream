const {app, assert} = require('egg-mock/bootstrap')

describe('测试新闻服务', function () {
    it('测试获取新闻列表接口', async function () {
        let ctx = app.mockContext()
        let items = await ctx.service.news.list()
        assert(items.length === 5)
    })
})
