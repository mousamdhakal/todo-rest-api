const { pool } = require('../config/database');

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
