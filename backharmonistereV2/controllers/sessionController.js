// controllers/sessionController.js
const Session = require('../models/Session');

exports.checkSession = async (req, res) => {
    try {
        const email = req.query.email;
        const sessions = await Session.find({ email });
        res.status(200).json(sessions);
    } catch (error) {
        console.error('Erreur lors de la récupération de la session :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des sessions' });
    }
};

exports.createSession = async (req, res) => {
    try {
        const { sessionName, GM } = req.body;
        const newSession = new Session({ sessionName, GM });
        await newSession.save();
        res.status(201).json({ message: 'Session créée avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création de la session' });
    }
};

exports.rejoinSession = async (req, res) => {
    try {
        const { sessionID, playerCharacter, playerEmail } = req.body;
        await Session.updateOne(
            { _id: sessionID },
            { $push: { players: { character: playerCharacter, emailPlayer: playerEmail } } }
        );
        res.status(200).json({ message: 'Joueur ajouté à la session avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la session' });
    }
};
