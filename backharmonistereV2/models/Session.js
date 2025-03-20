// models/sessionModel.js
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const sessionSchema = new mongoose.Schema({
    sessionName: { type: String, required: true },
    gmSession: { type: String, required: true },
    playersSession: [{
        character: { type: String },
        emailPlayer: { type: String }
    }]
},
{ collection: 'Sessions', versionKey: false });

module.exports = mongoose.model('Session', sessionSchema);