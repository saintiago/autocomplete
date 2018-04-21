const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

module.exports = {

  mode: 'development',

  entry: ['./src/index.jsx'],
  output: {
    path: path.resolve(__dirname, 'web'),
    filename: 'index.js'
  },

  devtool: 'cheap-module-source-map',

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'stage-2', 'react']
        }
      }
    ]
  },

  resolve: {
    modules: [
      'node_modules'
    ],
    extensions: ['.js', '.jsx']
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Autocomplete',
      inject: true
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: ['css/styles.css'],
      append: true
    })
  ],

  devServer: {
    contentBase: path.resolve(__dirname, "web"),
    compress: true,
    port: 8080
  }
};