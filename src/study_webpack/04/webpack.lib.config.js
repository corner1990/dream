const { resolve } = require('path')
const webpack = require('webpack')
module.exports = {
    entry: resolve(__dirname, 'src/lib.js'),
    output: {
        path: resolve(__dirname, 'dist/'),
        filename: 'boundle.js',
        // libraryTarget: 'var',
        libraryTarget: 'window',
        library: 'getName', // 全局变量名称
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader'
                },
                include: resolve(__dirname,'src'),
                exclude:/node_modules/
            }
        ]
    },
    /* 优化配置 */
    resolve: {
        modules: ['node_modules', 'lib']
    }
}