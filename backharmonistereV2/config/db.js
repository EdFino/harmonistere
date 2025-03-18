require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://edfino:1f0ywbpR5WU6sR8F@fino.tlj3u2l.mongodb.net/harmonistere?retryWrites=true&w=majority&appName=fino'
            , {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ Connexion réussie à MongoDB !");
    } catch (error) {
        console.error("❌ Erreur de connexion MongoDB:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
