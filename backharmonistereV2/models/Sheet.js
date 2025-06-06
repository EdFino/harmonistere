// models/sheetModel.js
const mongoose = require('mongoose');

const relationSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    status: { type: String, required: true }
}, { _id: false });

const subInjurySchema = new mongoose.Schema({
    isInjured: { type: Boolean, default: false },
    checkboxSelected: { type: Number, default: 0 }
}, { _id: false });

const injurySchema = new mongoose.Schema({
    lightInjuries: { type: Number, default: 0 },
    bodyInjured: subInjurySchema,
    mindInjured: subInjurySchema,
    soulInjured: subInjurySchema,
    martialInjured: subInjurySchema,
    elementInjured: subInjurySchema,
    speakingInjured: subInjurySchema,
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
        relations: { type: [relationSchema], default: [] },
        breath: { type: Number },
        focus: { type: Number },
        synergy: { type: Number },
        injuries: injurySchema
    },
}, { collection: 'Sheets', versionKey: false });

module.exports = mongoose.model('Sheet', sheetSchema);