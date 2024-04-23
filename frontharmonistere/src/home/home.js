import './home.css';
import { Link } from 'react-router-dom';
import harmonistereHome from '../images/harmonistereHome.jpg';
import { React, useState } from 'react';
import useNoScrollFunction from './noScrollFunction';
import Popup from 'reactjs-popup';
import { logIn, auth, logOut } from '../assets/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import ConnexionPanel from './connexionPanel';
import greatTitle from '../images/Harmonistère.png';

function Home() {
    useNoScrollFunction();

    const [email, setEmail] = useState ('');
    const [password, setPassword] = useState ('');
    const [user, error] = useAuthState (auth);
    
        return (
            <div className="App">
                <img id="homeArt" src={harmonistereHome} alt="Ecran de la page principale" />
                <img id="greatTitleHarmonistere" src={greatTitle} alt="Grand titre harmonistère" />
                    <ul id="ulMenu">
                        <Popup trigger=
        {
        <div>
            {!user && <li id='connexionButtonPopup'>Connexion à votre compte</li>}
        </div>}
        position="left center">
                        <label htmlFor='emailPlayer'>Votre email</label>
                        <input type='email' id='emailPlayer' name='emailPlayer' onChange={(e) => setEmail(e.target.value)} required /><br/>

                        <label htmlFor='passwordPlayer'>Votre mot-de-passe</label>
                        <input type='password' id='passwordPlayer' name='passwordPlayer' onChange={(e) => setPassword(e.target.value)} required /><br/>

                        <button type='submit' onClick={() => logIn(email, password)}>Connexion</button><br/>
                        <Link to='/resetPassword'>Mot de passe oublié ?</Link>
        </Popup>
                        {user && <li onClick={logOut}>Déconnexion</li>}
                        {!user && <li><Link to="/creationdecompte">Création d'un compte</Link></li>}
                        {user && <li><Link to="/univers">Univers</Link></li>}
                        <li><Link to={'/creationfiche'}>Créer une fiche</Link></li>
                        {user && <li><Link to="/espacejoueur">Votre espace joueur</Link></li>}
                        <li><Link to={'lanceur'}>Lanceur de dés</Link></li>
                        <li><Link to={'/testco'}>Test de connexion</Link></li>
                    </ul>
                    <ConnexionPanel/>
            </div>
        );
    }

export default Home;
