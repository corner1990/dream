// 生成一个md文件，里边放着所有的文件名
class FilesPlugin{
    constructor (options) {
        this.options = {name: 'filelist.md', ...options}
    }
    // 监听那个时间
    apply (compiler) {
        console.log('files')
        compiler.hooks.emit.tapAsync('FilesPlugin', (compilation, callback) => {
            console.log('compilation', compilation.assets)

            let content = '## 文件内容\n\n'
            // Object.keys(compilation.assets).map()
            for (let attr in compilation.assets) {
                content += `- ${attr} \n`
            }
            compilation.assets[this.options.name] = {
                source () {
                    return content
                },
                size () {
                    return Buffer.byteLength(content)
                }
            }
            callback()
        })
    }
}

module.exports = FilesPlugin
