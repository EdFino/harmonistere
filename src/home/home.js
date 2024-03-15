import './home.css';
import { Link } from 'react-router-dom';
import harmonistereHome from '../images/harmonistereHome.jpg';
import React from 'react';
import useNoScrollFunction from '../noScrollFunction';
import { Navigate } from 'react-router-dom';

function Home() {
    useNoScrollFunction();
    let isLogged = true;

        return (
            <div className="App">
                <img id="homeArt" src={harmonistereHome} alt="Ecran de la page principale" />
                <h1 id="mainPageTitle">HARMONISTERE</h1>
                <div id="mainMenu">
                    <ul id="ulMenu">
                        {!isLogged && <li><Link to="/login">Connexion à votre compte</Link></li>}
                        {isLogged && <li><Link to="/login">Déconnexion</Link></li>}
                        {!isLogged && <li><Link to="/creationdecompte">Création d'un compte</Link></li>}
                        {isLogged && <li><Link to="/univers">Univers</Link></li>}
                        <li><Link to={'/creationfiche'}>Créer une fiche</Link></li>
                        {isLogged && <li><Link to="/espacejoueur">Votre espace joueur</Link></li>}
                        <li><Link to={'lanceur'}>Lanceur de dés</Link></li>
                    </ul>
                </div>
            </div>
        );
    }

export default Home;
