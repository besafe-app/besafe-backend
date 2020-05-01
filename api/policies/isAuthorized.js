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
    const parts = req.headers.authorization.split(' ');

    if (parts.length === 2) {
      const scheme = parts[0];
      const credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    } else {
      return res
        .status(401)
        .json(
          'Wrong Authorization format, should be Authorization: Bearer [token]',
        );
    }
  } else if (req.param('token')) {
    token = req.param('token');

    delete req.query.token;
  } else {
    return res.status(401).json('No Authorization header found.');
  }

  return JwtService.verify(token, (err, decoded) => {
    if (err) return res.status(401).json('invalid-token');
    req.session.token = token;

    try {
      return Users.findOne({
        id: decoded.id,
      }).exec((error, result) => {
        if (error) return res.status(400).json(error);
        if (!result) return res.status(404).json('user-not-found');
        req.session.user = result;

        return next();
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        code: error.code,
        details: error.details,
      });
    }
  });
};
