var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

//模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());  //解析json
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let product = require('./routes/product')


app.use('/',require('./routes/index'));
app.use('/login',require('./routes/login'));
app.use('/product',product);

// 捕获404页面
app.use(function(req, res, next) {
  next(createError(404,"找不到页面"));
});

// error handler 错误中间件
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error'); //后面的err可以省略
});

module.exports = app;
