const {
  addTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
} = require('../controllers/todoController');
const router = require('express').Router();

router.post('/', addTodo);
router.get('/', getAllTodos);
router.put('/', updateTodo);
router.delete('/', deleteTodo);

module.exports = router;
