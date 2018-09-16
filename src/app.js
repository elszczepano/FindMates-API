import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import usersRouter from './routes/usersRouter';
import matchesRouter from './routes/matchesRouter';
import messagesRouter from './routes/messagesRouter';
import pendingMatchesRouter from './routes/pendingMatchesRouter';

//Setup Express.js
const app = express();

//Setup MongoDB
mongoose.connect('mongodb://localhost:27017/FindMates', { useNewUrlParser: true });
const db = mongoose.connection;

//Setup routing
app.use('/matches', matchesRouter);
app.use('/messages', messagesRouter);
app.use('/pending-matches', pendingMatchesRouter);
app.use('/users', usersRouter);

module.exports = app;