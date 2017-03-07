var path=require('path');
var Webpack = require("webpack");
module.exports = {
	entry: ["./index.js"],
	output: {
		path: './build',
		filename: "[name].js"
	},
	module: {
		loaders: [
			{ test: /\.vue$/, loader: 'vue'},
            {test: /\.js$/, loader: 'babel-loader'},
            {test: /\.css$/, loader: 'style-loader!css-loader'},
			{test: /\.scss$/, loader: ['style-loader', 'css-loader!sass-loader']}
        ]
	}
}