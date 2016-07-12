var path = require('path')
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var pathtoassets = require('./pathtoassets')
var entrypoints = require('./entrypoints')

module.exports = {
  context: __dirname,

  devtool: 'cheap-module-source-map',

  entry: entrypoints,

  output: {
      path: path.resolve(pathtoassets + '/assets/prod-assets/prod-bundles/'),
      filename: "[name]-[hash].js",
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
            warnings: false 
          } 
        }),
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('production')
          }
        })

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
