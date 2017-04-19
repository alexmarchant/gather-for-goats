const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, '..', 'js', 'bundle.js'),
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, '..', '..', 'public'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }, {
				test: /\.css$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }]
      }, {
        test: /\.scss$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "postcss-loader" // adds prefixes to CSS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }]
      }, {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        loader: 'file-loader',
      }
    ],
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'Gather for Goats',
    favicon: path.resolve(__dirname, '..', 'images', 'favicon.ico'),
    template: path.resolve(__dirname, '..', 'html', 'index.ejs'),
  })],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  devtool: 'cheap-module-eval-source-map',
};

