// models/sessionModel.js
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const sessionSchema = new mongoose.Schema({
    sessionName: { type: String, required: true },
    GM: { type: String, required: true },
    players: [{
        character: { type: String },
        emailPlayer: { type: String }
    }]
},
{ collection: 'Sessions', versionKey: false });

module.exports = mongoose.model('Session', sessionSchema);