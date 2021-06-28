const { Router } = require('express');

const { signIn, login } = require('../controllers/auth.controller');

const router = Router();

router.post('/register', signIn),
router.post('/login', login);

module.exports = router;