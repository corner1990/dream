// 扩展一个应用级缓存的功能
// app.cache

let memoryCache = {}

module.exports = {
    cache: {
        set(key, val) {
            memoryCache[key] = val 
        },
        get(key) {
            return memoryCache[key]
        }
    }
}