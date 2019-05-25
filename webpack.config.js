const config = {
  srcPath: './src/'
};

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require("write-file-webpack-plugin");

module.exports = {
  entry: config.srcPath + '/js/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {test: /\.(png|svg|jpg|gif|jpeg)$/, use: ['file-loader']}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: config.srcPath + 'index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new webpack.DefinePlugin({
      'CANVAS_RENDERER': JSON.stringify(true),
      'WEBGL_RENDERER': JSON.stringify(true)
    }),
    new WriteFilePlugin
  ],
  devtool: "source-map",
  devServer: {
    historyApiFallback: true
  }, 
  mode: 'development'
};