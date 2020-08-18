const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const {
  register,
  getUserByEmail,
  remove,
} = require('../services/authServices');

/**
 * Create new user with given information
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Function} next Function as a reference to call next middleware
 */
let createUser = (req, res, next) => {
  const body = req.body;

  // Hash the password to store in database
  const salt = genSaltSync(10);
  body.password = hashSync(body.password, salt);

  // Get unique id for the user
  body.id = uuidv4();

  // Check if the user with that email already exists
  getUserByEmail(body.email, (err, result) => {
    if (result) {
      next('Email already exists, try logging in or use another email');
    }
  });

  // Store the user credentials in database
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

/**
 * Login user with provided email and password
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Function} next Function as a reference to call next middleware
 */
let login = (req, res, next) => {
  const body = req.body;

  // Get the user credentials from database
  getUserByEmail(body.email, (err, results) => {
    if (err) {
      return next(err);
    }
    if (results === undefined) {
      return next('Invalid email or password');
    }

    // Check if the password entered is correct
    const result = compareSync(body.password, results.password);
    if (result) {
      results.password = undefined;

      // Create new jsonwebtoken for user authorization
      const jsonwebtoken = sign({ result: results }, process.env.JWTSECRETKEY);
      return res.json({
        message: 'login successfully',
        token: jsonwebtoken,
        data: results,
        status: 200,
      });
    } else {
      return next('Invalid email or password');
    }
  });
};

/**
 * Delete the user loggin in via the jsonwebtoken provided
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Function} next Function as a reference to call next middleware
 */
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
