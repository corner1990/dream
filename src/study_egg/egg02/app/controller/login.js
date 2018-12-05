const Controller = require('egg').Controller

class LoginController extends Controller {
    async login () {
        await this.ctx.render('login.tpl', {name: 'leo'})
    }
}

module.exports = LoginController
