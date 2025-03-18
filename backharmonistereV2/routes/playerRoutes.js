// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');

router.get('/checkEmail', playerController.checkEmail);
router.post('/createAccount', playerController.createAccount);
router.post('/login', playerController.login);

module.exports = router;