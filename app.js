var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var violationsRouter = require('./routes/violations');
var passagesRouter = require('./routes/passages');
var isActiveRouter = require('./routes/isActive');
var fullinfo = require('./routes/fullinfo');
var fullcaminfo = require('./routes/fullcaminfo');
var telemetry = require('./routes/telemetry');
var orlan = require('./routes/orlan');
var vocord = require('./routes/vocord');

const https = require('https');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
////
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/////
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/violations', violationsRouter);
app.use('/passages', passagesRouter);
app.use('/is-active', isActiveRouter);
app.use('/fullinfo', fullinfo);
app.use('/fullcaminfo', fullcaminfo);
app.use('/telemetry', telemetry);
app.use('/orlan', orlan);
app.use('/vocord', vocord);

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


//Get the number of violations
// app.use('/GetNumberOfViolations', function (req, res, next) {
//   //let stringRequest = remoteAddress+req.originalUrl.toString()+full_key;
//   //let resource=res;
//   res.setHeader('Content-Type', 'application/json');
//   res.send('Hello World!')
// });

// function sendData(stringRequest, resource) {
//   https.get(stringRequest, onGotData);
//
//   function onGotData(res) {
//     let chunks = [];
//     res.on('data', onGotData);
//     res.on('end', onEnd);
//
//     function onGotData(chunk) {
//       chunks.push(chunk);
//     }
//
//     function onEnd() {
//       //resource.send(getOptimizedText(chunks.join(''), remoteAddress));
//       resource.send(getFakeJson(), remoteAddress);
//     }
//   }
//
// }

module.exports = app;
