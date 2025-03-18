// Import des modules nécessaires
/*const Express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');

// Configuration de l'application Express
const app = Express();
const http = require('http');
const { Server } = require('socket.io');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on('connection', (socket) => {
console.log(`User connected : ${socket.id}`)

    socket.on("send_message", (data) => {
        console.log(data);
        socket.broadcast.emit("receive_message", data)
    });

    socket.on("send_dice_results", (data) => {
        console.log(data);
        io.emit("receive_dice_results", data);
    });
})

server.listen(3001, () => {
    console.log ('SERVER IS RUNNING');
})

// Configuration de la connexion à MongoDB
const CONNEXION_STRING = "mongodb+srv://edfino:1f0ywbpR5WU6sR8F@fino.tlj3u2l.mongodb.net/?retryWrites=true&w=majority&appName=fino";
const DATABASE_NAME = "harmonistere";
let database;

// Connexion à MongoDBF
MongoClient.connect(CONNEXION_STRING)
  .then(client => {
    database = client.db(DATABASE_NAME);
    console.log('Connexion avec MongoDB établie !');

    // Route GET pour lire les données de la collection "Sheets"
// Route GET pour lire les données de la collection "Sheets" en fonction de l'e-mail de l'utilisateur
app.get('/backharmonistere/readSheetsData', (request, response) => {
    const userEmail = request.query.email; // Récupérer l'e-mail de l'utilisateur depuis la requête

    if (!database) {
        response.status(500).send('La connexion à la base de données MongoDB n\'est pas établie');
        return;
    }

    // Filtrer les données de la collection "Sheets" par e-mail de l'utilisateur
    database.collection('Sheets').find({ email: userEmail }).toArray((error, documents) => {
        if (error) {
            console.error('Erreur lors de la lecture des données de la collection "Sheets" :', error);
            response.status(500).send('Erreur lors de la récupération des données');
            return;
        }
        response.setHeader('Content-Type', 'application/json'); // Ajout de l'en-tête Content-Type
        response.json(documents); // Renvoyer les données filtrées au format JSON
    });
});

app.get('/backharmonistere/readSessionsData', (request, response) => {
    const userEmail = request.query.email;

    if (!database) {
        response.status(500).send('La connexion à la base de données MongoDB n\'est pas établie');
        return;
    }

    database.collection('Session').find({ GM: userEmail }).toArray((error, documents) => {
        if (error) {
            console.error('Erreur lors de la lecture des données de la collection "Sheets" :', error);
            response.status(500).send('Erreur lors de la récupération des données');
            return;
        }
        console.log ('oui bonjour toi');
        response.setHeader('Content-Type', 'application/json');
        response.json(documents);
    });
});

// Route DELETE pour supprimer une fiche de la collection "Sheets"
app.delete('/backharmonistere/deleteSheet/:id', (req, res) => {
    const userId = req.params.id; // Récupérer l'ID de la fiche à supprimer

    // Vérifier si l'ID est valide
    if (!ObjectId.isValid(userId)) {
        res.status(400).send('L\'ID de la fiche est invalide');
        return;
    }

    // Supprimer la fiche de la collection "Sheets" en utilisant l'ID
    database.collection('Sheets').deleteOne({ _id: ObjectId(userId) })
        .then(result => {
            if (result.deletedCount === 1) {
                res.status(200).send('La fiche a été supprimée avec succès');
            } else {
                res.status(404).send('La fiche avec cet ID n\'a pas été trouvée');
            }
        })
        .catch(error => {
            console.error('Erreur lors de la suppression de la fiche :', error);
            res.status(500).send('Erreur lors de la suppression de la fiche');
        });
});

app.delete('/backharmonistere/deleteSession/:id', (req, res) => {
    const userId = req.params.id; // Récupérer l'ID de la fiche à supprimer

    // Vérifier si l'ID est valide
    if (!ObjectId.isValid(userId)) {
        res.status(400).send('L\'ID de la fiche est invalide');
        return;
    }

    // Supprimer la fiche de la collection "Sheets" en utilisant l'ID
    database.collection('Session').deleteOne({ _id: ObjectId(userId) })
        .then(result => {
            if (result.deletedCount === 1) {
                res.status(200).send('La fiche a été supprimée avec succès');
            } else {
                res.status(404).send('La fiche avec cet ID n\'a pas été trouvée');
            }
        })
        .catch(error => {
            console.error('Erreur lors de la suppression de la fiche :', error);
            res.status(500).send('Erreur lors de la suppression de la fiche');
        });
});

app.get('/backharmonistere/readSheetsData/:id', (request, response) => {
    const userId = request.params.id; // Récupérer l'ID de l'utilisateur depuis les paramètres de l'URL
    const userEmail = request.query.email; // Récupérer l'e-mail de l'utilisateur depuis la requête

    if (!database) {
        response.status(500).send('La connexion à la base de données MongoDB n\'est pas établie');
        return;
    }

    // Filtrer les données de la collection "Sheets" par e-mail de l'utilisateur et l'ID
    database.collection('Sheets').find({ _id: ObjectId(userId), email: userEmail }).toArray((error, documents) => {
        if (error) {
            console.error('Erreur lors de la lecture des données de la collection "Sheets" :', error);
            response.status(500).send('Erreur lors de la récupération des données');
            return;
        }
        response.setHeader('Content-Type', 'application/json'); // Ajout de l'en-tête Content-Type
        response.json(documents); // Renvoyer les données filtrées au format JSON
    });
});



    // Route POST pour enregistrer les données du formulaire de création de compte
    app.post('/backharmonistere/accountCreation', multer().none(), (request, response) => {
        if (!database) {
            response.status(500).send('La connexion à la base de données MongoDB n\'est pas établie');
            return;
        }
    
        const formData = request.body;
    
        // Insertion des données dans la base de données
        database.collection('Players').insertOne(formData, (insertError, insertResult) => {
            if (insertError) {
                console.error('Erreur lors de l\'enregistrement des données :', insertError);
                response.status(500).send('Erreur lors de l\'enregistrement des données');
                return;
            }
            response.json('Données enregistrées avec succès');
        });
    });
    
    
    

    // Route POST pour enregistrer les données du formulaire de création de fiche
    app.post('/backharmonistere/sheetCreation', multer().none(), (request, response) => {
        if (!database) {
            response.status(500).send('La connexion à la base de données MongoDB n\'est pas établie');
            return;
        }

        const formData = request.body;
        database.collection('Sheets').insertOne(formData, (error, result) => {
            if (error) {
                console.error('Erreur lors de l\'enregistrement des données :', error);
                response.status(500).send('Erreur lors de l\'enregistrement des données');
                return;
            }
            console.log (formData);
            response.json('Données de la fiche enregistrées avec succès');
        });
    });

    // Route POST pour la connexion de l'utilisateur
    app.post('/backharmonistere/login', (request, response) => {
        if (!database) {
            response.status(500).send('La connexion à la base de données MongoDB n\'est pas établie');
            return;
        }

        const { pseudo, password } = request.body;

        // Vérifier si l'utilisateur existe dans la collection Players
        database.collection('Players').findOne({ pseudo: pseudo }, (error, user) => {
            if (error) {
                console.error('Erreur lors de la recherche de l\'utilisateur :', error);
                response.status(500).send('Erreur lors de la recherche de l\'utilisateur');
                return;
            }

            if (!user) {
                // Utilisateur non trouvé
                response.status(404).send('Utilisateur non trouvé');
                return;
            }

            // Vérifier si le mot de passe est correct
            if (password !== user.password) {
                // Mot de passe incorrect
                response.status(401).send('Mot de passe incorrect');
                return;
            }

            // Authentification réussie
            response.status(200).send('Connexion réussie');
        });
    });

    console.log('Serveur Express démarré sur le port 5038');
    // Maintenant que la connexion est établie, démarrer le serveur Express
    app.listen(5038);
  })
  .catch(error => {
    console.error('Erreur lors de la connexion à MongoDB :', error);
  });

// Fonction pour lire les données de la collection "Sheets"
function readSheetsData(callback) {
    if (!database) {
        callback('La connexion à la base de données MongoDB n\'est pas établie', null);
        return;
    }
    const sheetsCollection = database.collection('Sheets');

    const collectionTrouvee = sheetsCollection.find({}); 
    console.log("Collection : ", collectionTrouvee)

    sheetsCollection.find({}).toArray((error, documents) => {
        if (error) {
            callback('Erreur lors de la lecture des données de la collection "Sheets"', null);
            return;
        }
        callback(null, documents);
    });
}

// Route PUT pour mettre à jour les caractéristiques d'une fiche dans la collection "Sheets"
// Route GET pour récupérer les données d'une fiche spécifique
app.get('/backharmonistere/updateSheet/:id', (req, res) => {
    const sheetId = req.params.id;

    // Vérifier si l'ID est valide
    if (!ObjectId.isValid(sheetId)) {
        return res.status(400).send('L\'ID de la fiche est invalide');
    }

    // Récupérer les données de la fiche avec l'ID spécifié depuis la base de données
    database.collection('Sheets').findOne({ _id: ObjectId(sheetId) }, (err, sheet) => {
        if (err) {
            console.error('Erreur lors de la récupération de la fiche :', err);
            return res.status(500).send('Erreur lors de la récupération de la fiche');
        }
        if (!sheet) {
            return res.status(404).send('La fiche avec cet ID n\'a pas été trouvée');
        }
        res.status(200).json(sheet);
        console.log('Chocolat Taïga');
    });
});

app.get('/backharmonistere/checkEmail', async (request, response) => {
    if (!database) {
      response.status(500).send('La connexion à la base de données MongoDB n\'est pas établie');
      return;
    }
  
    const email = request.query.email;
    console.log ('voici lemail a verifier', email)
  
    try {
      // Recherche dans la base de données MongoDB si l'email existe déjà
      const existingUser = await database.collection('Players').findOne({ emailPlayer: email });
  
      // Si aucun utilisateur avec cet email n'est trouvé, alors l'email est unique
      const isUnique = !existingUser;
      if (isUnique){console.log ('Tout est bon, ladresse est unique')}
  
      response.json({ isUnique: isUnique });
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'unicité de l\'e-mail :', error);
      response.status(500).send('Erreur lors de la vérification de l\'unicité de l\'e-mail');
    }
  });
  

// Route PUT pour mettre à jour les données d'une fiche spécifique
app.put('/backharmonistere/updateSheet/:id', multer().none(), (req, res) => {
    const sheetId = req.params.id;
    const formData = req.body;

    // Vérifier si l'ID est valide
    if (!ObjectId.isValid(sheetId)) {
        return res.status(400).send('L\'ID de la fiche est invalide');
    }

    // Mettre à jour les données de la fiche avec l'ID spécifié
    database.collection('Sheets').updateOne({ _id: ObjectId(sheetId) }, { $set: formData }, (err, result) => {
        if (err) {
            console.error('Erreur lors de la mise à jour de la fiche :', err);
            return res.status(500).send('Erreur lors de la mise à jour de la fiche');
        }
        if (result.modifiedCount === 0) {
            return res.status(404).send('La fiche avec cet ID n\'a pas été trouvée');
        }
        res.status(200).send('La fiche a été mise à jour avec succès');
    });
});

app.post('/backharmonistere/sessionCreation', multer().none(), (request, response) => {
    if (!database) {
        response.status(500).send('La connexion à la base de données MongoDB n\'est pas établie');
        return;
    }

    const formDataSession = request.body;
    database.collection('Session').insertOne(formDataSession, (error, result) => {
        if (error) {
            console.error('Erreur lors de l\'enregistrement des données :', error);
            response.status(500).send('Erreur lors de l\'enregistrement des données');
            return;
        }
        console.log (formDataSession);
        response.json('Données de la fiche enregistrées avec succès');
    });
});

// Route POST pour rejoindre une session
app.post('/backharmonistere/rejoinSession', (req, res) => {
    try {
        const { sessionID, playerCharacter, playerEmail } = req.body;

        // Vous pouvez maintenant utiliser sessionID pour filtrer la session à mettre à jour
        // et ajouter le joueur à la liste des joueurs de cette session dans la base de données

        // Exemple : Mettre à jour la session dans la base de données
        database.collection('Session').updateOne(
            { _id: ObjectId(sessionID) }, // Filtrer la session par ID
            { $push: { players: {character : playerCharacter, emailPlayer : playerEmail} } } // Ajouter le joueur à la liste des joueurs
        )
        .then(result => {
            if (result.modifiedCount === 1) {
                res.status(200).json({ message: 'Joueur ajouté à la session avec succès' });
            } else {
                res.status(404).json({ error: 'La session avec cet ID n\'a pas été trouvée' });
            }
        })
        .catch(error => {
            console.error('Erreur lors de la mise à jour de la session :', error);
            res.status(500).json({ error: 'Erreur lors de la mise à jour de la session' });
        });
    } catch (error) {
        console.error('Erreur lors de la tentative de rejoindre la session :', error);
        res.status(500).json({ error: 'Erreur lors de la tentative de rejoindre la session' });
    }
});

// Route GET pour récupérer les noms des sessions où l'utilisateur est joueur
// Route GET pour récupérer les sessions où l'utilisateur est joueur avec leurs noms et IDs
app.get('/backharmonistere/userSessions', (req, res) => {
    try {
        const userEmail = req.query.email; // Récupérer l'e-mail de l'utilisateur depuis la requête

        // Vérifier si l'e-mail de l'utilisateur est fourni
        if (!userEmail) {
            return res.status(400).json({ error: "L'e-mail de l'utilisateur est requis" });
        }

        // Rechercher les sessions où l'e-mail de l'utilisateur correspond à celui d'un joueur
        database.collection('Session').find({ 'players.emailPlayer': userEmail }, { projection: { _id: 1, sessionName: 1 } }).toArray((error, sessions) => {
            if (error) {
                console.error('Erreur lors de la recherche des sessions de l\'utilisateur :', error);
                return res.status(500).json({ error: "Erreur lors de la recherche des sessions de l'utilisateur" });
            }
            res.status(200).json(sessions);
        });
    } catch (error) {
        console.error('Erreur lors de la recherche des sessions de l\'utilisateur :', error);
        res.status(500).json({ error: "Erreur lors de la recherche des sessions de l'utilisateur" });
    }
});


// Route GET pour récupérer les noms des personnages dans une session spécifique en fonction de l'ID de la session
app.get('/backharmonistere/charactersInSession/:id/:email', (req, res) => {
    const sessionId = req.params.id;
    const userEmail = req.params.email;
    console.log (userEmail); // Vous devez avoir un moyen de récupérer l'e-mail de l'utilisateur connecté


    if (!database) {
        res.status(500).send('La connexion à la base de données MongoDB n\'est pas établie');
        return;
    }

    database.collection('Session').findOne({ _id: ObjectId(sessionId) }, (err, session) => {
        if (err) {
            console.error('Erreur lors de la recherche de la session :', err);
            res.status(500).send('Erreur lors de la recherche de la session');
            return;
        }

        if (!session) {
            res.status(404).send('Session non trouvée');
            return;
        }

        // Récupérer les noms des personnages participants de la session
        const characterNames = session.players.map(player => player.character);
        console.log (characterNames);

        const connectedPlayer = session.players.find(player => player.emailPlayer === userEmail);
        const connectedPlayerPseudo = connectedPlayer ? connectedPlayer.character : 'Rien trouvé';

        res.status(200).json({ characters: characterNames, connectedPlayerPseudo: connectedPlayerPseudo });
    });
});

app.get('/backharmonistere/titleSession/:id', async (req, res) => {
    try {
        const sessionId = req.params.id;
        // Assume database connection is already established
        const session = await database.collection('Session').findOne({ _id: ObjectId(sessionId) });
        if (session) {
            res.status(200).json({ sessionName: session.sessionName });
        } else {
            res.status(404).json({ error: 'Session not found' });
        }
    } catch (error) {
        console.error('Error while fetching session name:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to determine user role in a session
app.get('/backharmonistere/userRole/:id', async (req, res) => {
    try {
        const sessionId = req.params.id;
        const userEmail = req.query.email;
        
        const session = await database.collection('Session').findOne({ _id: ObjectId(sessionId) });
        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }

        if (session.GM === userEmail) {
            return res.status(200).json({ role: 'MJ' });
        }

        const player = session.players.find(player => player.emailPlayer === userEmail);
        if (player) {
            return res.status(200).json({ role: 'Joueur/euse' });
        }

        return res.status(200).json({ role: 'Spectateur' });
    } catch (error) {
        console.error('Error while determining user role:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/backharmonistere/deleteCharacterSession/:id', (req, res) => {
    const sessionId = req.params.id;
    const characterNameToDelete = req.body.characterName;

    database.collection('Session').updateOne(
        { _id: ObjectId(sessionId) },
        { $pull: { players: { character: characterNameToDelete } } },
        { multi: true }, // Pour supprimer tous les documents correspondants
        (err, result) => {
            if (err) {
                console.error('Erreur lors de la suppression du personnage :', err);
                res.status(500).send('Erreur lors de la suppression du personnage');
                return;
            }
            res.status(200).send('Personnage supprimé avec succès');
        }
    );    
});

app.get('/backharmonistere/welcomeUser', async (req, res) => {
    const { emailPlayer } = req.query;
    if (!emailPlayer) {
        return res.status(400).json({ error: "Veuillez fournir un email" });
    }

    try {
        const player = await database.collection('Players').findOne({ emailPlayer });
        if (!player) {
            return res.status(404).json({ error: "Joueur non trouvé" });
        }
        res.status(200).json(player.pseudoPlayer);
    } catch (err) {
        console.error('Erreur lors de la recherche du joueur :', err);
        res.status(500).json({ error: "Erreur lors de la recherche du joueur" });
    }
});*/