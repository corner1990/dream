const path=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
let CleanWebpackPlugin = require('clean-webpack-plugin')
// const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
// let cssExtract = new ExtractTextWebpackPlugin('css/css.css')

module.exports={
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename:'bundle.js'
    },
    module: {
    	rules: [
    		{
    			test: /\.css$/,
                loader: [ 'css-loader', 'less-loader' ]
    			// loader: cssExtract.extract({
       //              fallback: 'style-loader' // 在这里配置使用style-loader
       //              use: [ 'css-loader', 'less-loader' ],
       //          })
    		},
    		{
    			 test:/\.(jpg|png|bmp|gif|svg|ttf|woff|woff2|eot)/,
    			 use: [{
    			 	loader: 'url-loader',
    			 	options: {limit: 4096}
    			 }]
    		},
            {
                test: /\.(html|htm)$/,
                use: 'html-withimg-loader'
            },
            {
               test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options:{
                     "plugins": [
                        ["@babel/plugin-proposal-decorators", { "legacy": true }],
                        ["@babel/plugin-proposal-class-properties", { "loose" : true }]
                     ]
                    }
                },
                include: path.join(__dirname,'src'),
                exclude:/node_modules/
            }
    	]
    },
    plugins: [
        //  清除废弃文件配置
        new CleanWebpackPlugin(['dist']),
    	new HtmlWebpackPlugin({
    		minify: {
	            removeAttributeQuotes:true
	        },
	        hash: true,
	        template: './src/index.html',
	        filename:'index.html',
	        title: 'testTitle',
            chunks: []
    	}),
    	new webpack.ProvidePlugin({
    		_: 'lodash'
    	}),
    	new webpack.BannerPlugin('test BannerPlugin'),
        // cssExtract,
    ],
    devServer: {
    	contentBase: path.resolve(__dirname, 'dist'),
    	host: 'localhost',
    	compress: true,
    	port: 8080
    },
    devtool: 'source-map', // 单独文件，可以定位到那一列出错了
    // devtool: 'cheap-module-source-map', // 单独文件，体积更小，但只能
    // devtool: 'eval-source-map', // 不会单独生城文件
    // devtool: 'source-map', // 单独文件，可以定位到那一列出错了

}
