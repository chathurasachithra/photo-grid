const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');

const indexRouter = require('./routes/index');
const v1Router = require('./routes/v1');
const app = express();

app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', indexRouter);
app.use('/v1', v1Router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).json({
    statusCode: 404, message: 'Route Not Found'
  });
});

// error handler
app.use((err, req, res) => {

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// MongoDB Connection
const db = mongoose.connection;
const connectWithRetry = () => {
  console.log('connecting MongoDB...');
  mongoose.connect(config.DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });
};

connectWithRetry();

db.on('error', () => {
  console.log('MongoDB connection error:');
  setTimeout(connectWithRetry, 5000);
});

db.once('open', () => {
  console.log("we're connected to MongoDB!");
});

module.exports = app;
