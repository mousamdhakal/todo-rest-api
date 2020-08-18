const router = require('express').Router();

const authRouter = require('./routes/authRoutes');
const todoRouter = require('./routes/todoRoutes');
const { authenticateToken } = require('./middlewares/authenticate');

router.use('/auth', authRouter);
// Require authentication to access all todo paths
router.use('/todo', authenticateToken, todoRouter);

module.exports = router;
