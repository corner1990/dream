class demo {
    constructor (opts) {
        this.options = opts
    }
    apply (compiler) {
        compiler.hooks.compilation.tap('CompilationPlugin', function (compilation) {
            complation.hooks.optimize.tap('optimize', function () {
                console.log(`资源正在优化`)
            })
        })
    }
}