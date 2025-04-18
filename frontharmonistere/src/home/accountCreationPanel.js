import React, { useState } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { registerUser } from '../assets/firebase';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DOMPurify from 'dompurify';
import style from '../style/kitUI.module.css';
import './accountCreationPanel.css';

const schema = yup.object({
    pseudoPlayer: yup.string()
        .required('N\'oubliez pas votre pseudo !')
        .max(20, 'Le pseudo ne doit pas dépasser 20 caractères'),
    birthdayPlayerPlayer: yup.date()
        .typeError('Veuillez entrer une date valide.')
        .max(new Date(), "La date de naissance ne saurait être dans le futur...")
        .required('Vous devez mentionner votre date de naissance.'),
    genderPlayer: yup.string()
        .required('N\'oubliez pas votre genre.'),
    emailPlayer: yup.string()
        .email('Veuillez entrer une adresse email valide.')
        .required('Vous devez mentionner votre adresse email.'),
    passwordPlayer: yup.string()
        .required('Vous devez entrer un mot de passe.')
        .min(8, 'Votre mot de passe doit comporter au moins 8 caractères.'),
        passwordPlayerVerification: yup.string()
        .oneOf([yup.ref('passwordPlayer'), null], 'Les mots de passe doivent correspondre.')
        .required('Vous devez confirmer votre mot de passe.')
        
}).required();

function AccountCreationPanel({ loadingAuthCreation, buttonSize }) {
    const { register, handleSubmit, formState: { errors, isSubmitted, isSubmitSuccessful } } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(schema)
    });

    async function isEmailUnique(email) {
        try {
            const response = await axios.get(`http://localhost:5038/api/players/checkEmail?email=${email}`);
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

            const sanitizedData = {
            pseudoPlayer: DOMPurify.sanitize(data.pseudoPlayer),
            birthdayPlayer: DOMPurify.sanitize(data.birthdayPlayer),
            genderPlayer: DOMPurify.sanitize(data.genderPlayer),
            emailPlayer: DOMPurify.sanitize(data.emailPlayer),
            };

            await axios.post('http://localhost:5038/api/players/createAccount', sanitizedData);
            setShowModal(true);
            console.log('Voici les données que tu as envoyé ou tenté d\'envoyer :', sanitizedData);

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
            <div id="scrollContainer">
                <form id="accountForm" onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type='text'
                        id='pseudoPlayer'
                        className={style.inputHarmonistere}
                        name='pseudoPlayer'
                        placeholder='Pseudo'
                        {...register("pseudoPlayer")} />
                    {errors.pseudoPlayer && <><span className='invalid-feedback'>{errors.pseudoPlayer.message}</span></>}

                    <input
                        type='date'
                        min='1900-01-01'
                        id='birthdayPlayer'
                        className={style.inputHarmonistere}
                        name='birthdayPlayer'
                        placeholder='Date de naissance'
                        {...register("birthdayPlayer")} />
                    {errors.birthdayPlayer && <><span className='invalid-feedback'>{errors.birthdayPlayer.message}</span></>}

                    <select
                        id="genderPlayer"
                        name="genderPlayer"
                        className={style.inputSelectHarmonistere}
                        {...register("genderPlayer")}
                        defaultValue="">
                        <option value="" disabled hidden>Genre</option>
                        <option value="female" className={style.optionHarmonistere}>Femme</option>
                        <option value="male" className={style.optionHarmonistere}>Homme</option>
                        <option value="other" className={style.optionHarmonistere}>Autre</option>
                    </select>
                    {errors.genderPlayer && <><span className='invalid-feedback'>{errors.genderPlayer.message}</span></>}

                    <input
                        type='email'
                        id='emailPlayer'
                        className={style.inputHarmonistere}
                        name='emailPlayer'
                        placeholder='E-mail'
                        {...register("emailPlayer")} />
                    {errors.emailPlayer && <><span className='invalid-feedback'>{errors.emailPlayer.message}</span></>}

                    <input
                        type='password'
                        id='passwordPlayer'
                        className={style.inputHarmonistere}
                        name='passwordPlayer'
                        placeholder='Mot de passe'
                        {...register("passwordPlayer")} />
                    {errors.passwordPlayer && <><span className='invalid-feedback'>{errors.passwordPlayer.message}</span></>}

                    <input
                        type='password'
                        id='passwordPlayerVerification'
                        className={style.inputHarmonistere}
                        name='passwordPlayerVerification'
                        placeholder='Confirmez le mot de passe'
                        {...register("passwordPlayerVerification")} />
                    {errors.passwordPlayerVerification && <><span className='invalid-feedback'>{errors.passwordPlayerVerification.message}</span></>}

                    <button className={style.buttonHarmonistere} style={{ padding: `1em ${buttonSize}` }} type='submit'>S'inscrire</button>

                    <div id='bottomAccountForm'>
                        <p>Déjà un compte ?&nbsp;</p><span onClick={loadingAuthCreation} id='connectUnderline'>Connectez-vous</span>
                    </div>
                </form>
            </div>

            <Popup open={showModal} onClose={closeModal} modal nested closeOnDocumentClick={false}>
                {(close) => (
                    <div className='modal'>
                        <div className='content'>
                            <h2>Merci !</h2>
                            <p>Votre compte a été créé avec succès.</p>
                            <Link to="/"><button onClick={close}>Retourner à l'accueil</button></Link>
                        </div>
                    </div>
                )}
            </Popup>
        </div>
    );
}

export default AccountCreationPanel;