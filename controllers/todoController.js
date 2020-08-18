const { v4: uuidv4 } = require('uuid');

const { add, getAll, update, remove } = require('../services/todoServices');

/**
 * Add new todo
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Function} next Function as a reference to call next middleware
 */
let addTodo = (req, res, next) => {
  // Generate new unique id for the todo
  req.body.id = uuidv4();
  // Add the todo in the database
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

/**
 * Get all todos in database for the user with provided token
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Function} next Function as a reference to call next middleware
 */
let getAllTodos = (req, res, next) => {
  getAll(req.body, (err, results) => {
    if (err) {
      return next(err);
    }
    // If there are no todos in database for the user,
    if (!results) {
      return res.json({
        message: 'No todos in the Database for the user',
        status: 200,
      });
    }
    return res.json({
      data: results,
      status: 200,
    });
  });
};

/**
 * Update the todo provided
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Function} next Function as a reference to call next middleware
 */
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

/**
 * Delete the todo provided
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Function} next Function as a reference to call next middleware
 */
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
