'use strict';

const express = require('express');
const routes = require('./routes');

// Constants
const PORT = 80;
const HOST = '0.0.0.0';

// App
const app = express();

app.use('/', routes);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);


