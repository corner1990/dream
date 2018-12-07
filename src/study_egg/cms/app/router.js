'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  //  RESTful 风格的 URL 定义
  router.resources('posts', '/users', controller.users);
};
