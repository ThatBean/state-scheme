const webpack = require('webpack')
const { DefinePlugin, BannerPlugin, optimize: { ModuleConcatenationPlugin } } = webpack

const { NODE_ENV = 'production' } = process.env
const IS_PRODUCTION = NODE_ENV === 'production'

const OPTIONS = {
  BABEL_LOADER: IS_PRODUCTION
    ? { presets: [ [ 'es2015', { modules: false } ], 'stage-0' ] }
    : { presets: [ 'stage-0' ] }
}

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [ { loader: 'babel-loader', options: OPTIONS.BABEL_LOADER } ]
      }
    ]
  },
  plugins: [].concat(
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
      '__DEV__': !IS_PRODUCTION
    }),
    IS_PRODUCTION ? [
      new ModuleConcatenationPlugin(),
      new BannerPlugin({ banner: '/* eslint-disable */', raw: true, test: /\.js$/, entryOnly: false })
    ] : []
  )
}
