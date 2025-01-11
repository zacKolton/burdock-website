const path = require('path');
const webpack = require('webpack');

module.exports = {
  target: 'electron-main',
  mode: 'development',
  entry: './js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'output-files')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }, 
      {
        test: /\.css$/, 
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.cjs']
  },
  plugins: [
    new webpack.ExternalsPlugin('commonjs', [
      'fs',
      'path'
    ])
  ],
  devtool: 'source-map'
};