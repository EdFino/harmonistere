import React, { useState, useEffect } from 'react';
import { auth } from '../assets/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import './titleSession.css';

function TitleSession () {

    const[user] = useAuthState(auth);

    return (

        <div id='titleSession'>
            <h1>Session</h1>
            {user ? <h2>{user.email}</h2> : <h2>Loading...</h2>}
        </div>

    )
}

export default TitleSession;