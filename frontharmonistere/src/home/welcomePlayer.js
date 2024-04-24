import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../assets/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import './welcomePlayer.css';

function WelcomePlayer () {

    const [user] = useAuthState(auth);

    const [playerName, setPlayerName] = useState('');

    console.log ('voici lemail seigneur', user);
    console.log ('ok cool', user.email)

    useEffect(() => {
        if (user.email) {
        axios.get(`http://localhost:5038/backharmonistere/welcomeUser?email=${user.email}`)
            .then (response => {
                setPlayerName(response.data);
            })
                .catch(error => {
                    console.log('Erreur lors de la récupération des données : ', error);
                });
            }
    }, [user])


    return (

        <div id='welcomingPanel'>
            Bienvenue {playerName}</div>
    )
}

export default WelcomePlayer;