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
    toBase64 (str) {
        // 转化为base64
        return Buffer.from(str).toString('base64')
    },
    sign (str, secret) {
        return require('crypto').createHmac('sha256', secret).update(str).digest('base64')
    },
    encode (payload, secret) {
        let header = this.toBase64(JSON.stringify({typ: 'JWT', alg: 'HS256'}))
        let content = this.toBase64(JSON.stringify(payload))
        // 签名使用header + . + content
        let sign = this.sign([header,content].join('.'), secret)
        return [header, content, sign].join('.')
    }
}

export default jwt