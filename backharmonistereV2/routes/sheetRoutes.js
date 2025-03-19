// routes/sheetRoutes.js
const express = require('express');
const sheetController = require('../controllers/sheetController');
const router = express.Router();

router.post('/createSheet', sheetController.createSheet);
router.get('/readSheet', sheetController.readSheet);

module.exports = router;