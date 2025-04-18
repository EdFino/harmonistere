const Player = require('../models/Player');

// Vérifier si l'email est unique
exports.checkEmail = async (req, res) => {
    const email = req.query.email;
    try {
        const existingUser = await Player.findOne({ emailPlayer: email });
        const isUnique = !existingUser;
        res.json({ isUnique });
        console.log ('Email bel et bien unique !')
    } catch (error) {
        console.error('Erreur lors de la vérification de l\'unicité du machin :', error);
        res.status(500).send('Erreur lors de la vérification de l\'unicité de la chose');
    }
};

// Créer un nouvel utilisateur
exports.createAccount = async (req, res) => {
    console.log('Données reçues par le back-end:', req.body);
    const { pseudoPlayer, birthdayPlayer, genderPlayer, emailPlayer } = req.body;
    try {
        const newPlayer = new Player({ pseudoPlayer, birthdayPlayer, genderPlayer, emailPlayer });
        console.log('Données à enregistrer dans MongoDB:', newPlayer);
        await newPlayer.save();
        res.status(201).json({ message: 'Compte créé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la création du compte :', error);
        res.status(500).json({ error: error.message || 'Erreur lors de la création du compte' });
    }
};


// Connexion utilisateur
exports.login = async (req, res) => {
    try {
        const { pseudo, password } = req.body;
        const user = await Player.findOne({ pseudo });
        if (!user || user.passwordPlayer !== password) {
            return res.status(401).json({ message: 'Identifiants incorrects' });
        }
        res.status(200).json({ message: 'Connexion réussie' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
};