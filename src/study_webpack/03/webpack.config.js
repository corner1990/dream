const { resolve } = require('path')
const webpack = require('webpack')
module.exports = {
    entry: resolve(__dirname, 'src/index.js'),
    output: {
        path: resolve(__dirname, 'dist/'),
        filename: 'boundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'happypack/loader?id=babel',
                include: resolve(__dirname,'src'),
                exclude:/node_modules/
            }
        ]
    },
    /* 优化配置 */
    resolve: {
        modules: ['node_modules', 'lib']
    },
    // 在这配置文件内引用另外一个动态链接库
    plugins: [
        new webpack.DllReferencePlugin({
            manifest: resolve(__dirname, 'dist', 'manifest.json')
        })
    ]
}