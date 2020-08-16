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

router.post('/', validateTodoInput, addTodo);
router.get('/', getAllTodos);
router.put('/', validateTodoInput, updateTodo);
router.delete('/', deleteTodo);

module.exports = router;
