import dotenv from 'dotenv';
dotenv.config({path: '.env'});
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import passport from './config/passport';
import authRouter from './routes/authRouter';
import indexRouter from './routes/indexRouter';
import matchesRouter from './routes/matchesRouter';
import messagesRouter from './routes/messagesRouter';
import pendingMatchesRouter from './routes/pendingMatchesRouter';
import usersRouter from './routes/usersRouter';
import errorsHandler from './middlewares/errors';
import checkDatabaseStatus from './checkDatabaseStatus';

//Setup Express.js
const app = express();

//Configure passport
passport();

//Setup MongoDB
mongoose.connect(process.env.DB_HOST, {useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
checkDatabaseStatus(process.env.DB_HOST);

//Setup extensions
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

//Setup routing
app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/matches', matchesRouter);
app.use('/messages', messagesRouter);
app.use('/pending-matches', pendingMatchesRouter);
app.use('/users', usersRouter);
app.use(errorsHandler.notFound);
app.use(errorsHandler.catchErrors);

module.exports = app;