const axios = require('axios');
require('dotenv').config();
const server = require('../../server');
const request = require('supertest');

/** Only works when connected to internet */
describe('#users routes', () => {
  let testToken = '';

  beforeAll(() => {
    const data = {
      grant_type: 'client_credentials',
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: process.env.AUTH0_AUDIENCE,
    };
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data,
      url: `${process.env.AUTH0_DOMAIN}/oauth/token`,
    };
    return axios(options).then((res) => {
      testToken = res.data.access_token;
    });
  });

  test('GET /users', async () => {
    const response = await request(server)
      .get('/api/users')
      .set('Authorization', `Bearer ${testToken}`);
    expect(response.status).toEqual(200);
  });
  test('POST /users', async () => {
    const response = await request(server)
      .post('/api/users')
      .set('Authorization', `Bearer ${testToken}`)
      .send({ user: 'test' });
    expect(response.status).toEqual(201);
  });
  test('DELETE /users', async () => {
    const response = await request(server)
      .delete('/api/users')
      .set('Authorization', `Bearer ${testToken}`)
      .send({ user: 'test' });
    expect(response.status).toEqual(204);
  });
});
