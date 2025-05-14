import React, { useState, useEffect } from 'react';
import { auth } from '../assets/firebase';
import axios from 'axios';
import { useParams, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import Navbar from '../navbar/navbar';
import './characterSpace.css';
import CharacterSheet from './characterSheet';
import CharacterSheetVerso from './characterSheetVerso';
import DiceLauncherMini from '../diceLauncher/diceLauncherMini';
import CustomModal from '../specialComponents/customModal';
import { useNavigate } from 'react-router-dom';
import SubNavbarCharacter from './subNavbarCharacter';
import titleKit from '../style/modules/global/title.module.css';
import CSPanel from './CSPanel';
import CSMainPanel from './CSMainPanel';


function CharacterSpace () {

    const [user] = useAuthState(auth);
    const [sheetData, setSheetData] = useState(null);
    const [showFirstDeleteModal, setShowFirstDeleteModal] = useState(false);
    const [showSecondDeleteModal, setShowSecondDeleteModal] = useState(false);
    const [sheetDeleted, setSheetDeleted] = useState(false);
    const [sheetPresented, setSheetPresented] = useState (false);
    const [changeSheet, setChangeSheet] = useState(false);
    const [diceLauncherReady, setDiceLauncherReady] = useState(false);

    const [characterOneName, setCharacterOneName] = useState ('');
    const [characterOneAge, setCharacterOneAge] = useState ('');
    const [isOneBender, setIsOneBender] = useState ('');
    const [characterOneBender, setCharacterOneBender] = useState ('');
    const [characterOnePrincipal, setCharacterOnePrincipal] = useState ('');
    const [characterOneAscendant, setCharacterOneAscendant] = useState ('');
    const [characterOneNeutral, setCharacterOneNeutral] = useState ('');
    const [characterOneOpposite, setCharacterOneOpposite] = useState ('');
    const [characterOneBody, setCharacterOneBody] = useState ('');
    const [characterOneMind, setCharacterOneMind] = useState ('');
    const [characterOneSoul, setCharacterOneSoul] = useState ('');
    const [characterOneMartial, setCharacterOneMartial] = useState ('');
    const [characterOneElement, setCharacterOneElement] = useState ('');
    const [characterOneSpeaking, setCharacterOneSpeaking] = useState ('');
    const [specialSkills, setSpecialSkills] = useState('');
    const [notes, setNotes] = useState('');
    const [physicalDescription, setPhysicalDescription] = useState('');
    const [personnalityDescription, setPersonnalityDescription] = useState('');
    const [storyCharacter, setStoryCharacter] = useState('');


    const { id } = useParams();

    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:5038/api/sheets/getSheet/${id}`)
                .then(response => {
                    const data = response.data.sheetData;
                    console.log(data);
                    setSheetData(response.data);
    
                    setCharacterOneName(data.characterName);  
                    setCharacterOneAge(data.characterAge);                       
                    setIsOneBender(data.benderOrNot);                       
                    setCharacterOneBender(data.benderSelect);                       
                    setCharacterOnePrincipal(data.principalTrait);                       
                    setCharacterOneAscendant(data.ascendantTrait);                       
                    setCharacterOneNeutral(data.neutralTrait);                       
                    setCharacterOneOpposite(data.oppositeTrait);                       
                    setCharacterOneBody(data.bodyLevel);                       
                    setCharacterOneMind(data.mindLevel);                       
                    setCharacterOneSoul(data.soulLevel);                       
                    setCharacterOneMartial(data.martialArtsLevel);                       
                    setCharacterOneElement(data.elementaryArtsLevel);                       
                    setCharacterOneSpeaking(data.speakingLevel);
                    setSpecialSkills(data.skills);
                    setNotes(data.notes);
                    setPhysicalDescription(data.physicDescription);
                    setPersonnalityDescription(data.mentalDescription);
                    setStoryCharacter(data.story);
                })
                .catch(error => {
                    console.log('Erreur lors de la récupération des données : ', error);
                });
        }
    }, [user]);

    const handleDelete = () => {
        setShowFirstDeleteModal(false);
        setShowSecondDeleteModal(true);
        setTimeout(() => {
            axios.delete(`http://localhost:5038/api/sheets/deleteSheet/${id}`)
            .then(response => {
                console.log ('Fiche supprimée avec succès');
                setSheetDeleted(true)
            })
            .catch(error => {
                console.log ('La fiche n\'a pas pu être supprimée : ', error);
            });
        }, 5000);
    };
    

    console.log (sheetData);

    const editSheet = () => {
        setChangeSheet(!changeSheet);
    }

    const diceLauncherSet = () => {
        setDiceLauncherReady(!diceLauncherReady);
    }

    const navigate = useNavigate();

    const closeFirstDeleteModal = () => {
        setShowFirstDeleteModal(false);
    }

    const closeSecondDeleteModal = () => {
        setShowSecondDeleteModal(false);
        navigate('/espacejoueur');
    }

    return (
        <div className='layoutPageCS'>
            <Navbar
                light={false}
            />            
            <h1 className={`${titleKit.cornerLeftTitle} ${titleKit.cornerLeftBluetTitle}`}>Harmonistère</h1>

            <div id='characterSpaceHeader'>

                <div id='navbarCharacter'>
                    <SubNavbarCharacter
                        characterInfoPanel = {1}
                    />
                </div>

                <div id='iconCharacterSpace'>
                    <p className='oneIcon'>P</p>
                    <p className='oneIcon'>E</p>
                </div>

            </div>

            <div id='characterSpaceMain'>

                <div id='CSPanelOne'>
                    <CSMainPanel/>
                </div>
                <div id='CSPanelTwo'>
                    <CSPanel
                        titlePanel="Relations"
                        contentPanel="OLA WORLD"/>
                </div>
                <div id='CSPanelThreeFour'>
                    <CSPanel
                        titlePanel="Relations"
                        contentPanel="OLA WORLD"/>
                </div>
                <div id='CSPanelFive'>
                    <CSPanel
                        titlePanel="Relations"
                        contentPanel="OLA WORLD"/>
                </div>
            </div>
        </div>
    )
}

export default CharacterSpace

/*     return (
        <>
            <Navbar/>
            <h1>ESPACE EN COURS DE CONSTRUCTION</h1>
            <h2>{characterOneName}</h2>
            <div id='characterSpace'>
                <div id='columnCrud' className='columnSheet'>
                    <p>Ici il y aura les fonctions pour modifier ou supprimer sa fiche</p>
                    <button type='button' onClick={editSheet}>Editer votre fiche</button><br/>
                    <button type='button' onClick={() => setShowFirstDeleteModal(true)}>Supprimer la fiche</button>
                </div>
                <div id='characterSheetVisual'>
                {!sheetPresented ? (
                    <div id='sheetVisualRecto' className='sheetVisualElement'>
                        <CharacterSheet
                            characterName={characterOneName}
                            characterAge={characterOneAge}
                            benderOrNot={isOneBender}
                            benderSelect={characterOneBender}
                            principalTrait={characterOnePrincipal}
                            ascendantTrait={characterOneAscendant}
                            neutralTrait={characterOneNeutral}
                            oppositeTrait={characterOneOpposite}
                            bodyLevel={characterOneBody}
                            mindLevel={characterOneMind}
                            soulLevel={characterOneSoul}
                            martialArtsLevel={characterOneMartial}
                            elementaryArtsLevel={characterOneElement}
                            speakingLevel={characterOneSpeaking}
                            skills={specialSkills}
                            notes={notes}
                            physicDescription={physicalDescription}
                            mentalDescription={personnalityDescription}
                            story={storyCharacter}
                            changeSheet={changeSheet}
                            />
                            </div>)
                            : (
                            <div id='sheetVisualVerso' className='sheetVisualElement'>
                                <CharacterSheetVerso
                                    name={characterOneName}
                                    physicalDescription={physicalDescription}
                                    personnalityDescription={personnalityDescription}
                                    storyCharacter={storyCharacter}/>
                            </div>
                            )
                            }
                        <button type='button' onClick={() => {setSheetPresented(!sheetPresented)}}>Recto-Verso</button>

                </div>
                <div id='columnPlay' className='columnSheet'>
                    <h3>Lanceur de dés</h3>
                    <button type='button' onClick={diceLauncherSet}>Lanceur</button>
                    {diceLauncherReady ? (
                    <DiceLauncherMini/>) : null}
                </div>

                        <CustomModal
                            isOpen={showFirstDeleteModal}
                            onClose={closeFirstDeleteModal}
                            message= "Êtes-vous certain de vouloir supprimer votre fiche ?"
                            messageEnd="Annuler l'opération"
                            secondOnClose={handleDelete}
                            secondMessageEnd="Suppression de la fiche"
                        />

                        <CustomModal
                            isOpen={showSecondDeleteModal}
                            onClose={closeSecondDeleteModal}
                            message= "Votre fiche a été supprimée !"
                            messageEnd="Retour dans mon espace"
                        />

            {sheetDeleted && <Navigate to="/espacejoueur" />}
            </div>
        </>  
    ) */