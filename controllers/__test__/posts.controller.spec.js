const request = require('supertest');
const server = require('../../server');

describe('#posts routes', () => {
  test('POST /posts', async () => {
    const response = await request(server).post('/api/posts').send({
      title: 'hi',
      comments: 'http://comments',
      url: 'http://url',
      reddit_id: 1,
      user: 'test',
      search_title: 'hi',
    });
    expect(response.status).toEqual(201);
  });
  test('GET /posts', async () => {
    const response = await request(server)
      .get('/api/posts')
      .send({ user: 'test ' });
    expect(response.status).toEqual(200);
  });
  test('PUT /posts', async () => {
    const response = await request(server)
      .put('/api/posts')
      .send({ user: 'test', reddit_id: 1, read: true });
    expect(response.status).toEqual(200);
  });
  test('DELETE /posts', async () => {
    const response = await request(server)
      .delete('/api/posts')
      .send({ date: new Date('2100-01-01') });
    expect(response.status).toEqual(204);
  });
  test('GET /posts-together', async () => {});
  test('DELETE /posts-title', async () => {});
  test('DELETE /posts/:id', async () => {});
});
