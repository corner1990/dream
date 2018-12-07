'use strict';

module.exports = app => {
  return class UserService extends app.Service {
    async create(user) {
      const { app } = this;
      console.log('app.redis.', user, app.redis.hset);
      const res = await app.redis.hset('name', 'hname', 'age', '18');
      return res;
    }
  };
};
