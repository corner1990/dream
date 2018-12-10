let http = require('http')

http.createServer((req, res) => {
    if (req.url === '/read') {
        console.log(req.headers.cookie) /
        res.end(req.headers.cookie)
    } else if (req.url === '/write') {
        // 简单设置
        // res.setHeader('Set-Cookie', [
        //     'name=helloword',
        //     'age=9'
        // ])

        // 添加Domain
        //只有在xxx.com下才能看的到 Domain
        // res.setHeader('Set-Cookie', [
        //     'name=helloword; Domain=text.cn; path=/', 
        //     'age=9'
        // ])


        // 设置客户端不能修改cookie  httpOnly
        res.setHeader('Set-Cookie', [
            'name=helloword; Domain=text.cn; path=/; httpOnly=true;', 
            `age=9`
            
        ])

        // 设置过期时间
        // Expires 相对时间
        // max-age 绝对时间
        res.setHeader('Set-Cookie', [
            'name=helloword; Domain=text.cn; path=/; httpOnly=true;', 
            `age=9; Expires=${new Date(Date.now() + 1000 * 10).toGMTString()}`,
            `address=nanshan; max-age=10`
        ])
        // console.log(res)
        res.end('write ok')
    } else {
        res.end('404')
    }
}).listen(3000)