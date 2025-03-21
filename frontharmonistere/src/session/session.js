import React, { useEffect, useState } from 'react';
import AvatarPlayers from './avatarPlayers';
import { useParams } from 'react-router-dom';
import Navbar from '../navbar/navbar';
import { auth } from '../assets/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import DashboardGM from './dashboardGM';
import './session.css';
import TitleSession from './titleSession';
import axios from 'axios';
import ChatBox from './chatbox';
import SynergyTokenPool from './synergyTokenPool';
import DiceLauncherMini from '../diceLauncher/diceLauncherMini.js';
import io from 'socket.io-client';
import ChatLog from './chatlog.js';

const socket = io.connect("http://localhost:5038");

function Session() {
    const [user] = useAuthState(auth);
    const { id } = useParams();
    const [charactersInSession, setCharactersInSession] = useState([]);
    const [pseudoCharacter, setPseudoCharacter] = useState('');
    const [roleSession, setRoleSession] = useState('');


    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:5038/api/sessions/charactersInSession/${id}?email=${user.email}`)
                .then(response => {
                    setCharactersInSession(response.data.characters);
                    const isGM = response.data.isGM;
                    setRoleSession(isGM ? 'Vous êtes le MJ' : 'Vous êtes un joueur');
                    console.log('charactersInSession dans session.js : ', charactersInSession);
                })
                .catch(error => {
                    console.log('Erreur lors de la récupération des données : ', error);
                });
        }
    }, [id, user]);

    useEffect(() => {
        console.log('A-t-on récupéré le rôle ? ', roleSession);
    }, [roleSession]);

    const sendResultsToSocket = (data) => {
        socket.emit("send_dice_results", data);
    };

/*     const findCharacterNameByEmail = (email) => {
        const player = charactersInSession.find(player => player.emailPlayer === email);
        return player ? player.character : ''; // Si le joueur est trouvé, renvoyer le nom de son personnage, sinon une chaîne vide
    }; */
    
    return (
        <>
            <Navbar />
            <div id='allSession'>
                <div id='leftColumnSession'>

                    <TitleSession
                        sessionId={id}
                        roleSession={roleSession}
                    />

                    <AvatarPlayers
                        charactersInSession={charactersInSession}
                    />

                    <div id='GMMenu'>
                        <DashboardGM
                            charactersInSession={charactersInSession} />
                        <h2>Nous aurons un menu pour pouvoir gérer les ennemis</h2>
                        <h2>Ainsi que de prendre des notes</h2>
                        <h2>Ainsi bien sûr que de gérer la frise d'initiative</h2>
                    </div>

                </div>
                <div id='middleSession'>
                    <div id='topBarSession'>
                        <div id='initiativeFrieze'>
                            <h2>Coucou, c'est la frise</h2>
                        </div>
                    </div>
                    <div id='displaySpaceSession'>
                        <h2>C'est ici que je veux tout mon espace d'affichage</h2>
                    </div>

                    <ChatBox
                        pseudoCharacter={pseudoCharacter}/>
                </div>

                <div id='rightColumnSession'>

                    <SynergyTokenPool/>

                    <div id='diceLauncherSession'>
                        <DiceLauncherMini sendResultsToSocket={sendResultsToSocket}/>
                    </div>

                    <div id='chatLogSession'>
                        <ChatLog/>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Session;
