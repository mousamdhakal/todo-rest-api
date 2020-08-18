const { pool } = require('../config/database');

/**
 * Insert new todo into database
 * @param {Object} data Data to insert in database
 * @param {Function} callBack Function to be invoked on completion of database query
 */
let add = (data, callBack) => {
  pool.query(
    `INSERT INTO todo(id,todos,completed,user_id) values(?,?,?,?)`,
    [data.id, data.todo, data.completed, data.user.id],
    (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

/**
 * Get all todos for this user from the database
 * @param {Object} data Data containing user for which the todos are to be fetched
 * @param {Function} callBack Function to be invoked on completion of database query
 */
let getAll = (data, callBack) => {
  pool.query(
    `SELECT id,todos,completed FROM todo WHERE user_id=?`,
    [data.user.id],
    (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

/**
 * Update the todo in the database
 * @param {Object} data Data to be updated in the database
 * @param {Function} callBack Function to be invoked on completion of database query
 */
let update = (data, callBack) => {
  pool.query(
    `UPDATE todo SET todos=?, completed=? WHERE id=? AND user_id= ?`,
    [data.todo, data.completed, data.id, data.user.id],
    (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

/**
 * Data containing id of todo to be removed
 * @param {Object} data Data to insert in database
 * @param {Function} callBack Function to be invoked on completion of database query
 */
let remove = (data, callBack) => {
  pool.query(
    `DELETE from todo WHERE id=? AND user_id= ?`,
    [data.id, data.user.id],
    (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

module.exports = {
  add,
  getAll,
  update,
  remove,
};
