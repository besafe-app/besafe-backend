const jwt = require('jsonwebtoken');

const { jwtSecret } = sails.config.secrets;
const { algorithm } = sails.config.secrets;

module.exports = {
  issue: (payload) => {
    const token = jwt.sign(payload, jwtSecret, { algorithm });
    return token;
  },

  verify: (token, callback) => jwt.verify(token, jwtSecret, callback),
};
