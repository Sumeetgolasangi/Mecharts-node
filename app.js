const express = require('express')
const helmet = require('helmet')
const cors = require('cors');
const routes = require('./routes');
const bodyParser = require('body-parser');
const app =express()

// set security HTTP headers
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// enable cors
app.use(cors());
app.options('*', cors());

// api routes
app.use('', routes);

module.exports = app;
