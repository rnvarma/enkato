var path = require('path')
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')
var pathtoassets = require('./pathtoassets')
var entrypoints = require('./entrypoints')

module.exports = {
    context: __dirname,

    entry: {
        'enkato-embed': [
            'bootstrap-loader/lib/bootstrap.loader?configFilePath=' + __dirname + '/injectextension/.bootstraprc!bootstrap-loader/no-op.js',
            './assets/js/extension/enkato-embed.jsx',
        ],
    },

    output: {
        path: path.resolve(pathtoassets + '/injectextension/'),
        filename: "[name].js",
        publicPath: '/static/bundles/'
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en|ko|ja|zh-cn)$/)
  ],

  module: {
    preLoaders: [
      //{test: /\.jsx$/, loader: "eslint-loader", exclude: /node_modules/}
    ],
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader', query: { presets:['es2015', 'react'], plugins: ['transform-class-properties'] }}, // to transform JSX into JS
      { test: /\.css$/, loaders: ["style", "css", "postcss"]},
      { test: /\.scss$/, loaders: ["style", "css", "postcss", "sass"]},
      { test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url?limit=10000"},
      { test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/, loader: 'file'},
    ],
  },

  eslint: {
    configFile: '.eslintrc.js'
  },

  resolve: {
    modulesDirectories: ['node_modules', 'bower_components', 'assets'],
    extensions: ['', '.js', '.jsx', '.css', '.scss']
  },
}
