/* globals describe, it */
const expect = require('chai').expect

module.exports = (supertest) => {
  describe('/GET', () => {
    it('it should GET all the topics', done => {
      supertest
      .get('/api/topics')
      .expect(200, done)
    })
  })

  describe('/POST', () => {
    it('it should create new topic', done => {
      const topic = {
        name: 'new topic'
      }

      supertest
      .post('/api/topics')
      .send(topic)
      .expect(201, done)
    })

    it('it should not create new topic with name shorter than 4', done => {
      const topic = {
        name: 'new'
      }

      supertest
      .post('/api/topics')
      .send(topic)
      .expect(422, done)
    })
  })
}
