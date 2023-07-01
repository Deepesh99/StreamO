const express = require('express');

const { login } = require('../controller/login');

const router = express.Router();

// login route. path used is /auth/login
router.post('/login', login);

module.exports = router;
