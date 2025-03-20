import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { auth } from '../assets/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import './playerSpace.css';
import Popup from 'reactjs-popup';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup" ;
import DOMPurify from 'dompurify';

const schema = yup.object({
    sessionName: yup.string().required().max(30, "Attention : le nom de votre instance doit comporter moins de 30 caractères"),
})


function PlayerSpace () {

    const { register, handleSubmit, formState: { errors, isSubmitted, isSubmitSuccessful } } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(schema)
    });

    const [user, error] = useAuthState(auth);
    const [characterList, setCharacterList] = useState([]);
    const [sessionGMList, setSessionGMList] = useState([]);
    const [sessionPlayersList, setSessionPlayersList] = useState([]);
    const [modalSessionCreation, setModalSessioncreation] = useState(false);
    const [rejoinSessionName, setRejoinSessionName] = useState('');
    const [characterNewSession, setCharacterNewSession] = useState ('');
    const [formRejoinSession, setFormRejoinSession] = useState();

    localStorage.clear();


    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:5038/api/sheets/readSheet?email=${user.email}`)
                .then(response => {
                    setCharacterList(response.data);    
                    if (response.data.length > 0) {
                        const data = response.data[0];
                    }
                })
                .catch(error => {
                    console.log('Erreur lors de la récupération des données : ', error);
                });

                axios.get(`http://localhost:5038/api/sessions/get?email=${user.email}`)
                .then(response => {
                    const sessions = response.data;
                    console.log(sessions);
                    const gmSession = sessions.filter(session => session.gmSession === user.email);
                    console.log(gmSession);
                    const playersSession = sessions.filter(session => session.playersSession.includes(user.email));
                    setSessionGMList(gmSession);
                    setSessionPlayersList(playersSession);
                })
                .catch(error => {
                    console.log('Erreur lors de la récupération des sessions : ', error);
                });            
        }
    }, [user]);

    function modalOpenSession () {
        setModalSessioncreation(true);
    }

    function closeModalSession () {
        setModalSessioncreation(false);
    }

    function handleRejoinSessionName (e) {
        setRejoinSessionName(e.target.value);
    }

    function handleCharacternewSession (e) {
        setCharacterNewSession(e.target.value);
    }

    const onSubmit = async (data) => {
    
        try {

            data.sessionName = DOMPurify.sanitize(data.sessionName);

            const formDataSession = {
                ...data,
                gmSession: user.email,
                playersSession: []
            };
            console.log (formDataSession)

            await axios.post('http://localhost:5038/api/sessions/create', formDataSession);
            console.log('Données session envoyées avec succès');
            console.log(formDataSession);
        } catch (error) {
            console.error('Erreur lors de l\'envoi des données de session :', error);
        }
    };

    function handleRejoinSession() {
        try {
            const updatedFormRejoinSession = {
                sessionID: rejoinSessionName,
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
            <h1>Espace en cours de création</h1>
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
                                    <button>{character.sheetData.characterName}</button><br />
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
                        {sessionGMList.length === 0 ? (
                            <p>Vous n'avez pas de partie en tant que Maître du Jeu.</p>
                        ) : (
                        <div id='allSessionsGM'>
                            {sessionGMList.map((sessionLine, index) => (
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
                        {sessionPlayersList.length === 0 ? (
                            <p>Vous n'avez pas de partie en tant que joueur.</p>
                        ) : (
                        <div id='allSessionsPlayers'>
                            {sessionPlayersList.map((sessionPlayerLine, index) => (
                                <div key={index}>
                                    <Link to={`/session/${sessionPlayerLine._id}`}>
                                        <button>{sessionPlayerLine.sessionName}</button>
                                    </Link>
                                    <br/>
                                </div>
                                ))
                            }
                        </div>
                        )}
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
                            <form id='formCreationSession' onSubmit={handleSubmit(onSubmit)}>
                                <h3>Création d'une session</h3>
                                <p>(Vous serez considérés comme le MJ de la session mais vous pourrez transférer ce rôle à une autre personne)</p>
                                <label htmlFor='sessionName'>Nom de session : </label>
                                <input type='text' id='sessionName' name='sessionName' {...register("sessionName")}></input><br/>
                                {errors.sessionName && <><span className='invalid-feedback'>{errors.sessionName.message}</span><br/></>}

                                <button type='submit' >Créons votre session</button>
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
                                        <option key={index} value={character.characterName}>{character.characterName}</option>
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