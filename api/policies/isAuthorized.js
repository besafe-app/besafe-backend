/**
 * isAuthorized
 *
 * @description :: Policy to check if user is authorized with JSON web token
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

module.exports = (req, res, next) => {

  if (req.url.includes('swagger')) {
    return next();
  }

  let token;

  if (req.headers && req.headers.authorization) {
    let parts = req.headers.authorization.split(' ');

    if (parts.length == 2) {
      let scheme = parts[0];
      let credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }

    } else {
      return res.status(401).json('Wrong Authorization format, should be Authorization: Bearer [token]');
    }

  } else if (req.param('token')) {
    token = req.param('token');

    delete req.query.token;
  } else {
    return res.status(401).json('No Authorization header found.');
  }
  JwtService.verify(token, (err, decoded) => {
    if (err) return res.status(401).json('invalid-token');
    req.session.token = token;

    try {
      Users.findOne({
        id: decoded.id
      }).exec((err, result) => {
        if (err) return res.status(400).json(err);
        if (!result) return res.status(404).json('user-not-found');
        req.session.user = result;
  
        next();
      });
      
    } catch (error) {
      console.error(error);
      res.status(400).json({
        code: error.code,
        details: error.details
      });
    }

  });

}