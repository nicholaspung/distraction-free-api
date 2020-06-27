const server = require('../../server');
const request = require('supertest');

const testToken = process.env.TEST_TOKEN;

describe.only('#users routes', () => {
  test('GET /users', async () => {
    const response = await request(server)
      .get('/api/users')
      .set({ Authorization: `Bearer ${testToken}` });
    expect(response.status).toEqual(200);
  });
  test('POST /users', async () => {
    const response = await request(server)
      .post('/api/users')
      .send({ user: 'test' });
    expect(response.status).toEqual(201);
  });
  test('DELETE /users', async () => {
    const response = await request(server)
      .delete('/api/users')
      .send({ user: 'test' });
    expect(response.status).toEqual(204);
  });
});
