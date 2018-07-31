// 多语言切换 vue-i18n
// 可以支持语言切换
// Accept-Language:[zh-CN,zh;q=0.9,en;q=0.8,fr-FR;q=0.7]
// 服务器端支持多语言
let pack = {
    'zh-CN': {content: '你好'},
    'en': {content: 'hello'},
    'fr-FR': {content: 'BNonjour'}
}
let http = require('http')
// 完成参数分割
const server = http.createServer((req, res) => {
    // 1.拿到请求头，做分析
    let lan = 'en' //默认是英文
    let language = req.headers['accept-language']  || ''
    let arrs
    // 判断是否支持多语言
    if (language) {
        // [zh-CN,zh;q=0.9,en;q=0.8,fr-FR;q=0.7]
        arrs = language.split(',').map(item => {
            // [zh;q=9, en:q=0.8]
            item = item.split(';')
            return {
                name: item[0],
                // [zh,'q=0.9']
                q: item[1] ? (item[1].split('=')[1]  - 0) : 1
            }
        })
        // 为了处理权重，这里倒叙，拿到权重最大的值
        arrs = arrs.sort((item1, item2) => item2.q - item1.q)

        // 在本地语言包拿内容
        for (var i =0; i< arrs.length; i++) {
            let name = arrs[i].name
            // 如果语言包里有内容，就返回内容
            if(pack[name]) {
                // res.end(pack[name].content)
                lan = name;
                break;
            }
        }
        // console.log(arrs)
    }
    res.setHeader('content-type', 'text/plain;charset=utf8;')
    res.end(pack[lan].content)
}) 

server.listen('5000')