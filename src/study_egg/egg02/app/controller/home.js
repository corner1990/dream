const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'Hello world';
  }
  async post () {
      this.ctx.body = {
          name: 'leo',
          age: 16,
          hobby: 'sing readbook runing swimming'
      }
  }
}

module.exports = HomeController;