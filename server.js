//
import express                    from 'express';
import React                      from 'react';
import { match, RoutingContext }  from 'react-router';
import { renderToString }         from 'react-dom/server';
import createLocation             from 'history/lib/createLocation';
// import hogan                      from 'hogan-express'

import webpack                    from 'webpack';
import webpackDevMiddleware       from 'webpack-dev-middleware';
import webpackHotMiddleware       from 'webpack-hot-middleware';
import webpackConfig              from './webpack.config';

//import packagejson from './package.json';

// Routes
import routes from './routes';

// Express
const app = express();
const renderFullPage = (reactHTML, initialState) => {
  return `<!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Universal React</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="A Universal React Website">
        <meta name="author" content="Jeff Waterfall">
      </head>
      <body class="hidden">
        <div id="app">${reactHTML}</div>
        <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};</script>
        <script type="application/javascript" src="/dist/bundle.js"></script>
      </body>
    </html>`;
}

if( process.env.NODE_ENV === 'development' ) {
  app.use('/', express.static(__dirname + '/public/'));
} else {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, { 
    noInfo: true, 
    publicPath: webpackConfig.output.publicPath 
  }));
  app.use(webpackHotMiddleware(compiler));
}

// app.engine('html', hogan)
// app.set('views', __dirname + '/views')
// app.use('/', express.static(__dirname + '/public/'));
// app.set('port', (process.env.PORT || 3000));

app.get('*', (req, res) => {

  const location = createLocation(req.url);

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    
    const InitialView = (
      <RoutingContext {...renderProps} />
    );
    //const reactHTML = renderToString(InitialView);
    
    // Pass to hogan template
    //res.locals.reactMarkup = reactHTML;

    if (error) {
      res.status(500).wns(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      // Success!
      const initialState = {};// store.getState();
      const componentHTML = renderToString(InitialView);
      res.status(200).end(renderFullPage(componentHTML, initialState));
    } else {
      const initialState = {};// store.getState();
      const componentHTML = renderToString(InitialView);
      res.status(404).end(renderFullPage(componentHTML, initialState));
    }
  })
})

const server = app.listen(3000, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.info('==> Server is listening in `' + process.env.NODE_ENV + '` mode')
  console.info('==> App listening at http://%s:%s', host, port);
});
