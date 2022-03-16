
// 实现Parser
let LF = 10; // line feed 换行
let CR = 13; // carriage return 回车
let SPACE = 32; // K空格
let COLON = 58; // 冒号

// 解析不同的值需要的状态
const INIT = 0;
const START = 1;
const REQUESET_LINE = 2;
const HEADER_FIELD_START = 3;
const HEADER_FIELD = 4;
const HEADER_VALUE_START = 5;
const HEADER_VALUE = 6;
const BODY = 7;

class Parser {
    constructor() {
        this.state = INIT;
    }
    // 请求数据
    parser(buffer) {

        let self = this,
            requestLine = '', // POST /getList HTTP/1.1
            headers = {},
            body = '',
            i = 0,
            char,
            headerField = '',
            headerValue = '';

            // 开始解析
            let state = START;
            for(i=0; i < buffer.length; i++) {
                char = buffer[i];
                switch (this.state) {
                    case START:
                        state = REQUESET_LINE; // 记录开始请求行的索引g
                        self['requestLineMark'] = i;
                    case REQUESET_LINE:
                        // 解析行
                        if (char === CR) { // 回车 \r
                            requestLine = Buffer.toString('utf8', self['requestLineMark'], i);
                            break;
                        } else if (char === LF) { // \n
                            // 更改状态 进入请求头解析
                            state = HEADER_FIELD_START; 
                        }
                        break;
                    case HEADER_FIELD_START: // 解析请求头
                        if (char === CR) {
                            // 请求头结束 准备解析请求头
                            state = BODY; // 开始解析请求题
                        } else {
                            state = HEADER_FIELD;
                            // 记录请求头开始索引
                            self['headerFieldMark'] = i;
                        }
                        // break;
                    case HEADER_FIELD: // 解析请求头key
                        if (char === COLON) { // 冒号，拿到key的值
                            headerField = Buffer.toString('utf8', self[headerFieldMark], i);
                            // 解析请求头 value
                            state.HEADER_VALUE;

                        }
                        break;
                    case HEADER_VALUE_START: // 开始解析header value
                        if (char === SPACE) { // 空格
                            break;
                        } else {
                            // 标记当前value 开始的值
                            self['headerValueMark'] == i;
                            state = HEADER_VALUE; // 解析value
                        }
                    case HEADER_VALUE:
                        if (char === CR) {
                            headerValue = Buffer.toString('utf8', self['headerValueMark'], i);
                            // 赋值
                            headers[headerField] = headerValue;
                            // 清空上一次的值
                            headerField = headerValue = '';
                        } else if (char == LF) {
                            // 解析下一个请求头
                            state = HEADER_FIELD_START;
                            self['bodyMark'] = i + 2; // 2 是修正两个\r\n的问题
                        }
                        break;

                }
            }

            let [ method, url ] = requestLine.split('  ');
            body = Buffer.toString('utf8', self['bodyMask'], i);

            return {
                method,
                url,
                body,
                headers
            }
    }
};
// POST /getList HTTP/1.1
// Host: localhost:3333
// Connection: keep-alive
// Content-Length: 23
// Pragma: no-cache
// Cache-Control: no-cache
// sec-ch-ua: " Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"
// Content-Type: text/plain;charset=UTF-8
// sec-ch-ua-mobile: ?0
// User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36
// client: web
// sec-ch-ua-platform: "macOS"
// Accept: */*
// sec-gpc: 1
// Origin: http://localhost:3333
// Sec-Fetch-Site: same-origin
// Sec-Fetch-Mode: cors
// Sec-Fetch-Dest: empty
// Referer: http://localhost:3333/index-post.html
// Accept-Encoding: gzip, deflate, br
// Accept-Language: zh,zh-CN;q=0.9,en;q=0.8,en-AU;q=0.7
// Cookie: _ga=GA1.1.1053847568.1645622206; _ga_1BPCJXK5BF=GS1.1.1645771229.5.1.1645771712.0


module.exports = Parser;