import React, { useState, useEffect } from 'react';
import './avatarPlayers.css';

function AvatarPlayers({ charactersInSession }) {

    const storedCharacters = JSON.parse(localStorage.getItem('charactersInSession'));

    const [characters, setCharacters] = useState(storedCharacters || []);

    useEffect(() => {
        if (characters.length === 0 && charactersInSession.length > 0) {
            setCharacters(charactersInSession);
        }
    }, [charactersInSession]);

    useEffect(() => {
        localStorage.setItem('charactersInSession', JSON.stringify(characters));
    }, [characters]);

    console.log('charactersInSession:', charactersInSession);
    console.log('characters:', characters);
    console.log(localStorage);

    return (
        <div id='avatarSession'>
            <ul id='avatarList'>
                <p>Joueurs</p>
                {!characters ? (
                    <p>loading...</p>
                ) : (
                    characters.map((character, index) => (
                        <li key={index}>{character}</li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default AvatarPlayers;
