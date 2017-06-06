const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  module: {
    preLoaders: [
      { test: /\.vue$/, loader: 'eslint', exclude: /node_modules/ },
    ],
    loaders: [
      { test: /\.vue$/, loader: 'vue' },
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.(png|jpg|gif)$/, loader: 'url', query: { limit: 8096, name: 'images/[name].[hash:7].[ext]' } }
    ]
  },
  vue: {
    autoprefixer: {
      browsers: ['last 2 versions']
    },
    loaders: {
      css: ExtractTextPlugin.extract('css'),
      sass: ExtractTextPlugin.extract('css!sass')
    }
  },
  plugins: [
    new ExtractTextPlugin('css/[name].[hash:7].[ext]'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
}
