//  给context添加属性
module.exports = {
    get isChrome () {
        let useAgent = this.get('user-agent')
        return useAgent.toLowerCase().includes('chrome')
    }
}