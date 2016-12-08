const express = require('express');
const historyApiFallback = require('connect-history-api-fallback');
const request = require('request');

const app = express();

if (process.env.NODE_ENV !== 'production') {
  /* eslint-disable global-require, no-undef */
  require('dotenv').config();
  const webpack = require('webpack');
  const webpackConfig = require('../webpack.config');
  const compiler = webpack(webpackConfig);
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  /* eslint-enable global-require, no-undef */
  app.use(webpackDevMiddleware(compiler, {
    quiet: true,
    noInfo: true,
    stats: {
      colors: true,
      reasons: true
    },
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.get('/api/:stock', (req, res) => {
  const stock = req.params.stock;

  request(`http://data.benzinga.com/rest/richquoteDelayed?symbols=${stock}`, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.status(200).send(body);
    } else {
      res.status(404).send(error);
    }
  });
});

app.use(historyApiFallback());
app.use(express.static(`${__dirname}/../dist`));

app.listen(process.env.PORT);
console.log('Koa is listening on port 3000');// eslint-disable-line no-console
