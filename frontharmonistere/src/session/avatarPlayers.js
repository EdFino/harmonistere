import React from 'react';
import './avatarPlayers.css';

function AvatarPlayers({ charactersInSession }) {

    console.log ('ici ma variable qui ne fonctionne pas : ', charactersInSession);
    return (
        <div id='avatarSession'>
            <ul id='avatarList'>
                <p>Chocolat</p>
                {!charactersInSession ? (<p>loading...</p>) : (
                charactersInSession.map((character, index) => (
                    <li key={index}>{character}</li>
                ))
                )}
            </ul>
        </div>
    );
}

export default AvatarPlayers;
