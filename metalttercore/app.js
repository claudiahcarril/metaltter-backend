var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')


// Connecting to Mongoose
require('./lib/connectMongoose')
require('./routes/api/mets')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static('public'))

app.use('/', indexRouter);
app.use('/users', usersRouter);


// CORS
app.use(cors());


// /* API ROUTES*/
app.use('/api/mets', require('./routes/api/mets'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/kudos', require('./routes/api/kudos'));
app.use('/api/follow', require('./routes/api/follow'));
app.use('/api/auth/login', require('./routes/api/auth/login'));
app.use('/api/auth/profile', require('./routes/api/auth/profile'));




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {

  if (err.array) {
    err.status = 422    
    const errorInfo = err.array({ onlyFirstError: true })[0]
    console.log(errorInfo)
    err.message = `Error in ${errorInfo.location}, param "${errorInfo.param}" ${errorInfo.msg}`
  }
  res.status(err.status || 500);
  if (req.originalUrl.startsWith('/api/')) {
    res.json({ error: err.message})
    return
  }

// set locals, only providing error in development
res.locals.message = err.message;
res.locals.error = req.app.get('env') === 'development' ? err : {};

// render the error page
res.status(err.status || 500);
res.render('error');
});



module.exports = app;