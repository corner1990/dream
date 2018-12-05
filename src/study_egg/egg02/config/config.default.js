exports.keys = 'test'
// 添加view 配置
exports.view = {
    defaultViewEngine: 'nunjucks', // 配置默认引擎
    defaultExtension: '.html', // 配置模板默认后缀名
    mapping: { // 把模板的后缀和渲染的方法对应关联起来
        '.tpl': 'nunjucks'
    }
}

exports.news = {
    pageSize: 5,
    serverUrl: 'https://hacker-news.firebaseio.com/v0',
};

// 添加中间件
exports.middleware = [
    'robot'
];

exports.robot = {
    ua: [
      /Baiduspider/i,
    ]
  };
//   防止跨域请求，会导致postman无法访问
exports.security = {
    csrf: false
}
