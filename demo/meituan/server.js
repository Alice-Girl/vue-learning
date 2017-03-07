const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.js');

const server = new webpackDevServer(webpack(config), {
    process: true,
    stats: {
        colors: true
    }
});

server.listen('3000', function() {
    console.log('port on 3000');
});
