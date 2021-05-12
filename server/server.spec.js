const request = require('supertest')
const server = require('./server')

describe('server.js', () => {
  describe('index route', () => {
    it('should return an ok status code from the index route', async () => {
      const expectedStatus = 200;
      const response = await request(server).get('/');
      expect(response.status).toEqual(expectedStatus);
    });
    it('should return the sucess json from the index route', async () => {
      const response = await request(server).get('/');
      expect(response.type).toEqual('application/json');
    });
});
    describe('/ [GET]', () => {
      it('returns a 200 status', done  => {
        return request(server)
        .get('/')
        .expect('content-Type', /json/)
        .then(res => {
          expect(res.status).toEqual(200)
          done()
        });
      });