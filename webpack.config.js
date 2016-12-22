const webpack = require('webpack')

const PRODUCTION = process.env.NODE_ENV === 'production'

console.log('PRODUCTION', PRODUCTION)

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
  plugins: PRODUCTION
    ? [
      new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
      new webpack.optimize.UglifyJsPlugin()
    ]
    : []
}
