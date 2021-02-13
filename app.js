const express = require('express');
const cookieParser = require('cookie-parser');
const log4js = require('log4js');
const bodyParser = require('body-parser');
const cors = require('cors');

require('./database');

const authenticate = require('./middlewares/authenticate');

const app = express();

const boardRouter = require('./routes/board');
const gameRouter = require('./routes/game');

app.use(cors());
app.use(bodyParser.json());
app.use(authenticate);
app.use(log4js.connectLogger(log4js.getLogger('http'), {level: 'auto'}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/board', boardRouter);
app.use('/game', gameRouter);

module.exports = app;
