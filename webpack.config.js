const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './build',
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        pathRewrite: {'^/api' : ''}
      }
    }
  }
};
