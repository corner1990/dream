'use strict';

module.exports = app => {
  return class UserService extends app.Service {
    async create(user) {
      const { app } = this;
      console.log('app.redis.', user);
      const res = await app.redis.hgetall('mm');
      return res;
    }
  };
};
