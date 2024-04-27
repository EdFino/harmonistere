import React, { useState } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Link } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, registerUser } from "../assets/firebase";
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup" ;
import DOMPurify from 'dompurify';
import style from '../style/kitUI.module.css';
import './accountCreationPanel.css';

const schema = yup.object({

    pseudoPlayer: yup.string()
        .required('N\' oubliez pas votre pseudo !')
        .max(20, 'Le pseudo ne doit pas dépasser 20 caractères'),

    agePlayer: yup.number()
        .positive('Votre âge doit être positif...')
        .integer('veuillez ne pas mettre de virgule')
        .required('Vous devez mentionner votre âge.'),

    genderPlayer: yup.string()
        .required('N\'oubliez pas votre genre.'),
    
    emailPlayer: yup.string()
        .email('Veuillez entrer une adresse email valide.')
        .required('Vous devez mentionner votre adresse email.'),
    
    passwordPlayer: yup.string()
        .required('Vous devez entrer un mot de passe.')
        .min(8, 'Votre mot de passe doit comporter au moins 8 caractères.'),

  })
  .required()

function AccountCreationPanel({loadingAuthCreation}) {
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

        data.pseudoPlayer = DOMPurify.sanitize(data.pseudoPlayer);
        data.emailPlayer = DOMPurify.sanitize(data.emailPlayer);
        data.passwordPlayer = DOMPurify.sanitize(data.passwordPlayer);

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

        <div id="contenuAccountCreation">
            <form id="accountForm" onSubmit={handleSubmit(onSubmit)}>
                <input
                    type='text'
                    id='pseudoPlayer'
                    className={style.inputHarmonistere}
                    name='pseudoPlayer'
                    placeholder='Pseudo'
                    {...register("pseudoPlayer")}/>
                    <br />
                {errors.pseudoPlayer && <><span className='invalid-feedback'>{errors.pseudoPlayer.message}</span><br/></>}

                <input
                    type='number'
                    id='agePlayer'
                    className={style.inputHarmonistere}
                    name='agePlayer'
                    placeholder='Âge'
                    {...register("agePlayer")}/>
                    <br />
                {errors.agePlayer && <><span className='invalid-feedback'>{errors.agePlayer.message}</span><br/></>}

                <select
                    id="genderPlayer"
                    name="genderPlayer"
                    className={style.inputSelectHarmonistere}
                    {...register("genderPlayer")}>
                    <option value="" disabled selected hidden>Genre</option>
                    <option value="female" className={style.optionHarmonistere}>Femme</option>
                    <option value="male" className={style.optionHarmonistere}>Homme</option>
                    <option value="other" className={style.optionHarmonistere}>Autre</option>
                </select><br />
                {errors.genderPlayer && <><span className='invalid-feedback'>{errors.genderPlayer.message}</span><br/></>}

                <input
                    type='email'
                    id='emailPlayer'
                    className={style.inputHarmonistere}
                    name='emailPlayer'
                    placeholder='E-mail'
                    {...register("emailPlayer")}/><br />
                {errors.emailPlayer && <><span className='invalid-feedback'>{errors.emailPlayer.message}</span><br/></>}

                <input
                    type='password'
                    id='passwordPlayer'
                    className={style.inputHarmonistere}
                    name='passwordPlayer'
                    placeholder='Mot de passe'
                    {...register("passwordPlayer")}/><br />
                {errors.passwordPlayer && <><span className='invalid-feedback'>{errors.passwordPlayer.message}</span><br/></>}

                <button className={style.buttonHarmonistere}type='submit'>S'inscrire</button>

                <div id='bottomAccountForm'>
                    <p>Déjà un compte ?&nbsp;</p><span onClick={loadingAuthCreation} id='connectUnderline'>Connectez-vous</span>
                </div>
            </form>

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
        </div>    )
}

export default AccountCreationPanel;