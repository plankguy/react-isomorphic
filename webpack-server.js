import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import config from "./webpack.config";

var server = WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: { colors: true }
  });

server.listen(8080, 'localhost', function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log('Webpack server listening at localhost:8080');
  });