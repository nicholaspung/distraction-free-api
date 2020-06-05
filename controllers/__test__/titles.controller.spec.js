const request = require('supertest');
const server = require('../../server');

// Order matters
describe('#titles routes', () => {
  test('POST /titles', async () => {
    const response = await request(server)
      .post('/api/titles')
      .send({ user: 'test', title: 'hi' });
    expect(response.status).toEqual(201);
  });
  test('GET /titles', async () => {
    const response = await request(server)
      .get('/api/titles')
      .send({ user: 'test' });
    expect(response.status).toEqual(200);
  });
  test('PUT /titles', async () => {
    const response = await request(server)
      .put('/api/titles')
      .send({ user: 'test', id: 1, title: 'hello' });
    expect(response.status).toEqual(200);
  });
  test('DELETE /titles', async () => {
    const response = await request(server)
      .delete('/api/titles')
      .send({ user: 'test', title: 'hello' });
    expect(response.status).toEqual(204);
  });
});
