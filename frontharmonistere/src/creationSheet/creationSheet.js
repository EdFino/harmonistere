import React, { useState } from 'react';
import Navbar from '../navbar/navbar';
import './creationSheet.css';
/* import 'reactjs-popup/dist/index.css';
 */import axios from 'axios';
import { auth } from '../assets/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import DOMPurify from 'dompurify';
import FirstIdentitySheet from './firstIdentitySheet';
import SecondPersonnalitySheet from './secondPersonnalitySheet';
import ThirdCaracSheet from './thirdCaracSheet';
import FourthDescriptionSheet from './fourthDescriptionsSheet';
import HelpSection from './helpSection';
import FinalStepForm from './finalStepForm';
import creationSheetImage from '../images/Image 2.png';
import creationSheetBackground from '../images/Fond fiche perso.png';
import kit from '../style/kitUI.module.css';
import SubNavbarSheet from './subNavbarSheet';
import CustomModal from '../specialComponents/customModal';
import { useNavigate } from 'react-router-dom';

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
        const totalFormData = {
            email: user.email,
            sheetData: {
                characterName: DOMPurify.sanitize(formData.characterName),
                characterAge: DOMPurify.sanitize(formData.characterAge),
                benderOrNot: formData.benderOrNot,
                benderSelect: DOMPurify.sanitize(formData.benderSelect),
                principalTrait: DOMPurify.sanitize(formData.principalTrait),
                ascendantTrait: DOMPurify.sanitize(formData.ascendantTrait),
                neutralTrait: DOMPurify.sanitize(formData.neutralTrait),
                oppositeTrait: DOMPurify.sanitize(formData.oppositeTrait),
                bodyLevel: formData.bodyLevel,
                mindLevel: formData.mindLevel,
                soulLevel: formData.soulLevel,
                martialArtsLevel: formData.martialArtsLevel,
                elementaryArtsLevel: formData.elementaryArtsLevel,
                speakingLevel: formData.speakingLevel,
                skills: formData.skills,
                notes: DOMPurify.sanitize(formData.notes),
                physicDescription: DOMPurify.sanitize(formData.physicDescription),
                mentalDescription: DOMPurify.sanitize(formData.mentalDescription),
                story: DOMPurify.sanitize(formData.characterName)
            }
        };


        await axios.post('http://localhost:5038/api/sheets/createSheet', totalFormData);
        console.log('Données envoyées avec succès');
        console.log(totalFormData);
        setShowModalSheet(true);
    } catch (error) {
        console.error('Erreur lors de l\'envoi des données :', error);
    }
};

const navigate = useNavigate();

const closeModalSheet = () => {
    setShowModalSheet(false);
    navigate('/espacejoueur');
};

    return (
        <div id='creationSheetAll'>
            <div id='creationSheetBothImages'>
                <img src={creationSheetImage} id='imageLeftSheet' alt='Illustration à gauche de la création de fiche' />
                <img src={creationSheetBackground} id='imageRightSheet' alt='Fond pour la création de la fiche'/>
            </div>
            <Navbar
                light={false}
                />

            
            <h1 id="harmonistereCornerSheet" className={kit.cornerLeftTitle}>Harmonistère</h1>

            <div id='creationSheet'>

            <h2 className={kit.blueHarmonistereSheetTitle}>Créer une fiche</h2>

            <SubNavbarSheet
                stepForm = {stepForm}/>

                <div className = "allChapters">

                <div id="chapters">
                    {stepForm === 1 &&
                    <FirstIdentitySheet
                        formData={formData}
                        handleFormData={handleFormData}
                        nextStep={nextStep}
                        buttonSize={buttonSize}
                        stepForm = {stepForm}
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
                <HelpSection
                    stepForm = {stepForm}/>
                </div>



            </div>

            <CustomModal
                isOpen={showModalSheet}
                onClose={closeModalSheet}
                message= "Fiche créée avec succès !"
                messageEnd="Retour sur votre profil"
            />

    </div>
  )
}

export default CreationSheet