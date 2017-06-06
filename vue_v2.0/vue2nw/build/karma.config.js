const webpackDev = require('./webpack.dev.js');

delete webpack webpackDev.entry

module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    files: ['test/index.js'],
    preprocessors: {
      'test/index.js': ['webpack']
    },
    webpack: webpackDev,
    webpackMiddleware: {
      noInfo: true
    },
    singleRun: true
  })
}
