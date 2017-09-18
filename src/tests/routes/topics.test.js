const expect = require('chai').expect

module.exports = (supertest) => {
  describe('/GET topics', () => {
    it('it should GET all the topics', done => {
      supertest
      .get('/api/topics')
      .expect(200, done)
    })
  })
}
