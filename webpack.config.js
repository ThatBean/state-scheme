const webpack = require('webpack')

const __DEV__ = process.env.NODE_ENV !== 'production'

console.log('__DEV__', __DEV__)

module.exports = {
  entry: {
    'index': './source/index'
  },
  output: {
    path: './',
    filename: '[name].js',
    library: 'StateScheme',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [ { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' } ]
  },
  target: 'node',
  plugins: __DEV__
    ? [
      new webpack.DefinePlugin({ __DEV__: JSON.stringify(__DEV__) })
    ]
    : [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.DefinePlugin({ __DEV__: JSON.stringify(__DEV__) })
    ]
}
