/* globals describe, before */
const server = require('../index.js')
const supertest = require('supertest')(server)

const Topic = require('../models/topics')

describe('/api', () => {
  before(async () => {
    await Topic.remove({})
  })
  describe('/topics', () => require('./routes/topics.test.js')(supertest))
})
