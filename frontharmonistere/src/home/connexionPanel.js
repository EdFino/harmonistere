import React, { useState } from 'react';
import popUp1 from '../images/Pop-up 1.png';
import leftArrow from '../images/Deco Titre gauche.png';
import rightArrow from '../images/Deco Titre droite.png';
import { logIn } from '../assets/firebase';
import { Link } from 'react-router-dom';
import './connexionPanel.css';


function ConnexionPanel () {

    const [email, setEmail] = useState ('');
    const [password, setPassword] = useState ('');

    return (

        <div id='connexionPanelTotal'>
                <form id='newFormAuth'>
                <div id='authFormText'>

                    <div id='titleAuthForm'>
                        <img id="leftTitleDeco" className='arrowDeco' src={leftArrow} alt="Flèche décorative à gauche" />
                        <h4>Login</h4>
                        <img id="rightTitleDeco" className='arrowDeco' src={rightArrow} alt="Flèche décorative à droite" />
                    </div>

                    <input type='email' id='emailPlayer' name='emailPlayer' placeholder='E-mail' onChange={(e) => setEmail(e.target.value)} required /><br/>

                    <input type='password' id='passwordPlayer' name='passwordPlayer' placeholder='Mot de passe' onChange={(e) => setPassword(e.target.value)} required /><br/>

                    <button id='buttonAuthForm' type='submit' onClick={() => logIn(email, password)}>Se connecter</button><br/>
                    <div id='bottomAuthForm'>
                        <p>Pas de compte ?&nbsp;</p> <Link to='/resetPassword'><span id='passwordReset'>Créez-en un</span></Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ConnexionPanel