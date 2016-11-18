/**
 * Created by znyaiw on 2016/11/16.
 */
// 引入Path模块，便于操作路径
// require: ES6
// import: ES5
var path = require('path');
// 引入webpack-merge模块，合并loader
var webpack_merge = require('webpack-merge');
// 模块加载器兼打包工具webpack模块
var webpack = require('webpack');
// CSS单独打包
var extra_text_plugin = require('extra-text-plugin');
// 简化创建调用webpack bundles的HTML文件
var html_webpack_plugin = require('html-webpack-plugin');

// 获取环境变量中设置的TARGET
var TARGET = process.env.TARGET;
// 获取当前项目根目录
var ROOT_PATH = path.resolve(__dirname);

// 定义不同环境下的公共部分
var common = {
    // 解决方案配置
    resolve: {
        extensions: ['', '.js', '.vue'],    // 开启后缀自动补全功能
        alias: {    // 配置别名
            'src': path.resolve(__dirname, 'src')
        }
    },
    // 加载器配置
    module: {
        loaders: [
            { test: /\.vue$/, loader: 'vue' },
            { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
            { test: /\.json$/, loader: 'json' },
            { test: /\.(png | jpg | gif | svg)$/, loader: 'url-loader', query: {
                // 小于10k时，自动hash处理
                limit: 10000,
                name: '/images/[name].[ext]?[hash]'
            } }
        ]
    // },
    // vue: {
    //     loaders: {
    //         js: 'babel'
    //     }
    }
};
// 生产环境编译
if(TARGET === 'build') {
    module.exports = merge(common, {
        // 入口文件设置
        entry: {
            'index': path.resolve(ROOT_PATH, 'src/main/index.js')
        },
        // 输出文件设置
        output: {
            path: path.resolve(ROOT_PATH, 'public'),
            filename: 'js/[name].js',
            publicPath: '/components/'
        // },
        // vue: {
        //     loaders: {
        //         js: babel,
        //         css: extra_text_plugin.extract('style-loader', 'css-loader'),
        //         less: extra_text_plugin.extract('style-loader', 'css-loader!less-loader'),
        //         sass: extra_text_plugin.extract('style-loader', 'css-loader!sass-loader'),
        //         stylus: extra_text_plugin.extract('style-loader', 'css-loader!stylus-loader')
        //     }
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"'
                }
            }),
            new webpack.optimize.UglifyJsPlugin({   // 压缩CSS和JS
                compress: {
                    warnings: false
                }
            }),
            new webpack.optimize.OccurenceOrderPlugin(),
            new extra_text_plugin('css/[name].css'),
            new html_webpack_plugin({
                filename: '../index.html',
                template: path.resolve(ROOT_PATH, 'index.template.html')
            })
        ]
    });
}
// 开发环境编译
if(TARGET === 'build') {
    module.exports = merge(common, {
        // 入口文件设置
        entry: {
            'index': path.resolve(ROOT_PATH, 'src/main/index.js')
        },
        // 输出文件设置
        output: {
            path: path.resolve(ROOT_PATH, 'public'),
            filename: 'js/[name].js',
            publicPath: '/'
        }
    })
}
