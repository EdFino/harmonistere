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
    const [sessionList, setSessionList] = useState([]);
    const [sessionPlayerList, setSessionPlayerList] = useState([]);
    const [modalSessionCreation, setModalSessioncreation] = useState(false);
    const [sessionName, setSessionName] = useState('');
    const [rejoinSessionName, setRejoinSessionName] = useState('');
    const [characterNewSession, setCharacterNewSession] = useState ('');
    const [formDataSession, setFormDataSession] = useState({});
    const [formRejoinSession, setFormRejoinSession] = useState();

    useEffect(() => {
        // Logique pour récupérer les données de Sheets ici...
        if (user) {
            axios.get(`http://localhost:5038/backharmonistere/readSheetsData?email=${user.email}`)
                .then(response => {
                    setCharacterList(response.data);    
                    if (response.data.length > 0) {
                        const data = response.data[0];
                    }
                })
                .catch(error => {
                    console.log('Erreur lors de la récupération des données : ', error);
                });

                axios.get(`http://localhost:5038/backharmonistere/readSessionsData?email=${user.email}`)
                .then(response => {
                    if (Array.isArray(response.data) && response.data.length > 0) {
                        setSessionList(response.data);
                    } else {
                        console.log('Aucune session trouvée.');
                    }
                })
                .catch(error => {
                    console.log('Erreur lors de la récupération des sessions : ', error);
                });

                axios.get(`http://localhost:5038/backharmonistere/userSessions?email=${user.email}`)
                .then(response => {
                    setSessionPlayerList(response.data);
                    console.log('Sessions de l\'utilisateur joli :', response.data);
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des sessions de l\'utilisateur :', error);
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

    function handleRejoinSessionName (e) {
        setRejoinSessionName(e.target.value);
    }

    function handleCharacternewSession (e) {
        setCharacterNewSession(e.target.value);
    }

    const handleSubmitSession = async (e) => {
        e.preventDefault();
    
        try {

            const updatedFormDataSession = {
                ...formDataSession,
                sessionName: sessionName,
                GM: user.email,
                players: []
            };
            console.log (formDataSession)

            await axios.post('http://localhost:5038/backharmonistere/sessionCreation', updatedFormDataSession);
            console.log('Données session envoyées avec succès');
            console.log(updatedFormDataSession);
        } catch (error) {
            console.error('Erreur lors de l\'envoi des données de session :', error);
        }
    };

    function handleRejoinSession() {
        try {
            const updatedFormRejoinSession = {
                sessionID: rejoinSessionName, // Utilisez la variable qui contient l'ID de la session à rejoindre
                playerCharacter: characterNewSession,
                playerEmail: user.email
            };
            console.log(updatedFormRejoinSession);
    
            axios.post('http://localhost:5038/backharmonistere/rejoinSession', updatedFormRejoinSession)
                .then(response => {
                    console.log('Vous avez rejoint la session avec succès !');
                    // Mettre à jour l'état ou effectuer d'autres actions si nécessaire
                })
                .catch(error => {
                    console.error('Erreur lors de la tentative de rejoindre la session :', error);
                });
        } catch (error) {
            console.error('Erreur lors du traitement de la demande de rejoindre la session :', error);
        }
    }    

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
                    <div id='allSessions'>
                        <h4>Vos parties en tant que MJ</h4>
                        {sessionList.length === 0 ? (
                            <p>Vous n'avez pas de partie en tant que Maître du Jeu.</p>
                        ) : (
                        <div id='allSessionsGM'>
                            {sessionList.map((sessionLine, index) => (
                                <div key={index}>
                                    <Link to={`/session/${sessionLine._id}`}>
                                        <button>{sessionLine.sessionName}</button>
                                    </Link>
                                    <br/>
                                </div>
                                ))
                        }
                        </div>
                        )}
                        <h4>Vos parties en tant que joueurs</h4>
                        <div id='allSessionsPlayers'>
                            {sessionPlayerList.map((sessionPlayerLine, index) => (
                                <div key={index}>
                                    <Link to={`/session/${sessionPlayerLine._id}`}>
                                        <button>{sessionPlayerLine.sessionName}</button>
                                    </Link>
                                    <br/>
                                </div>
                                ))
                        }
                        </div>
                        <div className='sheetsList'>
                            <p onClick={modalOpenSession}>Nouvelle instance</p>
                        </div>
                    </div>
                </div>

            </div>

            <Popup open={modalSessionCreation} onClose={closeModalSession} modal nested>
                {(close) => (
                    <div className='modal'>
                        Vous souhaitez créer une session ou en rejoindre une ?
                        <div id='modalNewSession' className='content'>
                            <form id='formCreationSession'>
                                <h3>Création d'une session</h3>
                                <p>(Vous serez considérés comme le MJ de la session mais vous pourrez transférer ce rôle à une autre personne)</p>
                                <label htmlFor='sessionName'>Nom de session : </label>
                                <input type='text' id='sessionName' value={sessionName} onChange={handleChangeSessionName} name='sessionName'></input><br/>
                                <button type='submit' onClick={handleSubmitSession}>Créons votre session</button>
                            </form>
                            <div id='OU'>
                                <p>OU</p>
                            </div>
                            <div id='rejoinSession'>
                                <h3>Rejoindre une session</h3>
                                <p>(Vous rejoindrez cette session en tant que joueur)</p>
                                <label htmlFor='rejoinSessionName'>Nom de la session à rejoindre : </label>
                                <input type='text' id='rejoinSessionName' value={rejoinSessionName} onChange={handleRejoinSessionName} name='rejoinSessionName'></input><br/>
                                <label htmlFor='characterNewSession'>Nom du personnage qui participera à cette aventure : </label>
                                <select id='characterNewSession' value={characterNewSession} onChange={handleCharacternewSession} name='characterNewSession'>
                                    {characterList.map((character, index) => (
                                        <option key={index} value={character.name}>{character.name}</option>
                            ))}
                                </select>
                                <button type='button' onClick={handleRejoinSession}>Rejoindre votre session</button>
                            </div>
                        </div>
                        <Link to="/espacejoueur"><button onClick={closeModalSession}>Retourner à l'accueil</button></Link>
                    </div>
                )}
            </Popup>
        </>
    );
}

export default PlayerSpace;