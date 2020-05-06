const jwt = require('jsonwebtoken');

const { jwtSecret } = sails.config.secrets; // eslint-disable-line
const { algorithm } = sails.config.secrets; // eslint-disable-line

module.exports = {
  issue: (payload) => {
    const token = jwt.sign(payload, jwtSecret, { algorithm });
    return token;
  },

  verify: (token, callback) => jwt.verify(token, jwtSecret, callback),
};
