const request = require('supertest');
const server = require('../../server');

describe('#master posts routes', () => {
  test('should return an OK status code from /titles', async () => {
    const response = await request(server).get('/api/titles');
    expect(response.status).toEqual(200);
  });
});
