const router = require('express').Router();

const {
  createUser,
  login,
  deleteUser,
} = require('../controllers/authController');
const { authenticateToken } = require('../middlewares/authenticate');
const {
  validateUserInput,
} = require('../middlewares/validations/user/user.validation');

// Validate input before creating a user
router.post('/', validateUserInput, createUser);

router.post('/login', login);

// Require authentication token to delete current user
router.delete('/', authenticateToken, deleteUser);

module.exports = router;
