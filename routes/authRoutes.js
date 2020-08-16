const { createUser, login } = require('../controllers/authController');
const router = require('express').Router();

const {
  validateUserInput,
} = require('../middlewares/validations/user/user.validation');
router.post('/', validateUserInput, createUser);
router.post('/login', login);

module.exports = router;
