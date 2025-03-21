import React, { useState, useEffect } from 'react';
import './dashBoard.css';
import { auth } from '../assets/firebase';
import axios from 'axios';
import { useParams, Navigate } from 'react-router-dom';
import Popup from 'reactjs-popup';

function DashboardGM ({charactersInSession}) {

    const [viewDashboard, setViewDashboard] = useState(false);
    const [sessionDeleted, setSessionDeleted] = useState(false);
    const [showDeleteSessionModal, setShowDeleteSessionModal] = useState(false);
    const [showAddPlayersModal, setshowAddPlayersModal] = useState(false);
    const [showDeletePlayerModal, setShowDeletePlayerModal] = useState(false);
    const [characterDeletion, setCharacterDeletion] = useState('');

    const { id } =useParams();

    useEffect(() => {
        if (charactersInSession.length > 0) {
            setCharacterDeletion(charactersInSession[0]); // Définir la valeur par défaut
        }
    }, [charactersInSession]);

    const urlSession = `http://localhost:5038/api/sessions/delete/${id}`;
    const urlSessionRejoin = `http://localhost:5038/backharmonistere/rejoinSession`;

    const closeDeleteSessionModal = () => {
        setShowDeleteSessionModal(false);
    };

    const closeAddPlayersModal = () => {
        setshowAddPlayersModal(false);
    }

    const closeDeletePlayerModal = () => {
        setShowDeletePlayerModal(false);
    }

    function handleDeletionCharacter (e) {
        setCharacterDeletion(e.target.value);
    }

    const handleDeleteSession = () => {
        axios.delete(`http://localhost:5038/api/sessions/delete/${id}`)
        .then(response => {
            console.log ('Session supprimée avec succès');
            setSessionDeleted(true);
        })
        .catch(error => {
            console.log ('La session n\'a pas pu être supprimée : ', error);
        });
    }

    const handleDeleteCharacter = () => {
        axios.delete(`http://localhost:5038/api/sessions/deleteCharacter/${id}`, {
            data: { characterName: characterDeletion }
        })
        .then(response => {
            console.log('Personnage supprimé avec succès');
        })
        .catch(error => {
            console.log('Erreur lors de la suppression du personnage : ', error);
        });
    }


    return (
    <>
    <button type='button' onClick={() => {setViewDashboard(!viewDashboard)}}>Administration</button>
        {viewDashboard ? (
            <ul id='adminList'>
                <li className='good information' onClick={() =>{setshowAddPlayersModal(!showAddPlayersModal)}}>Rajouter des membres dans le groupe</li>
                <li className='good information' onClick={() =>{setShowDeletePlayerModal(!showDeletePlayerModal)}}>Retirer un personnage de la partie</li>
                <li className='important information' onClick={() =>{setShowDeleteSessionModal(!showDeleteSessionModal)}}>Supprimer la session</li>
            </ul> ) :
            null}

    <Popup open={showDeleteSessionModal} onClose={closeDeleteSessionModal} modal nested>
                {(close) => (
                    <div className='modal'>
                        <div className='content'>
                            <p>Êtes-vous certain de vouloir supprimer votre session ? Cette opération est irréversible...</p>
                            <button type='button' onClick={handleDeleteSession}>Suppression de la session</button>
                            <button type='button' onClick={closeDeleteSessionModal}>Annuler l'opération</button>
                        </div>
                    </div>
                )}
    </Popup>
    
            <Popup open={showAddPlayersModal} onClose={closeAddPlayersModal} modal nested>
                {(close) => (
                    <div className='modal'>
                        <div className='content'>
                            <p>Si vous souhaitez inviter vos amis, donnez-leur ce lien :<br/> {id} </p>
                            <button type='button' onClick={closeAddPlayersModal}>Annuler l'opération</button>
                        </div>
                    </div>
                )}
            </Popup>

            <Popup open={showDeletePlayerModal} onClose={closeDeletePlayerModal} modal nested>
                {(close) => (
                    <div className='modal'>
                        <div className='content'>
                            <label htmlFor='playerDelete'>Choisissez un personnage à supprimer</label>
                            <select id='playerDelete' name='playerDelete' value={characterDeletion} onChange={handleDeletionCharacter}>
                                {!charactersInSession ? (<option value=''>Loading...</option>) : (
                                    charactersInSession.map ((character, index) => (
                                    <option key={index} value={character}>{character}</option>
                                    )))}
                            </select>
                            <button type='button' onClick={handleDeleteCharacter}>Suppression de la session</button>
                            <button type='button' onClick={closeDeletePlayerModal}>Annuler l'opération</button>
                        </div>
                    </div>
                )}
    </Popup>

            {sessionDeleted && <Navigate to="/espacejoueur" />}
    </>)
}

export default DashboardGM;