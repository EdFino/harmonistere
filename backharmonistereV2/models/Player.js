const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    pseudoPlayer: {
        type: String,
        required: true,
        maxLength: 20
    },
    agePlayer: {
        type: Number,
        required: true,
        min: 0
    },
    genderPlayer: {
        type: String,
        required: true
    },
    emailPlayer: {
        type: String,
        required: true,
        unique: true
    }
}, { collection: 'Players', versionKey: false });

const Player = mongoose.model('Players', playerSchema);

module.exports = Player;