const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, '.build'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Compute Dashboard',
    }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './.build',
    proxy: {
      '/api': {
        target: process.env.BACKEND || 'http://localhost:8081',
        pathRewrite: { '^/api': '' },
      },
    },
  },
};
