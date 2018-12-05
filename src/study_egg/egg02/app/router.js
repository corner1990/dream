module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);
    router.post('/post', controller.home.post);
    router.get('/news', controller.news.list);
    router.get('/login', controller.login.login);
};