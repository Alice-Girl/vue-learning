const path = require('path');
const webpack = require('webpack');

const extractTextPlugin = require('extract-text-webpack-plugin');
const htmlWbackPlugin = require('html-webpack-plugin');

const RT_PATH = path.resolve(__dirname);

const IS_DEV = process.env.NODE_DEV == 'production';

const plugins = [];

if(!IS_DEV) {
    plugins.push(new webpack.DefinePlugin({
        'process.env': {
            NODE_DEV: JSON.stringify('production')
        }
    }))
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        sourceMap: true
    }))
}

const config = {
    entry: {
        'index': path.resolve(RT_PATH, 'app.js')
    },
    output: {
        path: path.resolve(RT_PATH, 'assets'),
        filename: "js/[name].js"
    },
    resolve: {
        extensions: ['', '.js', '.vue'],
        alias: {
            'src': path.resolve(RT_PATH, 'src')
        }
    },
    module: {
        loaders: [
            {test: /\.vue$/, loader: 'vue'},
            {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
            {test: /\.css$/, loader: extractTextPlugin.extract(['style-loader', 'css-loader'])},
            {test: /\.scss$/, loader: extractTextPlugin.extract(['style-loader', 'css-loader!sass-loader'])},
            {test: /\.(png|jpg|gif|webp)$/, loader: 'url-loader', query: {
                limit: 8096,
                name: 'assets/images/[name].[ext]'
            }},
            {test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader',
                query: {
                    limit: 8096,
                    name: 'assets/fonts/[name].[ext]'
            }}
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new extractTextPlugin('css/[name].css'),
        new htmlWbackPlugin({
            title: '仿美团移动端，基于vuejs1.0实现',
            favicon: path.resolve(RT_PATH, 'src/images/meituan.ico'),
            filename: path.resolve(RT_PATH, 'index.html'),
            template: path.resolve(RT_PATH, 'src/index.html'),
            inject: 'body',

        })
    ].concat(plugins),
    devtool: IS_DEV ? '#cheap-module-eval-source-map' : false
};

module.exports = config;
