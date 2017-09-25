/* globals describe, it */
const expect = require('chai').expect

module.exports = (supertest) => {
  let savedTopic

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
        savedTopic = topic

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
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)

        const { topics } = res.body

        expect(topics).to.be.a('array')
        expect(topics[0]).to.have.property('_id')

        done()
      })
    })
  })
}
