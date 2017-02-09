/**
 * Vue.1.0 Demo
 * Created By umiyo
 * 2016/11/16
 * Just recapitulate the essential points of Vue 1.0.
 */
// Easy to operate path, the Path module was introduced.
// require: ES6
// import: ES5
var path = require('path');
// To merge loaders with webpack-merge module.
var merge = require('webpack-merge');
var webpack = require('webpack');
// Division css file.
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// Simplify the creation of bundles webpack call HTML document.
var HtmlWebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);

module.exports = {
	entry: {
		'index': path.resolve(ROOT_PATH, 'src/app.js')
	},
	output: {
		path: path.resolve(ROOT_PATH, 'dist/assets'),
		filename: 'js/[name].[chunkhash].js'
	},
	resolve: {
		extensions: ['', '.js', '.vue'],
		alias: {
			'src': path.resolve(__dirname, 'src')
		}
	},
	module: {
		loaders: [
			{ test: /\.vue$/, loader: 'vue'},
			{ test: /\.js$/, loader: 'babel', exclude: /node_modules/}
		]
	},
	vue: {
		loaders: {
			js: 'babel',
			css: ExtractTextPlugin.extract('style-loader', 'css-loader')
		}
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new ExtractTextPlugin('css/[name].[chunkhash].css'),
		new HtmlWebpackPlugin({
			filename: path.resolve(ROOT_PATH, 'dist/index.html'),
			template: path.resolve(ROOT_PATH, 'index.template.html')
		})
	],
	devServer: {
		hot: true
	}
}
