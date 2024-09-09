// controllers/sheetController.js
const Sheet = require('../models/sheetModel');

exports.createSheet = async (req, res) => {
    try {
        const { email, sheetData } = req.body;
        const newSheet = new Sheet({ email, sheetData });
        await newSheet.save();
        res.status(201).json({ message: 'Fiche créée avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création de la fiche' });
    }
};

exports.readSheets = async (req, res) => {
    try {
        const email = req.query.email;
        const sheets = await Sheet.find({ email });
        res.status(200).json(sheets);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des fiches' });
    }
};
