const {
  createUser,
  login,
  deleteUser,
} = require('../controllers/authController');
const router = require('express').Router();

const { authenticateToken } = require('../middlewares/authenticate');

const {
  validateUserInput,
} = require('../middlewares/validations/user/user.validation');
router.post('/', createUser);
router.post('/login', login);
router.delete('/', authenticateToken, deleteUser);

module.exports = router;
