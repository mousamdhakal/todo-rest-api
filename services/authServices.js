const { pool } = require('../config/database');

let register = (data, callBack) => {
  pool.query(
    `INSERT INTO users(id,first_name,last_name,email,password) values(?,?,?,?,?)`,
    [data.id, data.first_name, data.last_name, data.email, data.password],
    (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

let getUserByEmail = (email, callBack) => {
  pool.query(
    `SELECT * FROM users WHERE email = ?`,
    [email],
    (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results[0]);
    }
  );
};

module.exports = {
  register,
  getUserByEmail,
};
