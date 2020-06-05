const request = require('supertest');
const server = require('../../server');

// Order matters here
describe('#master posts routes', () => {
  test('GET /master-posts', async () => {
    const response = await request(server).get('/api/master-posts');
    expect(response.status).toEqual(200);
  });
  test('POST /master-posts', async () => {
    const response = await request(server)
      .post('/api/master-posts')
      .send({ reddit_posts: [{ id: 1 }] });
    expect(response.status).toEqual(201);
  });
  test('DELETE /master-posts', async () => {
    const response = await request(server)
      .delete('/api/master-posts')
      .send({ id: 1 });

    expect(response.status).toEqual(204);
  });
});
