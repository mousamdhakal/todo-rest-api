const authRouter = require('./routes/authRoutes');
const todoRouter = require('./routes/todoRoutes');

const { authenticateToken } = require('./middlewares/authenticate');

const router = require('express').Router();

router.use('/auth', authRouter);
router.use('/todo', authenticateToken, todoRouter);

module.exports = router;
