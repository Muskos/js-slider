import paths from './gulp/paths';
import webpack from 'webpack';
import path from 'path';

export default {
  entry: `${paths.src.scripts}/index.js`,
  output: {
    path: path.resolve(__dirname, `${paths.dist.scripts}`),
    filename: 'app.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        drop_debugger: false
      }
    })]
}