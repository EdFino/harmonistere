// routes/sessionRoutes.js
const express = require('express');
const sessionController = require('../controllers/sessionController');
const router = express.Router();

router.get('/get', sessionController.getUserSessions);
router.post('/create', sessionController.createSession);
router.post('/rejoin', sessionController.rejoinSession);
router.delete('/delete/:id', sessionController.deleteSession);
router.get('/charactersInSession/:id/', sessionController.getCharactersInSession);

module.exports = router;