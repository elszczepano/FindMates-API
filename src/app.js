import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import indexRouter from './routes/indexRouter';
import usersRouter from './routes/usersRouter';
import matchesRouter from './routes/matchesRouter';
import messagesRouter from './routes/messagesRouter';
import pendingMatchesRouter from './routes/pendingMatchesRouter';
import dbConfig from './dbConfig';

//Setup Express.js
const app = express();

//Setup MongoDB
mongoose.connect(dbConfig.url, { useNewUrlParser: true });
const db = mongoose.connection;

//Setup extensions
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Setup routing
app.use('/', indexRouter);
app.use('/matches', matchesRouter);
app.use('/messages', messagesRouter);
app.use('/pending-matches', pendingMatchesRouter);
app.use('/users', usersRouter);

module.exports = app;