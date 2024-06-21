import './home.css';
import { Link, NavLink } from 'react-router-dom';
import harmonistereHome from '../images/imageHome.png';
import degradeHome from '../images/degrade.png';
import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import { logIn, auth, logOut } from '../assets/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import ConnexionPanel from './connexionPanel';
import greatTitle from '../images/Harmonistère.png';
import WelcomePlayer from './welcomePlayer';
import AccountCreationPanel from './accountCreationPanel';
import kit from '../style/kitUI.module.css';

function Home() {

    const [user, error] = useAuthState (auth);
    const [isLoading, setIsLoading] = useState(true);
    const [newAccount, setNewAccount] = useState (false);

    const buttonSize = '80px';

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);

    if (isLoading) {
        return <div>Chargement en cours...</div>;
    }

    function loadingAccountCreation () {
        setNewAccount(true);
    }

    function loadingAuthCreation () {
        setNewAccount(false);
    }
    
        return (
            <div className="App">
                <img id="homeArt" src={harmonistereHome} alt="Ecran de la page principale" />
                <img id="degradeArt" src={degradeHome} alt="Dégradé de la page principale" />
                <img id="greatTitleHarmonistere" src={greatTitle} alt="Grand titre harmonistère" />
                    <ul id="homeNavbar" className={`${kit.navbarHarmonistere} ${kit.beigeNavbarHarmonistere}`}>
                        {user && <li id='deconnectLi' className={kit.navbarLiHarmonistere} onClick={logOut}>Déconnexion</li>}
                        {user && <li className={kit.navbarLiHarmonistere}>
                            <NavLink exact to="/univers" activeclassName="active">Univers</NavLink>
                        </li>}
                        {!user && <li id='inscriptionLi' className={kit.navbarLiHarmonistere} onClick={loadingAccountCreation}>Inscription</li>}
                        <li className={kit.navbarLiHarmonistere}>
                            <NavLink exact activeclassName="active" to={'/creationfiche'}>Créer une fiche</NavLink>
                        </li>
                        {user && <li className={kit.navbarLiHarmonistere}>
                            <NavLink exact activeclassName="active" to="/espacejoueur">Votre espace joueur</NavLink>
                            </li>}
                        <li className={kit.navbarLiHarmonistere}>
                            <NavLink exact activeclassName="active" to={'/lanceur'}>Lanceur de dés</NavLink>
                        </li>
                    </ul>
                    <div id='connexionPanelTotal'>
                        {newAccount && <AccountCreationPanel loadingAuthCreation={loadingAuthCreation} buttonSize={buttonSize} />}
                        {!newAccount && !user && <ConnexionPanel loadingAccountCreation={loadingAccountCreation} buttonSize={buttonSize} />}
                        {user && <WelcomePlayer />}
                    </div>
                </div>
        );
    }

export default Home;
