const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

module.exports = {

  mode: 'production',

  entry: {
    react: './src/indexReact.jsx',
    vanilla: './src/indexVanilla.js',
  },

  output: {
    path: path.resolve(__dirname, 'web'),
    filename: '[name].js'
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
      title: 'Autocomplete React',
      chunks: ['react'],
      filename: 'index_react.html',
      inject: true
    }),
    new HtmlWebpackPlugin({
      title: 'Autocomplete Vanilla',
      chunks: ['vanilla'],
      filename: 'index_vanilla.html',
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