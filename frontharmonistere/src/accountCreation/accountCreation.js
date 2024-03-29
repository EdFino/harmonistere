import React, { useState } from 'react';
import './accountCreation.css';
import Navbar from '../navbar/navbar';
import harmonistereCharacter from '../images/harmonistereCharacter.jpg';
import harmonistereCharacterTwo from '../images/harmonistereCharacter2.jpg';
import axios from 'axios';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Link } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, registerUser } from "../assets/firebase";


function AccountCreation() {

    const [formData, setFormData] = useState({
        pseudo: '',
        age: '',
        gender: '',
        email: '',
    });

    const [email, setEmail] = useState ('');
    const [password, setPassword] = useState ('');
    const [user, loading, error] = useAuthState(auth);

    const [showModal, setShowModal] = useState(false);

    const register = () => {
        registerUser(email, password)
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'email') {
            setEmail(value);
        }
        setFormData({ ...formData, [name]: value });
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log (email);
        console.log(password);
        console.log(formData);
    
        try {

            axios.post('http://localhost:5038/backharmonistere/accountCreation', formData);

            await registerUser(email, password);
            setShowModal(true);

    
    
            // 3. Affichage de la confirmation de création du compte
            console.log('Données envoyées avec succès');
        } catch (error) {
            console.error('Erreur lors de l\'envoi des données :', error);
            // Gérer les erreurs ici, par exemple afficher un message d'erreur à l'utilisateur
        }
    };
    
    

    const closeModal = () => {
        setShowModal(false);
    };

    const [selectedGender, setSelectedGender] = useState('');

    const handleGenderChange = (event) => {
        setSelectedGender(event.target.value);
    };

/*     <label htmlFor='passwordSecond'>Veuillez confirmer votre mot de passe : </label>
    <input type='password' id='passwordCreationConfirm' name='passwordSecond' value={formData.passwordSecond} onChange={handleChange} /><br /> */

    return (
        <div id="accountCreationTotal">
            <div className='columnContainerCharacter'>
                <img src={harmonistereCharacter} alt="Harmonistère à la gauche de l'écran" className="characterColumnImg" />
            </div>

            <div id="contenuAccountCreation">
                <Navbar width="50%" />
                <h1 id="accountCreationTitle">Formulaire de création de compte</h1>
                <div id="AccountForm">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='pseudo'>Votre pseudo : </label>
                        <input type='text' id='pseudoPlayer' name='pseudo' value={formData.pseudo} onChange={handleChange} /><br />
                        <label htmlFor='age'>Votre âge : </label>
                        <input type='text' id='agePlayer' name='age' value={formData.age} onChange={handleChange} /><br />
                        <label htmlFor="gender">Votre genre : </label>
                        <select id="genderSelect" name="gender" value={formData.gender} onChange={handleChange}>
                            <option value="">Sélectionnez votre genre</option>
                            <option value="female">Femme</option>
                            <option value="male">Homme</option>
                            <option value="other">Autre</option>
                        </select><br />
                        <label htmlFor='email'>Votre email : </label>
                        <input type='email' id='emailCreation' name='email' value={email} onChange={handleChange} /><br />

                        <label htmlFor='password'>Votre mot de passe : </label>
                        <input type='password' id='passwordCreation' name='password' value={password} onChange={(e) => setPassword(e.target.value)} /><br />

                        <button type='submit'>Créer votre compte</button>
                    </form>
                </div>
            </div>

            <div className='columnContainerCharacter'>
                <img src={harmonistereCharacterTwo} alt="Harmonistère d'eau à la droite de l'écran" className="characterColumnImg" />
            </div>

            <Popup open={showModal} onClose={closeModal} modal nested closeOnDocumentClick={false}>
                {(close) => (
                    <div className='modal'>
                        <div className='content'>
                            <h2>Merci !</h2>
                            <p>Votre compte a été créé avec succès.</p>
                            <Link to="/"><button onClick={close}>Retourner à l'accueil</button></Link> {/* Utilisation de Link pour créer un lien */}
                        </div>
                    </div>
                )}
            </Popup>
        </div>
    )
}

export default AccountCreation;