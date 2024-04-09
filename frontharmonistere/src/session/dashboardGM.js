import React, { useState } from 'react';
import './dashBoard.css';
import { auth } from '../assets/firebase';
import axios from 'axios';
import { useParams, Navigate } from 'react-router-dom';
import Popup from 'reactjs-popup';

function DashboardGM () {

    const [viewDashboard, setViewDashboard] = useState(false);
    const [sessionDeleted, setSessionDeleted] = useState(false);
    const [showDeleteSessionModal, setShowDeleteSessionModal] = useState(false);
    const [showAddPlayersModal, setshowAddPlayersModal] = useState(false);

    const { id } =useParams();

    const urlSession = `http://localhost:5038/backharmonistere/deleteSession/${id}`;
    console.log (urlSession);

    const closeDeleteSessionModal = () => {
        setShowDeleteSessionModal(false);
    };

    const closeAddPlayersModal = () => {
        setshowAddPlayersModal(false);

    }

    const handleDeleteSession = () => {
        axios.delete(`http://localhost:5038/backharmonistere/deleteSession/${id}`)
        .then(response => {
            console.log ('Session supprimée avec succès');
            setSessionDeleted(true);
        })
        .catch(error => {
            console.log ('La session n\'a pas pu être supprimée : ', error);
        });
    }

    console.log(viewDashboard);


    return (
    <>
    <button type='button' onClick={() => {setViewDashboard(!viewDashboard)}}>Administration</button>
        {viewDashboard ? (
            <ul id='adminList'>
                <li className='good information' onClick={() =>{setshowAddPlayersModal(!showAddPlayersModal)}}>Rajouter des membres dans le groupe</li>
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
                            <p>Si vous souhaitez inviter vos amis, donnez-leur ce lien :<br/> {urlSession} </p>
                            <button type='button' onClick={closeAddPlayersModal}>Annuler l'opération</button>
                        </div>
                    </div>
                )}
            </Popup>

            {sessionDeleted && <Navigate to="/espacejoueur" />}
    </>)
}

export default DashboardGM;