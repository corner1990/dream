
const {app, assert} = require('egg-mock/bootstrap')
describe('测试application的扩展功能', function () {
    it('测试缓存功能是否正常', async () => {
        app.cache.set('name', 'leo')
        assert(app.cache.get('name') === 'leo')
    })
})