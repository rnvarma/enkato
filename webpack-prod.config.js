var path = require('path')
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var pathtoassets = require('./pathtoassets')
var entrypoints = require('./entrypoints')

module.exports = {
  context: __dirname,

  entry: './assets/app.js',

  output: {
      path: path.resolve(pathtoassets + '/assets/prod-assets/prod-bundles/'),
      filename: "[name]-[hash].js",
      chunkFilename: '[id].chunk.js',
      publicPath: 'https://s3-us-west-2.amazonaws.com/enkato-static-files/static/prod-bundles/'
  },

    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new BundleTracker({
          filename: pathtoassets + '/webpack-prod-stats.json'
        }),
        new CleanWebpackPlugin(['assets/prod-assets/prod-bundles']),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false,
          },
          comments: false,
          sourceMap: false,
          mangle: true,
          minimize: true
        }),
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('production')
          }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
        new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en|ko|ja|zh-cn)$/)

  ],

  module: {
    loaders: [
        { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader', query: { presets:['es2015', 'react'] }}, // to transform JSX into JS
      { test: /\.css$/, loaders: ["style", "css", "postcss"]},
      { test: /\.scss$/, loaders: ["style", "css", "postcss", "sass"]},
      //{ test: /\.(jsx|js)$/, loader: 'imports?jQuery=jquery,$=jquery,this=>window'},
      { test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url?limit=10000"},
      { test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/, loader: 'file'},
    ],
  },

  resolve: {
    modulesDirectories: ['node_modules', 'bower_components', 'assets'],
    extensions: ['', '.js', '.jsx', '.css', '.scss']
  },
}
