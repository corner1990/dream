const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, 'dist')
  },
  devtool: 'source-map',
  devServer: {
    hot: true,
    port: 3000,
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: {
      index: 'index.html'
    }
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.tex?$/,
        loader: 'ts-loader' // 把ts 进行加载和转义
      },
      {
        enforce: 'pre', // pre normal inline post
        test: /\.tsx?$/,
        loader: 'source-map-loader', // 从源代码总提取sourcemap 方便调试
      },
      {
        test: /\.less?$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(jpg|png|gif|svg)/,
        loader: 'url-loader'
      },

    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}