var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');

if(process.env.NODE_ENV === 'development') {
  var loaders = ['react-hot', 'babel'];
  var devtool = 'inline-source-map';
} else {
  var loaders = ['babel'];
  var devtool = 'eval';
}
module.exports = {
  cache: true,
  //entry: './client.js',
  entry: [
    // 'webpack-dev-server/client?http://localhost:8080', 
    // 'webpack/hot/dev-server',
    './client.js',
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public', 'dist'),
    publicPath: path.join(__dirname, 'dist')
  },
  devtool: devtool,
  devServer: {
    contentBase: path.join(__dirname, "public"),
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
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.react.js', '.js', '.jsx', '.json', '.scss', '.png', '.jpg', '.jpeg', '.gif', '.svg'],
    root: path.join(__dirname),
    fallback: path.join(__dirname, 'node_modules'),
    modulesDirectories: ['node_modules']
  }
};
