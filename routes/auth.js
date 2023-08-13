const express = require('express');
const { login } = require('../controller/login');
const { register } = require('../controller/register');

const router = express.Router();

// login route. path used is /auth/login
router.post('/login', login);

router.post('/register', register);

module.exports = router;
