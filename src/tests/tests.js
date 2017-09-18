/* globals describe */
const server = require('../index.js')
const supertest = require('supertest')(server)

describe('/api', () => {
  describe('/topics', () => require('./routes/topics.test.js')(supertest))
})
