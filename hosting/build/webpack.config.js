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
        loader: "awesome-typescript-loader"
      }, {
				test: /\.css$/,
				loader: 'style-loader!css-loader'
      }, {
				test: /\.scss$/,
				loader: 'style-loader!css-loader!sass-loader'
			}, {
        test: /\.jpg$|\.svg$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'The Great Goat Gala',
//    favicon: path.resolve(__dirname, '..', 'images', 'favicon.ico'),
    template: path.resolve(__dirname, '..', 'html', 'index.ejs'),
  })],
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  devtool: 'cheap-module-eval-source-map',
};

