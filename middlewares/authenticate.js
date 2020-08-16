const jwt = require('jsonwebtoken');
const { getUserByEmail } = require('../services/authServices');

let authenticateToken = function (req, res, next) {
  let token;
  if (req.headers['authorization']) token = req.headers['authorization'];
  if (req.headers['x-access-token']) token = req.headers['x-access-token'];
  if (req.headers['token']) token = req.headers['token'];

  if (!token) {
    return next({
      message: 'Token Not Provided',
      status: 400,
    });
  }

  jwt.verify(token, process.env.JWTSECRETKEY, function (err, decoded) {
    if (err) {
      return next(err);
    }

    getUserByEmail(decoded.result.email, (err, result) => {
      if (result === undefined) {
        next('User removed from system try logging in again');
      }
    });

    req.body.user = decoded.result;
    next();
  });
};

module.exports = {
  authenticateToken,
};
