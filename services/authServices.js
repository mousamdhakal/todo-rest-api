const { pool } = require('../config/database');

/**
 * Insert new user into the database
 * @param {Object} data Data to insert in database
 * @param {Function} callBack Function to be invoked on completion of database query
 */
let register = (data, callBack) => {
  pool.query(
    `INSERT INTO user (id,first_name,last_name,email,password) values(?,?,?,?,?)`,
    [data.id, data.first_name, data.last_name, data.email, data.password],
    (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

/**
 * Get the user from the database with email provided
 * @param {String} data Data to insert in database
 * @param {Function} callBack Function to be invoked on completion of database query
 */
let getUserByEmail = (email, callBack) => {
  pool.query(
    `SELECT * FROM user WHERE email = ?`,
    [email],
    (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results[0]);
    }
  );
};

/**
 * Delete user from the database
 * @param {Object} data Data containing user to delete
 * @param {Function} callBack Function to be invoked on completion of database query
 */
let remove = (data, callBack) => {
  pool.query(
    `DELETE from user WHERE id=?`,
    [data.user.id],
    (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

module.exports = {
  register,
  getUserByEmail,
  remove,
};
