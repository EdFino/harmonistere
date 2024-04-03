import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { auth } from '../assets/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import './playerSpace.css';
import Popup from 'reactjs-popup';

function PlayerSpace () {

    const [user, error] = useAuthState(auth);
    const [characterList, setCharacterList] = useState([]);
    const [modalSessionCreation, setModalSessioncreation] = useState(false);
    const [sessionName, setSessionName] = useState('');
    const [formDataSession, setFormDataSession] = useState({});

    useEffect(() => {
        // Logique pour récupérer les données de Sheets ici...
        if (user) {
            axios.get(`http://localhost:5038/backharmonistere/readSheetsData?email=${user.email}`)
                .then(response => {
                    setCharacterList(response.data);    
                    // Supposons que vous ayez récupéré les données dans une variable nommée sheetsData
                    if (response.data.length > 0) {
                        const data = response.data[0];
                    }
                })
                .catch(error => {
                    console.log('Erreur lors de la récupération des données : ', error);
                });
        }
    }, [user]);

    function modalOpenSession () {
        setModalSessioncreation(true);
    }

    function closeModalSession () {
        setModalSessioncreation(false);
    }

    function handleChangeSessionName (e) {
        setSessionName(e.target.value);
    }

    const handleSubmitSession = async (e) => {
        e.preventDefault();
    
        try {

            const updatedFormDataSession = {
                ...formDataSession,
                sessionName: sessionName,
                userEmail: user.email
            };
            console.log (formDataSession)

            await axios.post('http://localhost:5038/backharmonistere/sessionCreation', updatedFormDataSession);
            console.log('Données session envoyées avec succès');
            console.log(updatedFormDataSession);
        } catch (error) {
            console.error('Erreur lors de l\'envoi des données de session :', error);
        }
    };

    console.log ('chocolat noisette : ', formDataSession);


    return (
        <>
            <Navbar />
            <h1>Votre espace</h1>
            <div id='allSections'>
                <div id='characterSection'>
                    <h2>Vos personnages</h2>
                    {characterList.length === 0 ? (
                        <>
                            <p>Vous n'avez pas de fiche, souhaitez-vous en créer une ?</p>
                            <Link to='/creationfiche'><button>Excellente idée, allons-y !</button></Link>
                        </>
                    ) : (
                        <div id='allSheetsPlayer'>
                            {characterList.map((character, index) => (
                                <Link to={`/espacefiche/${character._id}`} key={index}>
                                    <button>{character.name}</button><br />
                                    {character.file}
                                </Link>
                            ))}
                                <Link to={`/creationfiche`}>
                                    <div className='oneMoreThing sheetsList'>
                                        <p>+ Nouvelle Fiche</p>
                                    </div>
                                </Link>
                        </div>
                    )}
                </div>

                <div id='sessionSection'>
                    <h2>Vos instances</h2>
                        <div className='sheetsList'>
                            <p onClick={modalOpenSession}>Nouvelle instance</p>
                        </div>
                </div>
            </div>

            <Popup open={modalSessionCreation} onClose={closeModalSession} modal nested>
                {(close) => (
                    <div className='modal'>
                        <div className='content'>
                            <form id='formCreationSession'>
                                <h3>Création d'une session</h3>
                                <p>(Vous serez considérés comme le MJ de la session mais vous pourrez transférer ce rôle à une autre personne)</p>
                                <label htmlFor='sessionName'>Nom de session : </label>
                                <input type='text' id='sessionName' value={sessionName} onChange={handleChangeSessionName} name='sessionName'></input><br/>
                                <button type='submit' onClick={handleSubmitSession}>Créons votre session</button>
                            </form>
                            <Link to="/espacejoueur"><button onClick={closeModalSession}>Retourner à l'accueil</button></Link>
                        </div>
                    </div>
                )}
            </Popup>
        </>
    );
}

export default PlayerSpace;