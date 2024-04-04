import React, { useState } from 'react';
import './dashBoard.css';
import { auth } from '../assets/firebase';
import axios from 'axios';
import { useParams, Navigate } from 'react-router-dom';
import Popup from 'reactjs-popup';

function DashboardMJ () {

    const [viewDashboard, setViewDashboard] = useState(false);
    const [sessionDeleted, setSessionDeleted] = useState(false);
    const [showDeleteSessionModal, setShowDeleteSessionModal] = useState(false);

    const { id } =useParams();

    const closeDeleteSessionModal = () => {
        setShowDeleteSessionModal(false);
    };

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
                <li>Rajouter des membres dans le groupe</li>
                <li className='importantInformation' onClick={() =>{setShowDeleteSessionModal(!showDeleteSessionModal)}}>Supprimer la session</li>
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

            {sessionDeleted && <Navigate to="/espacejoueur" />}
    </>)
}

export default DashboardMJ;