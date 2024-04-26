import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/navbar';
import './creationSheet.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import SelectTest from './selectTest';
import SelectCharacteristic from './selectCharacteristic';
import FourthChapterSheet from './fourthChapterSheet';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { auth } from '../assets/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup" ;
import DOMPurify from 'dompurify';
import FirstIdentitySheet from './firstIdentitySheet';
import SecondPersonnalitySheet from './secondPersonnalitySheet';
import ThirdCaracSheet from './thirdCaracSheet';
import FourthDescriptionSheet from './fourthDescriptionsSheet';
import FinalStepForm from './finalStepForm';

/*const schema = yup.object().shape({
     characterAvatar: yup
        .mixed()
        .test('fileType', 'Le fichier doit être une image', (value) => {
            if (!value) return true; // Laisser passer s'il n'y a pas de fichier
            return value && value[0].type.startsWith('image/');
    }), 
    characterName: yup
        .string()
        .required('Attention : vous personnage doit avoir un nom !')
        .max(30, 'Attention : le prénom ne doit pas comporter plus de 30 caractères'),

    characterAge: yup.number('Attention, veuillez ne mettre que des chiffres')
    .positive('Attention : L\'âge doit être positif, bien évidemment...')
    .integer('Attention, veuillez ne pas mettre de virgule')
    .required('Attention : Vous devez mentionner un âge.'),

    benderOrNot: yup.boolean().required(),

    benderSelect: yup.string().when('benderOrNot', {
        is: (value) => value === true,
        then: (schema) => schema.required('Attention : Vous devez sélectionner un élément à maîtriser.'),
    }),

    principalTrait: yup.string().required ("Attention : vous devez choisir un trait principal à votre personnage"),
    ascendantTrait: yup.string().required ("Attention : vous devez choisir un trait ascendant à votre personnage"),
    neutralTrait: yup.string().required ("Attention : vous devez choisir un trait neutre à votre personnage"),
    oppositeTrait: yup.string().required ("Attention : vous devez choisir un trait opposé à votre personnage"),
    bodyLevel: yup.string().required ("Attention : vous devez choisir un niveau pour le corps de votre personnage"),
    mindLevel: yup.string().required ("Attention : vous devez choisir un niveau pour l'esprit de votre personnage"),
    soulLevel: yup.string().required ("Attention : vous devez choisir un niveau pour l'âme de votre personnage"),
    martialArtsLevel: yup.string().required ("Attention : vous devez choisir un niveau pour les arts martiaux de votre personnage"),
    elementaryArtsLevel: yup.string().required ("Attention : vous devez choisir un niveau pour les arts élémentaires de votre personnage"),
    speakingLevel: yup.string().required ("Attention : vous devez choisir un niveau pour l\'éloquence de votre personnage"),
    skills: yup.string(),
    notes: yup.string(),
    physicDescription: yup.string(),
    mentalDescription: yup.string(),
    story: yup.string(),
    sum: yup.number().test(
    'sum',
    'La somme des valeurs doit être inférieure ou égale à 0',
    function (value) {
    const parent = this.parent || {};
    const playerChoices = [
        parseInt(parent.bodyLevel),
        parseInt(parent.mindLevel),
        parseInt(parent.soulLevel),
        parseInt(parent.martialArtsLevel),
        parseInt(parent.elementaryArtsLevel),
        parseInt(parent.speakingLevel)
    ].reduce((acc, curr) => acc + curr, 0);
    return playerChoices <= 0;
})
});*/

function CreationSheet () {

    const [user] = useAuthState(auth);
    const [showModalSheet, setShowModalSheet] = useState(false);
    const [formData, setFormData] = useState({});
    const [stepForm, setStepForm] = useState (1);

    const handleFormData = (data) => {
        setFormData({ ...formData, ...data });
    };

    const nextStep = () => {
        setStepForm(stepForm +1);
    }

    const previousStep = () => {
        setStepForm(stepForm -1);
    }

  const onFinalSubmit = async (formData) => {

    try {
        const totalFormData = {... formData, email: user.email};

        formData.characterName = DOMPurify.sanitize(formData.characterName);
        formData.skills = DOMPurify.sanitize(formData.skills);
        formData.physicDescription = DOMPurify.sanitize(formData.physicDescription);
        formData.mentalDescription = DOMPurify.sanitize(formData.mentalDescription);
        formData.story = DOMPurify.sanitize(formData.characterName);

        await axios.post('http://localhost:5038/backharmonistere/sheetCreation', totalFormData);
        console.log('Données envoyées avec succès');
        console.log(totalFormData);
        setShowModalSheet(true);
    } catch (error) {
        console.error('Erreur lors de l\'envoi des données :', error);
    }
};

const closeModalSheet = () => {
    setShowModalSheet(false);
};

console.log('Voici le formulaire', formData);

console.log ('nous en sommes à létape : ', stepForm);

    return (
        <>
            <Navbar/>
            {user && <p>Vous êtes bien connecté, {user.email}</p>}
            {!user && <p>Vous n'êtes pas connecté</p>}
            <h1>Harmonistère</h1>
            <h2>Créer une fiche</h2>

                <div id="chapters">
                    {stepForm === 1 &&
                    <FirstIdentitySheet
                        formData={formData}
                        handleFormData={handleFormData}
                        nextStep={nextStep}
                    />}
                    {stepForm === 2 &&
                    <SecondPersonnalitySheet
                        formData={formData}
                        handleFormData={handleFormData}
                        nextStep={nextStep}
                        previousStep={previousStep}
                    />}
                    {stepForm === 3 &&
                    <ThirdCaracSheet
                        formData={formData}
                        handleFormData={handleFormData}
                        nextStep={nextStep}
                        previousStep={previousStep}
                    />}
                    {stepForm === 4 &&
                    <FourthDescriptionSheet
                        formData={formData}
                        handleFormData={handleFormData}
                        nextStep={nextStep}
                        previousStep={previousStep}
                    />}
                    {stepForm === 5 &&
                    <FinalStepForm
                        formData={formData}
                        onFinalSubmit={onFinalSubmit}
                        previousStep={previousStep}
                    />}
                </div>

      {/* <div id="secondChapter" className="chapter">
        <div id='secondChapterForm'>
        <SelectTest
                        formData={formData}
            handleFormData={handleFormData}
                        nextStep={nextStep}
            setValue={setValue}/>

        </div> */}


{/*         <div id="thirdChapter" className="chapter">
          <div id='thirdChapterForm'>
            <h2>3/ Caractéristiques</h2>
            <SelectCharacteristic
                register={register}
                errors={errors}
                watch={watch}/>
                
          </div>
        
        <div id="fourthChapter" className="chapter">
          <div id='fourthChapterForm'>
            <h2>Votre personnage plus en détails</h2>
            <div className="sideTextForm">
              <p>Vous n'êtes pas obligés de remplir ces champs pour la validation de la fiche.
                Mais si vous trouvez l'inspiration plus tard et que vous possédez un compte, vous pourrez toujours les modifier dans votre espace jeu.
              </p>
            </div> 
            <FourthChapterSheet
                register={register}
                errors={errors}
                watch={watch}/>
           </div>
        </div> */}
    <Popup open={showModalSheet} onClose={closeModalSheet} modal nested closeOnDocumentClick={false}>
                {(close) => (
                    <div className='modal'>
                        <div className='content'>
                            <h2>Merci !</h2>
                            <p>Votre fiche a été créée avec succès.</p>
                            <Link to="/espacejoueur"><button onClick={close}>Retourner à l'accueil</button></Link>
                        </div>
                    </div>
                )}
            </Popup>
    </>
  )
}

export default CreationSheet