import React, { useState, useEffect } from 'react';
import { auth } from '../assets/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import axios from 'axios';
import './titleSession.css';

function TitleSession ({sessionId, roleSession}) {

    const[user] = useAuthState(auth);

    const [sessionName, setSessionName] = useState('');

    useEffect(() => {
        if (user && sessionId) {
            axios.get(`http://localhost:5038/api/sessions/titleSession/${sessionId}`)
                .then(response => {
                    setSessionName(response.data.sessionName);
                })
                .catch(error => {
                    console.log('Erreur lors de la récupération du nom de la session : ', error);
                });
        }
    }, [user, sessionId]);

    useEffect(() => {
        console.log('A-t-on récupéré le rôle dans titleSession ? ', roleSession);
    }, [roleSession]);

    return (

        <div id='titleSession'>
            {sessionName && <h3>{sessionName}</h3>}
            {user ? <h2>{user.email}</h2> : <h2>Loading...</h2>}
            {roleSession}
        </div>

    )
}

export default TitleSession;