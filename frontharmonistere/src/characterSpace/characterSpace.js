import React, { useState, useEffect } from 'react';
import { auth } from '../assets/firebase';
import axios from 'axios';
import { useParams, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import Navbar from '../navbar/navbar';
import './characterSpace.css';
import CharacterSheet from './characterSheet';
import Popup from 'reactjs-popup';
import CharacterSheetVerso from '../characterSheetVerso';

function CharacterSpace () {

    const [user] = useAuthState(auth);
    const [sheetData, setSheetData] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(null);
    const [sheetDeleted, setSheetDeleted] = useState(false);

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

    const { id } = useParams();

    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:5038/backharmonistere/readSheetsData/${id}?email=${user.email}`)
                .then(response => {
                    setSheetData(response.data);
    
                    // Supposons que vous ayez récupéré les données dans une variable nommée sheetsData
                    if (response.data.length > 0) {
                        const data = response.data[0];
                        setCharacterOneName(data.name);  
                        setCharacterOneAge(data.age);                       
                        setIsOneBender(data.bender);                       
                        setCharacterOneBender(data.bending);                       
                        setCharacterOnePrincipal(data.principalTrait);                       
                        setCharacterOneAscendant(data.ascendantTrait);                       
                        setCharacterOneNeutral(data.neutralTrait);                       
                        setCharacterOneOpposite(data.oppositeTrait);                       
                        setCharacterOneBody(data.bodyLevel);                       
                        setCharacterOneMind(data.mindLevel);                       
                        setCharacterOneSoul(data.soulLevel);                       
                        setCharacterOneMartial(data.martialLevel);                       
                        setCharacterOneElement(data.elementaryLevel);                       
                        setCharacterOneSpeaking(data.speakingLevel);
                        setSpecialSkills(data.skills);
                    }
                })
                .catch(error => {
                    console.log('Erreur lors de la récupération des données : ', error);
                });
        }
    }, [user]);

    const handleDelete = () => {
        axios.delete(`http://localhost:5038/backharmonistere/deleteSheet/${id}`)
        .then(response => {
            console.log ('Fiche supprimée avec succès');
            setSheetDeleted(true)
        })
        .catch(error => {
            console.log ('La fiche n\'a pas pu être supprimée : ', error);
        });
    }
    

    console.log (sheetData);

    const closeModal = () => {
        setShowDeleteModal(false);
    };
    
    return (
        <>
            <Navbar/>
            <h1>Espace de votre vanille</h1>
            <h2>{characterOneName}</h2>
            <div id='characterSpace'>
                <div id='columnCrud' className='columnSheet'>
                    <p>Ici il y aura les fonctions pour modifier ou supprimer sa fiche</p>
                    <button type='button' onClick={() => setShowDeleteModal(true)}>Supprimer la fiche</button>
                </div>
                <div id='characterSheetVisual'>
                    <div id='sheetVisualRecto' className='sheetVisualElement'>
                        <CharacterSheet
                            name={characterOneName}
                            age={characterOneAge}
                            isBender={isOneBender}
                            bending={characterOneBender}
                            principalTrait={characterOnePrincipal}
                            ascendantTrait={characterOneAscendant}
                            neutralTrait={characterOneNeutral}
                            oppositeTrait={characterOneOpposite}
                            bodyLevel={characterOneBody}
                            mindLevel={characterOneMind}
                            soulLevel={characterOneSoul}
                            martialLevel={characterOneMartial}
                            elementLevel={characterOneElement}
                            speakingLevel={characterOneSpeaking}
                            specialSkills={specialSkills}
                            />
                    </div>
                    <div id='sheetVisualVerso' className='sheetVisualElement'>
                        <CharacterSheetVerso/>
                    </div>
                </div>
                <div id='columnPlay' className='columnSheet'>
                    <p>Ici, nous aurons la seconde colonne avec les fonctions de la fiche</p>
                </div>

                <Popup open={showDeleteModal} onClose={closeModal} modal nested>
                {(close) => (
                    <div className='modal'>
                        <div className='content'>
                            <p>Êtes-vous certain de vouloir supprimer votre fiche ?</p>
                            <p>Cette option sera définitive</p>
                            <button type='button' onClick={handleDelete}>Suppression de la fiche</button>
                            <button type='button' onClick={closeModal}>Annuler l'opération</button>
                        </div>
                    </div>
                )}
            </Popup>

            {sheetDeleted && <Navigate to="/espacejoueur" />}
            </div>
        </>  
    )
}

export default CharacterSpace