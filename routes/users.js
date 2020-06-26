const express = require('express');
const router = express.Router();

const users_controller = require('../controllers/users');

router.post('/signup', users_controller.user_signup);

router.post('/signin', users_controller.user_signin);

module.exports = router;
