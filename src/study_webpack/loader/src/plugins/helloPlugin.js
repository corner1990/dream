class HelloPlugin {
    constructor (options) {
        this.options = options
        // console.log(this.options)
    }
    // 每个插件都需要提供一个apply方法
    apply1 (compiler) { // 老的写法
        // compiler要重新启动一次新的编译
        compiler.plugin('compilation', function (compilation) {
            compilation.plugin('optimize-chunk-modules', function () {
                console.log('hello optimize')
            })
        })
    }
    apply (compiler) {
        // compiler要重新启动一次新的编译
        compiler.hooks.compilation.tap('compilation', function (compilation, params) {
            compilation.hooks.optimizeChunkModules.tap('optimizeChunkModules', function (chunks, modules) {
                console.log(chunks)
                console.log(modules)
            })
        })
    }
}

module.exports = HelloPlugin
