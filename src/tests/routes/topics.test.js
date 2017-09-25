/* globals describe, it */
const expect = require('chai').expect

module.exports = (supertest) => {
  describe('/POST', () => {
    it('it should create new topic', done => {
      const topic = {
        name: 'new topic'
      }

      supertest
      .post('/api/topics')
      .send(topic)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err)

        const { topic } = res.body

        expect(topic).to.be.an('object')
        expect(topic).to.have.property('_id')
        expect(topic).to.have.property('name')
        expect(topic).to.have.property('viewCount')

        done()
      })
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

    it('it should not create new topic without name', done => {
      supertest
      .post('/api/topics')
      .send({})
      .expect(422, done)
    })
  })

  describe('/GET', () => {
    it('it should GET all the topics', done => {
      supertest
      .get('/api/topics')
      .expect(200, done)
    })
  })
}
