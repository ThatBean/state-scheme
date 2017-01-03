const webpack = require('webpack')

const PRODUCTION = process.env.NODE_ENV === 'production'

console.log('PRODUCTION', PRODUCTION)

module.exports = {
  entry: {
    'index': './source/index'
  },
  output: {
    path: './library',
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
      new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } })
    ]
    : [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } })
    ]
}
