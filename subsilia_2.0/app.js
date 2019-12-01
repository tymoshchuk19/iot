var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { mongoadr } = require('./config/env');
const mongoose = require('mongoose');
const passport = require('passport');
const strategy = require('./helpers/passport');
const session = require('express-session');
var FileStore = require('session-file-store')(session);

mongoose.connect(mongoadr, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(()=> console.log('Mongo connection ready. State: ' + mongoose.connection.readyState))
    .catch((erro) => console.log('Mongo: erro na conexão: ' + erro));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var campainhaRouter = require('./routes/campainha');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(session({
  cookie: {
    maxAge: 9000000
  },
  store: new FileStore(),
  secret: 'first secret',
  saveUninitialized: true,
  resave: false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/campainha', campainhaRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
