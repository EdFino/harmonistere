// controllers/sheetController.js
const Sheet = require('../models/Sheet');

exports.createSheet = async (req, res) => {
    try {
        const { email, sheetData } = req.body;
        const newSheet = new Sheet({ email, sheetData });
        await newSheet.save();
        res.status(201).json({ message: 'Fiche créée avec succès' });
    } catch (error) {
        console.error('Grosse erreur lors de la création de la fiche :', error);
        res.status(500).json({ error: 'Erreur lors de la création de la fiche' });
    }
};

exports.readSheet = async (req, res) => {
    try {
        const email = req.query.email;
        const sheets = await Sheet.find({ email });
        res.status(200).json(sheets);
    } catch (error) {
        console.error('Erreur lors de la récupération de la fiche :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des fiches' });
    }
};

exports.updateSheet = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedSheetData = req.body.sheetData;

        console.log('ID reçu pour mise à jour :', id);
        console.log('Données reçues pour mise à jour :', updatedSheetData);

        const sheet = await Sheet.findById(id);
        if (!sheet) {
            return res.status(404).json({ error: 'Fiche non trouvée' });
        }

        // Remplacement complet de sheetData
        sheet.sheetData = updatedSheetData;

        // Très important si sheetData est un objet imbriqué ou Mixed
        sheet.markModified('sheetData');

        await sheet.save();

        res.status(200).json({ message: 'Fiche mise à jour avec succès', sheet });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la fiche :', error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la fiche' });
    }
};

exports.getSheet = async (req, res) => {
    try {
        const { id } = req.params;
        const sheet = await Sheet.findById(id);
        if (!sheet) {
            return res.status(404).json({ error: 'Fiche non trouvée' });
        }
        res.status(200).json(sheet);
    } catch (error) {
        console.error('Erreur lors de la récupération de la fiche :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération de la fiche' });
    }
};

exports.deleteSheet = async (req, res) => {
    try {
        const { id } = req.params; // Récupère l'ID de la fiche à supprimer
        console.log('ID reçu pour suppression :', id);

        const sheet = await Sheet.findByIdAndDelete(id); // Supprime la fiche par son ID

        if (!sheet) {
            return res.status(404).json({ error: 'Fiche non trouvée' });
        }

        res.status(200).json({ message: 'Fiche supprimée avec succès', sheet });
    } catch (error) {
        console.error('Erreur lors de la suppression de la fiche :', error);
        res.status(500).json({ error: 'Erreur lors de la suppression de la fiche' });
    }
};