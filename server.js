'use strict';

const express = require('express');
const routes = require('./routes');

// Constants
const PORT = 80;
const HOST = '0.0.0.0';

// App
const app = express();

const isDev = process.env.NODE_ENV !== 'production';

if (isDev) {
  // dev: require fresh routes on each request (clears require cache)
  app.use((req, res, next) => {
    delete require.cache[require.resolve('./routes')];
    const freshRoutes = require('./routes');
    return freshRoutes(req, res, next);
  });
} else {
  // production: mount router once
  const routes = require('./routes');
  app.use('/', routes);
}

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);


