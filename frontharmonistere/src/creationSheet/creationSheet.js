import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/navbar';
import './creationSheet.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { auth } from '../assets/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import DOMPurify from 'dompurify';
import FirstIdentitySheet from './firstIdentitySheet';
import SecondPersonnalitySheet from './secondPersonnalitySheet';
import ThirdCaracSheet from './thirdCaracSheet';
import FourthDescriptionSheet from './fourthDescriptionsSheet';
import FinalStepForm from './finalStepForm';
import creationSheetImage from '../images/Image 2.png';
import creationSheetBackground from '../images/Fond fiche perso.png';
import kit from '../style/kitUI.module.css';
import SubNavbarSheet from './subNavbarSheet';

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

    const buttonSize = '35px';

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

    return (
        <div id='creationSheetAll'>
            <img src={creationSheetImage} id='imageLeftSheet' alt='Illustration à gauche de la création de fiche' />
            <img src={creationSheetBackground} id='imageRightSheet' alt='Fond pour la création de la fiche'/>
            <Navbar
                light={false}/>
            <h1 className={kit.cornerLeftTitle}>Harmonistère</h1>

            <div id='creationSheet'>

            <h2 className={kit.blueHarmonistereSheetTitle}>Créer une fiche</h2>

            <SubNavbarSheet
                stepForm = {stepForm}/>

                <div id="chapters">
                    {stepForm === 1 &&
                    <FirstIdentitySheet
                        formData={formData}
                        handleFormData={handleFormData}
                        nextStep={nextStep}
                        buttonSize={buttonSize}
                    />}
                    {stepForm === 2 &&
                    <SecondPersonnalitySheet
                        formData={formData}
                        handleFormData={handleFormData}
                        nextStep={nextStep}
                        previousStep={previousStep}
                        buttonSize={buttonSize}
                    />}
                    {stepForm === 3 &&
                    <ThirdCaracSheet
                        formData={formData}
                        handleFormData={handleFormData}
                        nextStep={nextStep}
                        previousStep={previousStep}
                        buttonSize={buttonSize}
                    />}
                    {stepForm === 4 &&
                    <FourthDescriptionSheet
                        formData={formData}
                        handleFormData={handleFormData}
                        nextStep={nextStep}
                        previousStep={previousStep}
                        buttonSize={buttonSize}
                    />}
                    {stepForm === 5 &&
                    <FinalStepForm
                        formData={formData}
                        onFinalSubmit={onFinalSubmit}
                        previousStep={previousStep}
                        buttonSize={buttonSize}
                    />}
                </div>
            </div>

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
    </div>
  )
}

export default CreationSheet