const path = require('path')
const webpack = require('webpack')
module.exports = {
    entry: {
        react: ['react', 'react-dom']
    },
    /* 
    * target:
    *   '_dll__[name]'指定的是导出变量的名称
     */
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_dll.js',
        library: '_dll_[name]', // 其他模块会从次变量名上获取到里边的模块哦
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader'
                },
                include: path.join(__dirname,'src'),
                exclude:/node_modules/
            }
        ]
    },
    //  manifest.json表示一个文件描述
    plugins: [
        new webpack.DllPlugin({
            name: '_dll_[name]', // 动态插件名称，和output保持一致
            path: path.join(__dirname, 'dist', 'manifest.json')
        })
    ]
}