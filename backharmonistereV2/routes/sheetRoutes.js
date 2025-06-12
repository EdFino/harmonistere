// routes/sheetRoutes.js
const express = require('express');
const sheetController = require('../controllers/sheetController');
const router = express.Router();

router.post('/createSheet', sheetController.createSheet);
router.get('/readSheet', sheetController.readSheet);
router.get('/getSheet/:id', sheetController.getSheet);
router.put('/updateSheet/:id', sheetController.updateSheet);
router.delete('/deleteSheet/:id', sheetController.deleteSheet);
router.get('/search', sheetController.searchSheets);

module.exports = router;