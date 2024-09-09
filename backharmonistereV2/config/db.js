// config/db.js
const { MongoClient } = require('mongodb');
const CONNEXION_STRING = process.env.MONGO_URI || "mongodb://localhost:27017";
const DATABASE_NAME = "harmonistere";
let db;

MongoClient.connect(CONNEXION_STRING)
    .then(client => {
        db = client.db(DATABASE_NAME);
        console.log('Connected to MongoDB');
    })
    .catch(error => console.error('Error connecting to MongoDB:', error));

module.exports = db;
