var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
require('./config/passport')(passport);
const authRouter = require('./routes/auth');
const basketsRouter = require('./routes/baskets');
const itemsRouter = require('./routes/items');
const usersRouter = require('./routes/users');
const ordersRouter = require('./routes/orders');


var indexRouter = require('./routes/index');

var app = express();

app.use(
    session({
      secret: '1',
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/auth', authRouter);



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/baskets', basketsRouter);
app.use('/items', itemsRouter);
app.use('/orders', ordersRouter);

module.exports = app;
