import './home.css';
import { Link } from 'react-router-dom';
import harmonistereHome from '../images/imageHome.png';
import degradeHome from '../images/degrade.png';
import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import { logIn, auth, logOut } from '../assets/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import ConnexionPanel from './connexionPanel';
import greatTitle from '../images/Harmonistère.png';
import WelcomePlayer from './welcomePlayer';

function Home() {

    const [user, error] = useAuthState (auth);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);

    if (isLoading) {
        return <div>Chargement en cours...</div>;
    }
    
        return (
            <div className="App">
                <img id="homeArt" src={harmonistereHome} alt="Ecran de la page principale" />
                <img id="degradeArt" src={degradeHome} alt="Dégradé de la page principale" />
                <img id="greatTitleHarmonistere" src={greatTitle} alt="Grand titre harmonistère" />
                    <ul id="ulMenu">
                        {user && <li id='deconnectLi'onClick={logOut}>Déconnexion</li>}
                        {!user && <li><Link to="/creationdecompte">Création d'un compte</Link></li>}
                        {user && <li><Link to="/univers">Univers</Link></li>}
                        <li><Link to={'/creationfiche'}>Créer une fiche</Link></li>
                        {user && <li><Link to="/espacejoueur">Votre espace joueur</Link></li>}
                        <li><Link to={'lanceur'}>Lanceur de dés</Link></li>
                    </ul>
                    <div id='connexionPanelTotal'>
                        {!user && <ConnexionPanel />}            
                    {user && <WelcomePlayer/>}</div>
                    </div>
        );
    }

export default Home;
