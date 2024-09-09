// controllers/userController.js
const User = require('../models/userModel');

// Création de compte
exports.createAccount = async (req, res) => {
    try {
        const { pseudo, emailPlayer, password } = req.body;
        const newUser = new User({ pseudo, emailPlayer, password });
        await newUser.save();
        res.status(201).json({ message: 'Compte créé avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création du compte' });
    }
};

// Connexion utilisateur
exports.login = async (req, res) => {
    try {
        const { pseudo, password } = req.body;
        const user = await User.findOne({ pseudo });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Identifiants incorrects' });
        }
        res.status(200).json({ message: 'Connexion réussie' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
};
