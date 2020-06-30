const axios = require('axios');
require('dotenv').config();
const request = require('supertest');
const server = require('../../server');

/** Only works when connected to internet
 *  Order matters
 */
describe('#posts routes', () => {
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

  test('POST /posts', async () => {
    const response = await request(server)
      .post('/api/posts')
      .set('Authorization', `Bearer ${testToken}`)
      .send({
        reddit_id: 1,
        user: 'test',
        read: true,
      });
    expect(response.status).toEqual(201);
  });
  test('GET /posts', async () => {
    const response = await request(server)
      .get('/api/posts')
      .set('Authorization', `Bearer ${testToken}`);
    expect(response.status).toEqual(200);
  });
});
