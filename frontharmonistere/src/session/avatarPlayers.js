import React, { useState, useEffect } from 'react';
import './avatarPlayers.css';

function AvatarPlayers({ charactersInSession }) {

    useEffect(() => {
        console.log('charactersInSession: ', charactersInSession)
    }, [charactersInSession]);

    return (
        <div id='avatarSession'>
            <ul id='avatarList'>
                <p>Joueurs</p>
                {charactersInSession.length === 0 ? (
                    <p>Personne pour le moment</p>
                ) : (
                    charactersInSession.map((character, index) => (
                        <li key={index}>{character}</li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default AvatarPlayers;
