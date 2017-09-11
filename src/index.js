const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
app.use(morgan('dev'))

const topics = require('./routes/topics')
app.use('/api/topics', topics)

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

mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true })

const listener = app.listen(process.env.APP_PORT || 3000, () =>
  console.log('App started in ' +
    process.env.NODE_ENV +
    ' on port ' +
    listener.address().port
  )
)
