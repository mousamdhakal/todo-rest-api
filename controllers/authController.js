const {
  register,
  getUserByEmail,
  remove,
} = require('../services/authServices');

const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

let createUser = (req, res, next) => {
  // Check if user exists already and send response here
  console.log(req);
  const body = req.body;
  const salt = genSaltSync(10);
  body.password = hashSync(body.password, salt);
  body.id = uuidv4();

  getUserByEmail(body.email, (err, result) => {
    if (result) {
      next('Email already exists, try logging in or use another email');
    }
  });

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
      return next(err);
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

let deleteUser = (req, res, next) => {
  remove(req.body, (err, result) => {
    if (err) {
      return next(err);
    }
    if (result.affectedRows === 0) {
      return next('Failed to delete');
    }
    return res.json({
      message: 'User deleted successfully',
      status: 200,
    });
  });
};

module.exports = {
  createUser,
  login,
  deleteUser,
};
