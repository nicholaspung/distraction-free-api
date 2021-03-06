const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

module.exports = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 20,
    jwksUri: `https://dev-b8-4w1hq.auth0.com/.well-known/jwks.json`,
  }),

  // Validate the audience and the issuer.
  audience: 'https://www.myexperiment.life/api',
  issuer: `https://dev-b8-4w1hq.auth0.com/`,
  algorithms: ['RS256'],
});
