
require('dotenv').config();

const { MongoClient } = require ('mongodb');
const client = new MongoClient (process.env.MONGO_URL);

async function main () {
    await client.connect();
    console.log ("Connexion Ok !");
    const db = client.db('harmonistere');
    const collection = db.collection('Players');
    const insertStuff = await collection.insertMany([{ JD:'Joueur'}, { Flo:'Joueur'}, {Emile:'MJ'} ]);
    console.log (`Documents insérés => ${insertStuff}`);
    return 'done';
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(()=> client.close());