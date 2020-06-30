const axios = require('axios');
require('dotenv').config();
const request = require('supertest');
const server = require('../../server');

/** Only works when connected to internet
 *  Order matters
 */
describe('#titles routes', () => {
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

  test('POST /titles', async () => {
    const response = await request(server)
      .post('/api/titles')
      .set('Authorization', `Bearer ${testToken}`)
      .send({ title: 'hi' });
    expect(response.status).toEqual(201);
  });
  test('GET /titles', async () => {
    const response = await request(server)
      .get('/api/titles')
      .set('Authorization', `Bearer ${testToken}`);
    expect(response.status).toEqual(200);
  });
  test('PUT /titles', async () => {
    const response = await request(server)
      .put('/api/titles')
      .set('Authorization', `Bearer ${testToken}`)
      .send({ id: 1, title: 'hello' });
    expect(response.status).toEqual(200);
  });
  test('DELETE /titles/:id', async () => {
    const response = await request(server)
      .delete('/api/titles/1')
      .set('Authorization', `Bearer ${testToken}`)
      .send({ title: 'hello' });
    expect(response.status).toEqual(204);
  });
});
