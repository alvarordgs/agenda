const express = require('express');
const authController = require('./../controller/auth');
const router = express.Router();

router.post('/login', authController.login);

router.get('/logout', authController.logout);

module.exports = router;