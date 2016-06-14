var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')
var pathtoassets = require('./pathtoassets')

module.exports = {
  context: __dirname,

  entry: {
    homepage: './assets/js/home/homepage/HomePage.jsx',
    profile: './assets/js/userprofile/profile/Profile.jsx',
    educator: './assets/js/home/creator/Educator.jsx',
    register: './assets/js/authentication/register/Register.jsx',
    login: './assets/js/authentication/login/Login.jsx',
    createclass: './assets/js/classroom/createclass/CreateClass.jsx',
    classroom: './assets/js/classroom/classroom/Classroom.jsx',
    uploadvideo: './assets/js/classroom/uploadvideo/UploadVideo.jsx'
  },

  output: {
      path: path.resolve(pathtoassets + '/assets/bundles/'),
      filename: "[name]-[hash].js",
  },

  plugins: [
    new BundleTracker({filename: pathtoassets + '/webpack-stats.json'}),
  ],

  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader', query: { presets:['react'] }}, // to transform JSX into JS
      { test: /\.css$/, loaders: ["style", "css", "postcss"]},
      { test: /\.scss$/, loaders: ["style", "css", "postcss", "sass"]},
      { test: /\.(jsx|js)$/, loader: 'imports?jQuery=jquery,$=jquery,this=>window'},
      { test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url?limit=10000"},
      { test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/, loader: 'file'},
    ],
  },

  resolve: {
    modulesDirectories: ['node_modules', 'bower_components', 'assets'],
    extensions: ['', '.js', '.jsx', '.css', '.scss']
  },
}