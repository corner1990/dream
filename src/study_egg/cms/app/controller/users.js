'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    const { ctx, service } = this;
    const user = ctx.request.body || { name: 'hello', age: 18 };
    ctx.body = await service.user.create(user);
  }
}

module.exports = UserController;
