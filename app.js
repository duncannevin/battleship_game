const express = require('express');
const log4js = require('log4js');
const bodyParser = require('body-parser');
const cors = require('cors');

require('./database');

const authenticate = require('./middlewares/authenticate');
const handleError = require('./middlewares/error');

const app = express();

const boardRouter = require('./routes/board');
const shipRouter = require('./routes/ship');
const playRouter = require('./routes/play');

app.use(cors());
app.use(bodyParser.json());
app.use(log4js.connectLogger(log4js.getLogger('http'), {level: 'auto'}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(authenticate);
app.use('/board', boardRouter);
app.use('/ship', shipRouter);
app.use('/play', playRouter);
app.use(handleError);

module.exports = app;
