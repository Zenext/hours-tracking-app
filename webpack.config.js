var path = require('path');
var webpack = require('webpack');

var config = module.exports = {
  entry: ["./web/static/js/index.js", "./web/static/css/style.scss"],

  output: {
    path: "./priv/static",
    filename: 'js/app.js',
  },

  resolve: {
    extensions: ['.js'],
    modules: ['node_modules'],
  },

  module: {
    noParse: /vendor\/phoenix/,
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          plugins: ["transform-class-properties"],
          presets: ['react', 'es2015', 'stage-2'],
        },
      },
      {
        test: /\.scss$/, 
        loaders: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {loader: 'sass-loader', options: {includePaths: ["node_modules/"]}},
        ]
      }
    ]
  }
};