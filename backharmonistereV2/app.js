// app.js

// Connexion à MongoDB avant de démarrer le serveur
require('dotenv').config();

// Importation des modules
const connectDB = require('./config/db');



const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
// const db = require('./config/db');
const playerRoutes = require('./routes/playerRoutes');
const sheetRoutes = require('./routes/sheetRoutes');
const sessionRoutes = require('./routes/sessionRoutes');

connectDB();


// Initialisation de l'application
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    },
});

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/api/players', playerRoutes);
app.use('/api/sheets', sheetRoutes);
app.use('/api/sessions', sessionRoutes);

// Gestion des connexions WebSocket
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on("send_message", (data) => {
        socket.broadcast.emit("receive_message", data);
    });
    socket.on("send_dice_results", (data) => {
        io.emit("receive_dice_results", data);
    });
});

// Lancement du serveur
const PORT = process.env.PORT || 5038;
server.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});
