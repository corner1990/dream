
// 实现CMLHttpRequest 对象
const net = require('net');
const ReadyState = {
    UNSENT: 0,
    OPENED: 1,
    HEADERS_RECEIVED: 2,
    LOADING: 3,
    DONE: 4,
}

class XMLHttpRequest {
    // 请求状态
    readyState = 0;
    timeout = 1000;
    constructor() {
        this.readyState = ReadyState.UNSENT; // 未调用 默认未0
        this.headers = {
            'Connection': 'keep-alive'
        }; // 请求头
    }
    
    // 打开链接
    open(method, url) {
        this.method = method || 'GET';
        this.url = url;

        // 解析参数
        const { hostname, port, path } = require('url').parse(url);
        this.headers['Host'] = `${hostname}:${port}`;
        // 和服务器创建链接
        const socket = this.socket = net.createConnection({ hostname, port }, () => {
            // 设置状态
            this.readyState = ReadyState.OPENED;
            this.onreadystatechange();
            // 监听服务的数据
            socket.on('data', data => {
                data = data.toString();
                // console.log('data', data);
                // 处理响应
                // 解析响应头和响应体
                const [respnse, bodyRows] = data.split('\r\n\r\n');

                let [ statusLine, ...headersRows ] = respnse.split('\r\n');
                let [ , status, statusText ] = statusLine.split(' ');

                this.status = parseInt(status);
                this.statusText = statusText;

                // 处理参数
                const responseHeaders = headersRows.reduce((memo, row) => {
                    const [key, val] = row.split(': ');
                    memo[key] = val;

                    return memo;
                }, {})
                this.responseHeaders = responseHeaders;
                // 设置状态
                this.readyState = ReadyState.HEADERS_RECEIVED;
                this.onreadystatechange();

                // 解析响应内容
                const [, body, ] = bodyRows.split('\r\n');
                // 设置状态
                this.readyState = ReadyState.LOADING;
                this.onreadystatechange();


                this.response = this.responseText = body;
                // 设置状态
                this.readyState = ReadyState.DONE;
                this.onreadystatechange();
                this.onload && this.onload()

            })
        })

        
    }
    // 设置响应头
    setRequestHeader(header, value) {
        this.headers[header] = value;
    }
    // 状态发生变化
    onreadystatechange() {}
    // 返回头部
    getAllResponseHeaders() {
        let result = '';
        for(let key in this.responseHeaders) {
            result += `${key}: ${this.responseHeaders[key]}`
        }
        return result;
    }
    // 返回头部 某一个属性
    getAllResponseHeader(key) {
       
        return  `${key}: ${this.responseHeaders[key]}`;
    }
    // 发送请求
    send(body) {
        let rows = [];
        rows.push(`${this.method} ${this.url} HTTP/1.1`)
        this.headers['Content-Length'] = Buffer.byteLength(body).toString();

        // 设置响应头参数
       const headers =  Object.keys(this.headers).map(key=> `${key}: ${this.headers[key]}`)
        // 合并
       rows.push(...headers);
        //    处理请求头
       const request = rows.join('\r\n')+'\r\n\r\n'+body
       
        //  客户端给服务器发送消息
       this.socket.write(request)
    }

}

module.exports = XMLHttpRequest;
