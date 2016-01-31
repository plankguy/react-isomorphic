var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');
//import webpackDevMiddleware from 'webpack-dev-middleware';

var port = process.env.HOT_LOAD_PORT || 8080;

if( process.env.NODE_ENV === 'dev' ) {
  var loaders = ['react-hot', 'babel'];
  var devtool = 'inline-source-map';
} else {
  var loaders = ['babel'];
  var devtool = 'eval';
}
module.exports = {
  cache: true,
  entry: [
    'webpack-dev-server/client?http://localhost:' + port,
    'webpack/hot/only-dev-server', // `only-` prevents reload on syntax errors // or CLI --inline --hot
    // 'webpack-hot-middleware/client', // Need??
    './client.js',
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public', 'dist'),
    publicPath: 'http://localhost:' + port + '/public/'
  },
  devtool: devtool,
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, "public"),
    historyApiFallback: true
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, "./static/scss")],
    outputStyle: 'expanded'//'compressed'//
  },
  postcss: [
    autoprefixer
  ],
  module: {
    loaders: [
      {
        test: /\.js$|\.jsx$/,
        loaders: loaders,
        include: path.join(__dirname), // TO DO: add `src` once moved
        exclude: /node_modules/
      },
      {
        test: /\.scss$/, 
        loaders: ["style", "css?sourceMap", "postcss", "sass?sourceMap"]
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.ico|\.svg$|\.woff$|\.ttf$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    //new webpack.NoErrorsPlugin() // Need??
  ],
  resolve: {
    extensions: ['', '.react.js', '.js', '.jsx', '.json', '.scss', '.png', '.jpg', '.jpeg', '.gif', '.svg'],
    root: path.join(__dirname),
    fallback: path.join(__dirname, 'node_modules'),
    modulesDirectories: ['node_modules']
  }
};
