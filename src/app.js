import dotenv from 'dotenv';
dotenv.config({path: '.env'});
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from './config/passport';
import authRouter from './routes/authRouter';
import indexRouter from './routes/indexRouter';
import matchesRouter from './routes/matchesRouter';
import messagesRouter from './routes/messagesRouter';
import pendingMatchesRouter from './routes/pendingMatchesRouter';
import usersRouter from './routes/usersRouter';

//Setup Express.js
const app = express();

//Configure passport
passport();

//Setup MongoDB
mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true });
const db = mongoose.connection;

//Setup extensions
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Setup routing
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/matches', matchesRouter);
app.use('/messages', messagesRouter);
app.use('/pending-matches', pendingMatchesRouter);
app.use('/users', usersRouter);

module.exports = app;