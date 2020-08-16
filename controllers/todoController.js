const { add, getAll, update, remove } = require('../services/todoServices');

const { v4: uuidv4 } = require('uuid');

let addTodo = (req, res, next) => {
  req.body.id = uuidv4();
  add(req.body, (err, result) => {
    if (err) {
      return next(err);
    }
    return res.json({
      message: 'Todo added successfully',
      data: req.body,
      status: 200,
    });
  });
};

let getAllTodos = (req, res, next) => {
  getAll(req.body, (err, results) => {
    if (err) {
      return next(err);
    }
    if (!results) {
      return next('Records not found for the user');
    }

    return res.json({
      data: results,
      status: 200,
    });
  });
};

let updateTodo = (req, res, next) => {
  update(req.body, (err, result) => {
    if (err) {
      return next(err);
    }
    if (result.affectedRows === 0) {
      return next('Failed to update todo');
    }
    return res.json({
      message: 'Updated successfully',
      data: req.body,
      status: 200,
    });
  });
};

let deleteTodo = (req, res, next) => {
  remove(req.body, (err, result) => {
    if (err) {
      return next(err);
    }
    if (result.affectedRows === 0) {
      return next('Failed to delete');
    }
    return res.json({
      message: 'Todo deleted successfully',
      status: 200,
    });
  });
};

module.exports = {
  addTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
};
