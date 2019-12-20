const createError = require('http-errors')
const express = require('express')
const path = require('path')
const session = require('express-session')
const logger = require('morgan')
const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const articleRouter = require('./routes/article')
const cors = require('cors')
const app = express()
require('./libs/mongo') // 启动mongo

app.disable('etag')
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
app.use(logger('dev'))

app.use(cors({
  origin: ['http://192.168.0.102:8080', 'http://192.168.0.112:8080'],
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(session({
  name: 'session_id',
  secret: 'this is lgs first blog backend',
  resave: true,
  saveUninitialized: false,
  cookie: {
    path: '/',
    secure: false,
    sameSite: 'none',
    maxAge: 24 * 60 * 60 * 1000
  }
}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/user', userRouter)
app.use('/article', articleRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
