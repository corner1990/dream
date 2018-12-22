const { join } = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        path: join(__dirname, 'dist'),
        filename: 'boundle.js'
    },
    // 配置查找loaders的目录
    resolveLoader: {
        modules: [
            'node_modules',
            join(__dirname, 'src', 'loaders')
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: {
                    loader: join(__dirname, 'src', 'loaders', 'log-loader.js'),
                    options: {
                        name: 'logger'
                    }
                }
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'less-loader']
            }
        ]
    }
}
