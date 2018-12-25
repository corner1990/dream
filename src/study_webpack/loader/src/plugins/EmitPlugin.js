class EmitPlugin {
    // 插件的执行时异步的， 异步代码执行后调用callback
    constructor (options) {
        this.options = options
    }
    apply (compiler) {
        compiler.hooks.emit.tapAsync('Emit', function (compilation, callback) {
            console.log('Emit compilation')
            callback()
        })
    }
}

module.exports = EmitPlugin
