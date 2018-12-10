# jwt原理学习

> 恩么么，用着用着就想知道实现对不对，我也想知道，然后就有了这个。。。。。。

### 开发前的思考

- 我们通过调用，发现引入的是一个对象，这个对象对外暴露了两个方法，encode和decode，
- 我们通过encode创建token，使用decode效验token。
- 下边是实现

```javascript
// 1.创建对象，并暴露出两个方法
let jwt = {
    decode (token, secret) {
    },
   
    encode (payload, secret) {
    }
}

export default jwt
```

### 实现逻辑 创建token
- 拿到header
-  拿到需要传递的信息content
-  拿header和content得到签名，
-  最后返回签名
```javascript

let jwt = {
    decode (token, secret) {
    },
    fromBase64ToString (str) {
        return Buffer.from(str, 'base64').toString('utf8')
    },
    
    // 实现一个工具方法，转base64
    toBase64 (str) {
        // 转化为base64
        return Buffer.from(str).toString('base64')
    },
    // 实现签名的方法 接受一个str和我们的密钥
    sign (str, secret) {
        return require('crypto').createHmac('sha256', secret).update(str).digest('base64')
    },
    // 对外暴露的函数
    encode (payload, secret) {
        let header = this.toBase64(JSON.stringify({typ: 'JWT', alg: 'HS256'}))
        let content = this.toBase64(JSON.stringify(payload))
        // 签名使用header + . + content
        let sign = this.sign([header,content].join('.'), secret)
        return [header, content, sign].join('.')
    }
}

export default jwt
```

### 实现效验

- 使用分割拿到header，content，sign
- 将header和content转换成utf8编码
- 然后再用header和content以及密钥生成新的签名，
- 对比以后，如果不一样则直接报错，相同的话返回content

```javascript

let jwt = {
    decode (token, secret) {
        let [header, content, sign] = token.split('.')
        let h = JSON.parse(this.fromBase64ToString(header))
        let c = JSON.parse(this.fromBase64ToString(content))
        if (sign !== this.sign([header,content].join('.'), secret)) {
            throw new Error('Not allowd')
        }
        return content
    },
    fromBase64ToString (str) {
        return Buffer.from(str, 'base64').toString('utf8')
    },
    
    // 实现一个工具方法，转base64
    toBase64 (str) {
        // 转化为base64
        return Buffer.from(str).toString('base64')
    },
    // 实现签名的方法 接受一个str和我们的密钥
    sign (str, secret) {
        return require('crypto').createHmac('sha256', secret).update(str).digest('base64')
    },
    // 对外暴露的函数
    encode (payload, secret) {
        let header = this.toBase64(JSON.stringify({typ: 'JWT', alg: 'HS256'}))
        let content = this.toBase64(JSON.stringify(payload))
        // 签名使用header + . + content
        let sign = this.sign([header,content].join('.'), secret)
        return [header, content, sign].join('.')
    }
}

export default jwt
```

### 总结

> 这里是简单的实现，如果想要添加更多的参数，自己动手就好了，反正又不难