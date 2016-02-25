var webpack = require('webpack');
var path = require('path');
var merge = require('merge');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
//import webpackDevMiddleware from 'webpack-dev-middleware';

var port = process.env.HOT_LOAD_PORT || 8080;

// Base config object
var webpackConfig = {
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public', 'dist'),
    publicPath: '/public/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    //new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin() // Need??
  ],
  resolve: {
    extensions: ['', '.react.js', '.js', '.jsx', '.json', '.scss', '.png', '.jpg', '.jpeg', '.gif', '.svg'],
    root: path.join(__dirname),
    fallback: path.join(__dirname, 'node_modules'),
    modulesDirectories: ['node_modules']
  }
};

if( process.env.NODE_ENV === 'development' ) {
  // Merge dev config with base `webpackConfig`
  webpackConfig = merge(webpackConfig,{
    entry : [
      'webpack-hot-middleware/client',
      './client.js'
    ],
    devtool: 'inline-source-map',
    module: {
      loaders: [{
        test: /\.js$|\.jsx$/,
        loader: 'babel',// ['react-hot', 'babel']
        exclude: /node_modules/,
        include: __dirname,
        // Babel config
        query: {
          optional: ['runtime'],
          stage: 2,
          env: {
            development: {
              plugins: [
                'react-transform'
              ],
              extra: {
                'react-transform': {
                  transforms: [{
                    transform:  'react-transform-hmr',
                    imports: ['react'],
                    locals:  ['module']
                  }]
                }
              }
            }
          }
        }
      },
      { test: /\.(png|jpg|jpeg|gif|ico|svg|woff|ttf)$/, loader: 'url-loader?limit=8192' },
      { test: /\.scss$/, loaders: ["style", "css?sourceMap", "postcss", "sass?sourceMap"] },
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]},
    plugins : [
      new webpack.HotModuleReplacementPlugin()
    ]  
  });

} else {
  // Merge production config with base `webpackConfig`
  webpackConfig = merge(webpackConfig,{
    // devtool: "source-map", // ?
    entry : [
      './client.js'
    ],
    module: {
      loaders: [{
        test: /\.js$|\.jsx$/,
        loader: 'babel',
        exclude: /node_modules/,
        include: __dirname
      },
      { test: /\.(png|jpg|jpeg|gif|ico|svg|woff|ttf)$/, loader: 'url-loader?limit=8192' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap') }
    ]},
    plugins : [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new ExtractTextPlugin('app.css'),
      new webpack.optimize.UglifyJsPlugin({minimize: true})
    ]  
  });
}
// module.exports = {
//   cache: true,
//   entry: [
//     // 'webpack-dev-server/client?http://localhost:' + port,
//     // 'webpack/hot/only-dev-server', // `only-` prevents reload on syntax errors // or CLI --inline --hot
//     // 'webpack-hot-middleware/client', // Need??
//     './client.js',
//   ],
//   output: {
//     filename: 'bundle.js',
//     path: path.join(__dirname, 'public', 'dist'),
//     publicPath: '/public/'//'http://localhost:' + port + '/public/'
//   },
//   devtool: devtool,
//   devServer: {
//     hot: true,
//     contentBase: path.join(__dirname, "public"),
//     historyApiFallback: true
//   },
//   sassLoader: {
//     includePaths: [path.resolve(__dirname, "./static/scss")],
//     outputStyle: 'expanded'//'compressed'//
//   },
//   postcss: [
//     autoprefixer
//   ],
//   module: {
//     loaders: [
//       {
//         test: /\.js$|\.jsx$/,
//         loaders: loaders,
//         include: path.join(__dirname), // TO DO: add `src` once moved
//         exclude: /node_modules/
//       },
//       {
//         test: /\.scss$/, 
//         loaders: ["style", "css?sourceMap", "postcss", "sass?sourceMap"]
//       },
//       {
//         test: /\.jpe?g$|\.gif$|\.png$|\.ico|\.svg$|\.woff$|\.ttf$/,
//         loader: 'url-loader?limit=8192'
//       }
//     ]
//   },
//   plugins: [
//     new webpack.optimize.OccurenceOrderPlugin(),
//     new webpack.HotModuleReplacementPlugin(),
//     //new webpack.NoErrorsPlugin() // Need??
//   ],
//   resolve: {
//     extensions: ['', '.react.js', '.js', '.jsx', '.json', '.scss', '.png', '.jpg', '.jpeg', '.gif', '.svg'],
//     root: path.join(__dirname),
//     fallback: path.join(__dirname, 'node_modules'),
//     modulesDirectories: ['node_modules']
//   }
// };

module.exports = webpackConfig;

