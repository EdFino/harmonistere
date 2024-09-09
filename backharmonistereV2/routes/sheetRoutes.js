// routes/sheetRoutes.js
const express = require('express');
const sheetController = require('../controllers/sheetController');
const router = express.Router();

router.post('/create', sheetController.createSheet);
router.get('/read', sheetController.readSheets);

module.exports = router;
