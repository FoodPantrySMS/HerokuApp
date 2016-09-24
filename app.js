const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();

const receiveSMSMessage = require('./messages/receive');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', receiveSMSMessage);

module.exports = app;