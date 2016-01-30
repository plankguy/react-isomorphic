var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');

if(process.env.NODE_ENV === 'development') {
  var loaders = ['react-hot','babel']
} else {
  var loaders = ['babel']
}
module.exports = {
  devtool: 'eval',
  entry: './client.js',
  output: {
    path: __dirname + '/public/dist',
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  module: {
    loaders: [
      {
        test: /\.js$|\.jsx$/,
        loaders: loaders,
        exclude: /node_modules/
      },
      // {
      //   test: /\.scss$/, 
      //   loaders: ["style", "css?sourceMap", "postcss", "sass?sourceMap"]
      // },
      // {
      //   test: /\.jpe?g$|\.gif$|\.png$|\.ico|\.svg$|\.woff$|\.ttf$/,
      //   loader: 'url-loader?limit=8192'
      // }
    ]
  },
  // plugins: [
  //   new webpack.HotModuleReplacementPlugin(),
  //   new webpack.NoErrorsPlugin()
  // ],
  resolve: {
    extensions: ['', '.react.js', '.js', '.jsx', '.json', '.scss', '.png', '.jpg', '.jpeg', '.gif', '.svg'],
  //   root: path.join(__dirname),
  //   fallback: path.join(__dirname, 'node_modules'),
    modulesDirectories: ['node_modules'],
  }
};
