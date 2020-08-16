const jwt = require('jsonwebtoken');

let authenticateToken = function (req, res, next) {
  let token;
  if (req.headers['authorization']) token = req.headers['authorization'];
  if (req.headers['x-access-token']) token = req.headers['x-access-token'];
  if (req.headers['token']) token = req.headers['token'];

  if (!token) {
    return next({
      msg: 'Token Not Provided',
      status: 400,
    });
  }

  jwt.verify(token, process.env.JWTSECRETKEY, function (err, decoded) {
    if (err) {
      return next(err);
    }
    // req.user = decoded;
    // additional work
    // decoded uniquely identify hune key
    // db_query()
    // result
    // if (!result) {
    //     return next({
    //         msg: 'user removed from system'
    //     })
    // }
    req.body.user = decoded.result;
    next();
  });
};

module.exports = {
  authenticateToken,
};
