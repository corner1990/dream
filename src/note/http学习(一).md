# http学习

> [超文本传输协议](https://baike.baidu.com/item/%E8%B6%85%E6%96%87%E6%9C%AC%E4%BC%A0%E8%BE%93%E5%8D%8F%E8%AE%AE/8535513)（HTTP，HyperText Transfer Protocol)是[互联网](https://baike.baidu.com/item/%E4%BA%92%E8%81%94%E7%BD%91)上应用最为广泛的一种[网络协议](https://baike.baidu.com/item/%E7%BD%91%E7%BB%9C%E5%8D%8F%E8%AE%AE/328636)。所有的[WWW](https://baike.baidu.com/item/WWW)文件都必须遵守这个标准。设计HTTP最初的目的是为了提供一种发布和接收[HTML](https://baike.baidu.com/item/HTML)页面的方法。1960年美国人[Ted Nelson](https://baike.baidu.com/item/Ted%20Nelson)构思了一种通过[计算机](https://baike.baidu.com/item/%E8%AE%A1%E7%AE%97%E6%9C%BA/140338)处理文本信息的方法，并称之为超文本（hypertext）,这成为了HTTP超文本传输协议标准架构的发展根基。Ted Nelson组织协调万维网协会（World Wide Web Consortium）和[互联网工程工作小组](https://baike.baidu.com/item/%E4%BA%92%E8%81%94%E7%BD%91%E5%B7%A5%E7%A8%8B%E5%B7%A5%E4%BD%9C%E5%B0%8F%E7%BB%84/6992977)（Internet Engineering Task Force ）共同合作研究，最终发布了一系列的[RFC](https://baike.baidu.com/item/RFC)，其中著名的RFC 2616定义了HTTP 1.1。

### http请求格式

> HTTP请求格式主要有四部分组成，分别是：请求行、请求头、空行、消息体，每部分内容占一行

```
<request-line>
<general-headers>
<request-headers>
<entity-headers>
<empty-line>
[<message-body>]
```

- **请求行**：请求行是请求消息的第一行，由三部分组成：分别是请求方法（GET/POST/DELETE/PUT/HEAD）、请求资源的URI路径、HTTP的版本号.例如： ` GET /index.html HTTP/1.1`

- **请求头**：请求头中的信息有和缓存相关的头（Cache-Control，If-Modified-Since）、客户端身份信息（User-Agent）等等。例如：

  ```
  Cache-Control:max-age=0
  Cookie:gsScrollPos=; _ga=GA1.2.329038035.1465891024; _gat=1
  If-Modified-Since:Sun, 01 May 2016 11:19:03 GMT
  User-Agent:Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36
  ```

- **消息体**：请求体是客户端发给服务端的请求数据，这部分数据并不是每个请求必须的。

### HTTP 响应格式

> 服务器接收处理完请求后返回一个HTTP相应消息给客户端。HTTP响应消息的格式包括：状态行、响应头、空行、消息体。每部分内容占一行。

```
<status-line>
<general-headers>
<response-headers>
<entity-headers>
<empty-line>
[<message-body>]
```

- **状态行**：状态行位于相应消息的第一行，有HTTP协议版本号，状态码和状态说明三部分构成。如：`HTTP/1.1 200 OK`

- **响应头**：响应头是服务器传递给客户端用于说明服务器的一些信息，以及将来继续访问该资源时的策略。例如：

  ```
  Connection:keep-alive
  Content-Encoding:gzip
  Content-Type:text/html; charset=utf-8
  Date:Fri, 24 Jun 2016 06:23:31 GMT
  Server:nginx/1.9.12
  Transfer-Encoding:chunked
  ```

- **响应体**：响应体是服务端返回给客户端的HTML文本内容，或者其他格式的数据，比如：视频流、图片或者音频数据。

### URI

> URI(Uniform Resource Identifier)是统一资源标识符,在某个规则下能把这个资源独一无二标示出来，比如人的身份证号

- Uniform 不用根据上下文来识别资源指定的访问方式
- Resource 可以标识的任何东西
- Identifier 表示可标识的对象

### URL

> 统一资源定位符，表示资源的地点，URL时使用浏览器访问WEB页面时需要输入的网页地址

- Uniform 不用根据上下文来识别资源指定的访问方式

- Resource 可以标识的任何东西

- Location 定位

- URL的格式

  - 协议类型
  - 登录信息
  - 服务器地址
  - 服务器端口号
  - 带层次的文件路径
  - 查询字符串
  - 片段标识符

  ```
  https://root:pass@www.demo.com:80/dist/index.html?name=leo#ch1
  ```

### 状态码

> 状态码负责表示客户端请求的返回结果、标记服务器端是否正常、通知出现的错误

- 状态码类别

| 类别 | 原因短语                       |
| ---- | ------------------------------ |
| 1XXX | Informational(信息性状态码)    |
| 2XXX | Success(成功状态码)            |
| 3XXX | Redirection(重定向)            |
| 4XXX | Client Error(客户端错误状态码) |
| 5XXX | Server Error(服务器错误状态吗) |

- 2xxx 成功
  - 200（OK客户端发过来的数据被正常处理）
  - 204（Not Content 正常响应，没有实体）
  - 206（Partial Content 范围请求，返回部分数据，响应报文中由Content-Range指定实体内容）
- 3xxx 重定向
  - 301（Moved Permanently）永久重定向
  - 302（Found）临时重定向，规范要求方法明不变，但是都会改变
  - 303（See Other）和302类似，但必须用GET方法
  - 304（Not Modified）状态未改变，配合（If-Match、If-Modified-Since、If-None_Match、If-Range、If-Unmodified-Since）
  - 307(Temporary Redirect) 临时重定向，不该改变请求方法
- 4xxx 客户端错误
  - 400(Bad Request) 请求报文语法错误
  - 401 (unauthorized) 需要认证
  - 403(Forbidden) 服务器拒绝访问对应的资源
  - 404(Not Found) 服务器上无法找到资源
- 5xxx 服务端错误
  - 500(Internal Server Error)服务器故障
  - 503(Service Unavailable) 服务器处于超负载或正在停机维护

### 常见HTTP头部字段

- 常见通用字段

  | 首部字段名       | 说明                       |
  | ---------------- | -------------------------- |
  | Cache-Control    | 控制缓存行为               |
  | Connection       | 链接的管理                 |
  | Date             | 报文日期                   |
  | Pragma           | 报文指令                   |
  | Trailer          | 报文尾部的首部             |
  | Trasfer-Encoding | 指定报文主体的传输编码方式 |
  | Upgrade          | 升级为其他协议             |
  | Via              | 代理服务器信息             |
  | Warning          | 错误通知                   |

- 请求首部字段

  | 首部字段名          | 说明                                        |
  | ------------------- | ------------------------------------------- |
  | Accept              | 用户代理可处理的媒体类型                    |
  | Accept-Charset      | 优先的字符集                                |
  | Accept-Encoding     | 优先的编码                                  |
  | Accept-Langulage    | 优先的语言                                  |
  | Authorization       | Web认证信息                                 |
  | Expect              | 期待服务器的特定行为                        |
  | From                | 用户的电子邮箱地址                          |
  | Host                | 请求资源所在的服务器                        |
  | If-Match            | 比较实体标记                                |
  | If-Modified-Since   | 比较资源的更新时间                          |
  | If-None-Match       | 比较实体标记                                |
  | If-Range            | 资源未更新时发送实体Byte的范围请求          |
  | If-Unmodified-Since | 比较资源的更新时间(和If-Modified-Since相反) |
  | Max-Forwards        | 最大传输跳数                                |
  | Proxy-Authorization | 代理服务器需要客户端认证                    |
  | Range               | 实体字节范围请求                            |
  | Referer             | 请求中的URI的原始获取方                     |
  | TE                  | 传输编码的优先级                            |
  | User-Agent          | HTTP客户端程序的信息                        |

- 响应部字段

  | 首部字段名         | 说明                         |
  | ------------------ | ---------------------------- |
  | Accept-Ranges      | 是否接受字节范围             |
  | Age                | 资源的创建时间               |
  | ETag               | 资源的匹配信息               |
  | Location           | 客户端重定向至指定的URI      |
  | Proxy-Authenticate | 代理服务器对客户端的认证信息 |
  | Retry-After        | 再次发送请求的时机           |
  | Server             | 服务器的信息                 |
  | Vary               | 代理服务器缓存的管理信息     |
  | www-Authenticate   | 服务器对客户端的认证         |

- 实体首部字段

  | 首部字段名       | 说明                       |
  | ---------------- | -------------------------- |
  | Allow            | 资源可支持的HTTP方法       |
  | Content-Encoding | 实体的编码方式             |
  | Content-Language | 实体的自然语言             |
  | Content-Length   | 实体的内容大小(字节为单位) |
  | Content-Location | 替代对应资源的URI          |
  | Content-MD5      | 实体的报文摘要             |
  | Content-Range    | 实体的位置范围             |
  | Content-Type     | 实体主体的媒体类型         |
  | Expires          | 实体过期时间               |
  | Last-Modified    | 资源的最后修改时间         |













