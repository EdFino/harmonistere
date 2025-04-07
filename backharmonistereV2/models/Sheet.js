// models/sheetModel.js
const mongoose = require('mongoose');

const sheetSchema = new mongoose.Schema({
    email: { type: String, required: true },
    sheetData: {
        characterName: { type: String },
        characterAge: { type: String },
        benderOrNot: { type: Boolean },
        benderSelect: { type: String },
        principalTrait: { type: String},
        ascendantTrait: { type: String},
        neutralTrait: { type: String},
        oppositeTrait: { type: String},
        skills: { type: String },
        notes: { type: String },
        physicDescription: { type: String },
        mentalDescription: { type: String },
        story: { type: String },
        bodyLevel: { type: String },
        mindLevel: { type: String },
        soulLevel: { type: String },
        martialArtsLevel: { type: String },
        elementaryArtsLevel: { type: String },
        speakingLevel: { type: String },
    },
}, { collection: 'Sheets', versionKey: false });

module.exports = mongoose.model('Sheet', sheetSchema);