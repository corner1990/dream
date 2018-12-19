const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'boundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins:[['import',{library:'lodash'}]]
                    }
                }
            }
        ]
    }
}