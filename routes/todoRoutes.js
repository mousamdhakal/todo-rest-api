const router = require('express').Router();

const {
  addTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
} = require('../controllers/todoController');
const {
  validateTodoInput,
} = require('../middlewares/validations/todo/todo.validation');

// Validate input before creating todo
router.post('/', validateTodoInput, addTodo);

router.get('/', getAllTodos);

// Validate input before updating todo
router.put('/', validateTodoInput, updateTodo);

router.delete('/', deleteTodo);

module.exports = router;
