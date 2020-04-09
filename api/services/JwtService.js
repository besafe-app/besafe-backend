const jwt = require('jsonwebtoken');
const jwtSecret = sails.config.secrets.jwtSecret;
const algorithm = sails.config.secrets.algorithm;
const expiresIn = sails.config.secrets.expireToken;

module.exports = {
  issue: (payload) => {
    const token = jwt.sign(payload, jwtSecret, { algorithm });
    return token;
  },

  verify: (token, callback) => {
    return jwt.verify(token, jwtSecret, callback);
  }
};
