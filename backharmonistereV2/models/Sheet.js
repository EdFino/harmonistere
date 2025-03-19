// models/sheetModel.js
const mongoose = require('mongoose');

const sheetSchema = new mongoose.Schema({
    email: { type: String, required: true },
    sheetData: { type: Object, required: true },
},
{ collection: 'Sheets', versionKey: false });

module.exports = mongoose.model('Sheet', sheetSchema);