// models/sheetModel.js
const mongoose = require('mongoose');

const relationSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    status: { type: String, required: true }
}, { _id: false });

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
        powerLevel: { type: Number},
        relations: [relationSchema],
        focus: { type: String },
        breath: { type: String },
        synergy: { type: String },
        injuries: [{ type: String }]
    },
}, { collection: 'Sheets', versionKey: false });

module.exports = mongoose.model('Sheet', sheetSchema);