import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { auth } from '../assets/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import './avatarPlayers.css';


function AvatarPlayers ( {sessionId}) {

    const [user] = useAuthState(auth);
    console.log({sessionId});

    const [charactersInSession, setCharactersInSession] = useState([]);

    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:5038/backharmonistere/charactersInSession/${sessionId}`)
                .then(response => {
                    setCharactersInSession(response.data.characters);
                    }
                )
                .catch(error => {
                    console.log('Erreur lors de la récupération des données : ', error);
                });            
        }
    }, [user]);

    return (

        <div id='avatarSession'>
            <ul id='avatarList'>
                {charactersInSession.map((character, index) => (
                    <li key={index}>{character}</li>
                ))}
            </ul>
        </div>
    )
}

export default AvatarPlayers;