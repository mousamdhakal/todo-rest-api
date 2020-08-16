const { register, getUserByEmail } = require('../services/authServices');

const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

let createUser = (req, res, next) => {
  // Check if user exists already and send response here
  const body = req.body;
  const salt = genSaltSync(10);
  body.password = hashSync(body.password, salt);
  register(body, (err, result) => {
    if (err) {
      return next(err);
    }
    return res.status(200).json({
      message: 'User created successfully, login to get access',
      status: 200,
    });
  });
};

let login = (req, res, next) => {
  const body = req.body;
  getUserByEmail(body.email, (err, results) => {
    if (err) {
      next(err);
    }
    if (results === undefined) {
      return next('Invalid email or password');
    }
    const result = compareSync(body.password, results.password);
    if (result) {
      results.password = undefined;
      const jsonwebtoken = sign({ result: results }, process.env.JWTSECRETKEY, {
        expiresIn: '24h',
      });
      return res.json({
        message: 'login successfully',
        token: jsonwebtoken,
        status: 200,
      });
    } else {
      return next('Invalid email or password');
    }
  });
};

module.exports = {
  createUser,
  login,
};
