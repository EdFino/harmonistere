// models/sheetModel.js
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const sheetSchema = new mongoose.Schema({
    email: { type: String, required: true },
    sheetData: { type: Object, required: true },
});

module.exports = mongoose.model('Sheet', sheetSchema);
