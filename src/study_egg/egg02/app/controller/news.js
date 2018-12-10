const Controller = require('egg').Controller

class NewsController extends Controller {
    async list () {
        const ctx = this.ctx
        const page = ctx.query.page || 1

        const list = await ctx.service.news.list(page)
        // console.log('newsList', newsList)
        await this.ctx.render('news/list.tpl', {list})
    }
}

module.exports = NewsController
