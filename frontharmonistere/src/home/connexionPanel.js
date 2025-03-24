import React, { useState } from 'react';
import leftArrow from '../images/Deco Titre gauche.png';
import rightArrow from '../images/Deco Titre droite.png';
import { auth, logIn } from '../assets/firebase';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import style from '../style/kitUI.module.css';
import './connexionPanel.css';


function ConnexionPanel ({loadingAccountCreation, buttonSize}) {

    const [email, setEmail] = useState ('');
    const [password, setPassword] = useState ('');
    const [user, error] = useAuthState (auth);
    const [errorMessage, setErrorMessage] = useState ('');

    async function handleSubmit (e) {
        e.preventDefault();
        try {
            await logIn(email, password);
        } catch (error) {
            setErrorMessage('Votre email et/ou votre mot de passe sont incorrects.')
        }
    }

    return (

        <div id='connexionPanelTotal'>
                <form id='newFormAuth' onSubmit={handleSubmit}>
                <div id='authFormText'>

                    <div id='titleAuthForm'>
                        <img id="leftTitleDeco" className='arrowDeco' src={leftArrow} alt="Flèche décorative à gauche" />
                        <h4>Login</h4>
                        <img id="rightTitleDeco" className='arrowDeco' src={rightArrow} alt="Flèche décorative à droite" />
                    </div>

                    <input type='email' id='emailPlayer' className={style.inputHarmonistere} name='emailPlayer' placeholder='E-mail' onChange={(e) => setEmail(e.target.value)} required /><br/>

                    <input type='password' id='passwordPlayer' className={style.inputHarmonistere} name='passwordPlayer' placeholder='Mot de passe' onChange={(e) => setPassword(e.target.value)} required /><br/>

                    {errorMessage && <p className='errorMessage'>{errorMessage}</p>}

                    <button id='buttonAuthForm' className={style.buttonHarmonistere} style={{paddingLeft:buttonSize, paddingRight:buttonSize}} type='submit'>Se connecter</button><br/>
                    <div id='bottomAuthForm'>
                    <p>Mot de passe oublié ?&nbsp;<Link to='/resetPassword'><span className='toAccount'> Cliquez ici</span></Link></p>
                        <div id='linkNewAccount'>
                            <p>Pas de compte ?&nbsp;</p><span className='toAccount' onClick={loadingAccountCreation}>Créez-en un</span>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ConnexionPanel