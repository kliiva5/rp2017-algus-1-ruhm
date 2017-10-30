const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()

const testEnvironment = process.env.NODE_ENV === 'test'

const app = express()
if (!testEnvironment) app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const topics = require('./routes/topics')
app.use('/api/topics', topics)

const curriculums = require('./routes/curriculums')
app.use('/api/curriculums', curriculums)

const auth = require('./routes/auth')
app.use('/api/auth', auth)

// 404
app.use((req, res, next) => {
  const err = new Error('Resource not found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: process.env.NODE_ENV === 'development' ? err.message : ''
  })
})

if (!testEnvironment) mongoose.set('debug', true)
mongoose.Promise = global.Promise
const mongoDBUri = testEnvironment
  ? process.env.MONGODB_TEST_URI
  : process.env.MONGODB_URI

mongoose.connect(mongoDBUri, { useMongoClient: true })
.then(() => {
  if (testEnvironment) return // do not start server for test env
  const listener = app.listen(process.env.APP_PORT || 3000, () =>
  console.log('App started in ' +
    process.env.NODE_ENV +
    ' on port ' +
    listener.address().port
  )
)
})
.catch(() => {
  console.error('Unable to connect to MongoDB')
  process.exit(1)
})

module.exports = app
