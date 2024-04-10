import React, { useEffect, useState } from 'react';
import AvatarPlayers from './avatarPlayers';
import { useParams } from 'react-router-dom';
import Navbar from '../navbar/navbar';
import { auth } from '../assets/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import DashboardGM from './dashboardGM';
import Popup from 'reactjs-popup';
import './session.css';
import TitleSession from './titleSession';


function Session () {

    const [user] = useAuthState(auth);
    const { id } = useParams()

    return (
        <>
        <Navbar/>
        <div id='allSession'>
            <div id='leftColumnSession'>

                <TitleSession/>

                <AvatarPlayers sessionId={id}/>

                <div id='GMMenu'>
                    <DashboardGM/>
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
                    <div id='synergyTokenPool'>
                        <h2>Plein de petits jetons d'initiative</h2>
                    </div>
                </div>
                <div id='displaySpaceSession'>
                    <h2>C'est ici que je veux tout mon espace d'affichage</h2>
                </div>

                <div id='chatBoxSession'>
                    <h2>Oui, je mets la chatbox ici, elle sera dépliante</h2>
                </div>
            </div>

            <div id='rightColumnSession'>
                <div id='diceLauncherSession'>
                    <h3>Ici, nous aurons le joli lanceur de dés</h3>
                </div>

                <div id='chatLogSession'>
                    <h3>Nous pouvons enfin voir le résultat de tout le monde</h3>
                </div>

            </div>
        </div>


        </>
    )
}

export default Session;