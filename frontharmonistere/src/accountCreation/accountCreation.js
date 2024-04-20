import React, { useState } from 'react';
import './accountCreation.css';
import Navbar from '../navbar/navbar';
import harmonistereCharacter from '../images/harmonistereCharacter.jpg';
import harmonistereCharacterTwo from '../images/harmonistereCharacter2.jpg';
import axios from 'axios';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, registerUser } from "../assets/firebase";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup" ;

const schema = yup.object({

    pseudoPlayer: yup.string()
        .required('Attention : vous devez avoir un pseudo !')
        .max(20, 'Attention : votre pseudo ne doit pas comporter plus de 20 caractères'),

    agePlayer: yup.number('Attention, veuillez ne mettre que des chiffres')
        .positive('Attention : Votre âge doit être positif, bien évidemment...')
        .integer('Attention, veuillez ne pas mettre de virgule')
        .required('Attention : Vous devez mentionner votre âge.'),

    genderPlayer: yup.string()
        .required('Attention : Vous devez sélectionner votre genre.'),
    
    emailPlayer: yup.string()
        .email('Attention : Veuillez entrer une adresse email valide.')
        .required('Attention : Vous devez mentionner votre adresse email.'),
    
    passwordPlayer: yup.string()
        .required('Attention : Vous devez entrer un mot de passe.')
        .min(8, 'Attention : Votre mot de passe doit comporter au moins 8 caractères.'),

  })
  .required()

function AccountCreation() {
    const { register, handleSubmit, formState: { errors, isSubmitted, isSubmitSuccessful } } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(schema)
    });   

    async function isEmailUnique(email) {
        try {
            const response = await axios.get(`http://localhost:5038/backharmonistere/checkEmail?email=${email}`);
            return response.data.isUnique;
        } catch (error) {
            console.error('Erreur lors de la vérification de l\'unicité de l\'e-mail :', error);
            return false;
        }
    }
    
    const onSubmit = async (data) => {
    console.log(data);

    try {

        const emailIsUnique = await isEmailUnique(data.emailPlayer);
        
        if (!emailIsUnique) {
            alert('Cet e-mail est déjà utilisé.');
            return;
        }

        const { passwordPlayer, ...dataWithoutPassword } = data;

            await axios.post('http://localhost:5038/backharmonistere/accountCreation', dataWithoutPassword);
            setShowModal(true);
            await registerUser(data.emailPlayer, data.passwordPlayer);
            console.log('Formulaire soumis', isSubmitted);
            console.log('Formulaire parfait', isSubmitSuccessful);
    } catch (error) {
            if (error.response && error.response.status === 400) {
                const errorMessage = error.response.data;
                if (errorMessage === 'Email déjà utilisé') {
                    alert('Cet e-mail est déjà utilisé.');
                } else {
                    console.error('Erreur lors de la soumission du formulaire :', error);
                }
            } else {
                console.error('Erreur lors de la soumission du formulaire :', error);
            }
        }
};

    const closeModal = () => {
        setShowModal(false);
    };

    const [showModal, setShowModal] = useState(false);

    return (
        <div id="accountCreationTotal">
            <div className='columnContainerCharacter'>
                <img src={harmonistereCharacter} alt="Harmonistère à la gauche de l'écran" className="characterColumnImg" />
            </div>

            <div id="contenuAccountCreation">
                <Navbar width="50%" />
                <h1 id="accountCreationTitle">Formulaire de création de compte</h1>
                <div id="AccountForm">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor='pseudoPlayer'>Votre pseudo : </label>
                        <input type='text' id='pseudoPlayer' name='pseudoPlayer' {...register("pseudoPlayer")}/><br />
                        {errors.pseudoPlayer && <><span className='invalid-feedback'>{errors.pseudoPlayer.message}</span><br/></>}

                        <label htmlFor='agePlayer'>Votre âge : </label>
                        <input type='number' id='agePlayer' name='agePlayer' {...register("agePlayer")}/><br />
                        {errors.agePlayer && <><span className='invalid-feedback'>{errors.agePlayer.message}</span><br/></>}

                        <label htmlFor="genderPlayer">Votre genre : </label>
                        <select id="genderPlayer" name="genderPlayer" {...register("genderPlayer")}>
                            <option value="">Sélectionnez votre genre</option>
                            <option value="female">Femme</option>
                            <option value="male">Homme</option>
                            <option value="other">Autre</option>
                        </select><br />
                        {errors.genderPlayer && <><span className='invalid-feedback'>{errors.genderPlayer.message}</span><br/></>}

                        <label htmlFor='emailPlayer'>Votre email : </label>
                        <input type='email' id='emailPlayer' name='emailPlayer' {...register("emailPlayer")}/><br />
                        {errors.emailPlayer && <><span className='invalid-feedback'>{errors.emailPlayer.message}</span><br/></>}

                        <label htmlFor='passwordPlayer'>Votre mot de passe : </label>
                        <input type='password' id='passwordPlayer' name='passwordPlayer' {...register("passwordPlayer")}/><br />
                        {errors.passwordPlayer && <><span className='invalid-feedback'>{errors.passwordPlayer.message}</span><br/></>}


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
