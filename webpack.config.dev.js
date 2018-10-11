const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = require('./webpack.config.js');

module.exports = Object.assign({}, config, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    host: 'localhost',
    port: '3000',
    contentBase: 'public',
    publicPath: '/',
    hot: true,
    inline: true,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'public/index.html'),
      template: path.resolve(__dirname, 'index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
});
