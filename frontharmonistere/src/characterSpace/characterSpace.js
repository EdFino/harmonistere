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
import imageKit from '../style/modules/global/image.module.css';
import CSPanel from './CSPanel';
import CSMainPanel from './CSMainPanel';
import RelationPanel from './relationPanel';
import FacultiesPanel from './facultiesPanel';
import AlterationPanel from './alterationPanel';
import CaracPanel from './caracPanel';
import editeurIcon from '../images/editeur.png';
import privateIcon from '../images/private.png';
import manoeuverIcon from '../images/manoeuverIcon.png';
import diceIcon from '../images/diceIcon.png';
import Popup from 'reactjs-popup';
import modalKit from '../specialComponents/customModal';
import cspanelKit from '../style/modules/components/cspanel.module.css';
import ManoeuverModalPanel from './manoeuverModalPanel';



function CharacterSpace () {

    const [user] = useAuthState(auth);
    const [sheetData, setSheetData] = useState(null);
    const [showFirstDeleteModal, setShowFirstDeleteModal] = useState(false);
    const [showSecondDeleteModal, setShowSecondDeleteModal] = useState(false);
    const [sheetDeleted, setSheetDeleted] = useState(false);
    const [sheetPresented, setSheetPresented] = useState (false);
    const [changeSheet, setChangeSheet] = useState(false);
    const [diceLauncherReady, setDiceLauncherReady] = useState(false);
    const [isSelectingInjury, setIsSelectingInjury] = useState(false);

    const [characterOneName, setCharacterOneName] = useState ('');
    const [characterOneAge, setCharacterOneAge] = useState ('');
    const [isOneBender, setIsOneBender] = useState ('');
    const [characterOneBender, setCharacterOneBender] = useState ('');

    const [characterOnePrincipal, setCharacterOnePrincipal] = useState ({
        name: '',
        value: '2',
        description: 'Critique',
        color: '#FFA6A6'
    });
    const [characterOneAscendant, setCharacterOneAscendant] = useState ({
        name: '',
        value: '1',
        description: 'Bonus',
        color: '#96DE9B'
    });
    const [characterOneNeutral, setCharacterOneNeutral] = useState ({
        name: '',
        value: '0',
        description: 'Neutre',
        color: '#F5DCAB'
    });
    const [characterOneOpposite, setCharacterOneOpposite] = useState ({
        name: '',
        value: '-1',
        description: 'Malus',
        color: '#D5D5D5'
    });

    const [characterOneBody, setCharacterOneBody] = useState({
        name: '',
        value: '',
        description: '',
        color: ''
    });
    const [characterOneMind, setCharacterOneMind] = useState({
        name: '',
        value: '',
        description: '',
        color: ''
    });
    const [characterOneSoul, setCharacterOneSoul] = useState({
        name: '',
        value: '',
        description: '',
        color: ''
    });
    const [characterOneMartial, setCharacterOneMartial] = useState({
        name: '',
        value: '',
        description: '',
        color: ''
    });
    const [characterOneElement, setCharacterOneElement] = useState({
        name: '',
        value: '',
        description: '',
        color: ''
    });
    const [characterOneSpeaking, setCharacterOneSpeaking] = useState({
        name: '',
        value: '',
        description: '',
        color: ''
    });
    const [specialSkills, setSpecialSkills] = useState('');
    const [notes, setNotes] = useState('');
    const [physicalDescription, setPhysicalDescription] = useState('');
    const [personnalityDescription, setPersonnalityDescription] = useState('');
    const [storyCharacter, setStoryCharacter] = useState('');
    const [powerLevel, setPowerLevel] = useState();

    const [showModalManoeuver, setShowModalManoeuver] = useState(false);

    const [showModalDice, setShowModalDice] = useState(false);

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
                    setTemper(setCharacterOnePrincipal, data.principalTrait);
                    setTemper(setCharacterOneAscendant, data.ascendantTrait);
                    setTemper(setCharacterOneNeutral, data.neutralTrait);                       
                    setTemper(setCharacterOneOpposite, data.oppositeTrait);                       
                    setSpecialSkills(data.skills);
                    setNotes(data.notes);
                    setPhysicalDescription(data.physicDescription);
                    setPersonnalityDescription(data.mentalDescription);
                    setStoryCharacter(data.story);
                    setPowerLevel(data.powerLevel);
                    setCarac(setCharacterOneBody, data.bodyLevel, "Corps");
                    setCarac(setCharacterOneMind, data.mindLevel, "Esprit");
                    setCarac(setCharacterOneSoul, data.soulLevel, "Âme");
                    setCarac(setCharacterOneMartial, data.martialArtsLevel, "Martial");
                    setCarac(setCharacterOneElement, data.elementaryArtsLevel, "Elément");
                    setCarac(setCharacterOneSpeaking, data.speakingLevel, "Rhétorique");
                })
                .catch(error => {
                    console.log('Erreur lors de la récupération des données : ', error);
                });
        }
    }, [user]);

    function setCarac(setter, value, caracName) {
        if (value !== undefined) {
            const interpreted = interpretLevel(value);
            setter({
                name: caracName,
                value,
                description: interpreted.description,
                color: interpreted.color
            });
        }
    }

    function setTemper(setter, newValue) {
    if (newValue !== undefined) {
        setter(prev => ({
            ...prev,
            name: newValue
        }));
    }
}

    function interpretLevel(value) {
    switch (String(value)) {
        case "-1":
            return {
                description: "Malus",
                color: "#D5D5D5"
            };
        case "0":
            return {
                description: "Neutre",
                color: "#F5DCAB"
            };
        case "1":
            return {
                description: "Bonus",
                color: "#96DE9B"
            };
        case "2":
            return {
                description: "Critique",
                color: "#FFA6A6"
            };
        default:
            return {
                description: "Inconnu",
                color: "#E0E0E0"
            };
        }
    }


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

    console.log ("Le tempérament, ça va ?" + characterOnePrincipal.value)
    

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

        const falseDB = [{
            name: 'Arya',
            relationShip : 'Amitié'
        },
        {
            name: 'Finn',
            relationShip : 'Haine'
        },
        {
            name: 'Germain',
            relationShip : 'Indifférence'
        },        {
            name: 'Matth',
            relationShip : 'Amour'
        },        {
            name: 'Maria',
            relationShip : 'Amitié'
        },        {
            name: 'Seb',
            relationShip : 'Amitié'
        },        {
            name: 'Caliméro',
            relationShip : 'Indifférence'
        },        {
            name: 'Last but the Least',
            relationShip : 'Haine'
        },
    ]

    const areCaracsLoaded = () =>
  characterOneBody.description &&
  characterOneMind.description &&
  characterOneSoul.description &&
  characterOneMartial.description &&
  characterOneElement.description &&
  characterOneSpeaking.description;


    return (

        <div className='layoutPageCS'>
            {isSelectingInjury && <div className="overlay" />}
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
                        <img
                            src={privateIcon}
                            className={imageKit.iconProperties}
                            alt='Icône pour flouter des zones'
                            style={{marginRight: "0.6em"}}
                        />
                        <img
                            src={editeurIcon}
                            className={imageKit.iconProperties}
                            alt='Icône pour éditer sa fiche de personnage'
                        />
                </div>

            </div>

            <div id='characterSpaceMain'>

                <div id='CSPanelOne'>
                    {areCaracsLoaded() && (
                        <CSMainPanel
                            characterName={characterOneName}
                            characterAge={characterOneAge}
                            isOneBender={isOneBender}
                            benderSelect={characterOneBender}
                            powerLevel={powerLevel}
                            principalTrait={characterOnePrincipal}
                            ascendantTrait={characterOneAscendant}
                            neutralTrait={characterOneNeutral}
                            oppositeTrait={characterOneOpposite}
                        />
                    )}
                </div>
                <div id='CSPanelTwo'>
                    <CSPanel
                        titlePanel="Relations"
                        contentPanel={<RelationPanel
                        relation={falseDB}
                    />}
                        />
                </div>
                <div id='CSPanelThreeFour'>
                    <div className='CSPanelMini'>
                        <CSPanel
                            titlePanel="Facultés"
                            contentPanel={<FacultiesPanel/>}/>
                    </div>
                    <div className='CSPanelMini'>
                        <CSPanel
                            titlePanel="Altérations"
                            contentPanel={<AlterationPanel/>} />
                    </div>
                </div>
                {areCaracsLoaded() && (
                <div id='CSPanelFive'>
                    <CSPanel
                        titlePanel="Attributs"
                        contentPanel={<CaracPanel
                            bodyLevel={characterOneBody}
                            setBodyLevel={setCharacterOneBody}
                            mindLevel={characterOneMind}
                            setMindLevel={setCharacterOneMind}
                            soulLevel={characterOneSoul}
                            setSoulLevel={setCharacterOneSoul}
                            martialArtsLevel={characterOneMartial}
                            setMartialArtsLevel={setCharacterOneMartial}
                            elementaryArtsLevel={characterOneElement}
                            setElementaryArtsLevel={setCharacterOneElement}
                            speakingLevel={characterOneSpeaking}
                            setSpeakingLevel={setCharacterOneSpeaking}
                            onStartInjurySelection={() => setIsSelectingInjury(!isSelectingInjury)}
                        />}
                        activablePanel={isSelectingInjury}/>
                </div>
                )}
            </div>
            <div className='absoluteDices'>
                <img
                    src={manoeuverIcon}
                    className={`${imageKit.absoluteIcons} ${imageKit.manoeuverIcon} ${showModalManoeuver ? imageKit.iconClicked : ''}`}
                    alt='Icône de manoeuvre'
                    onClick={() => {setShowModalManoeuver(true)}}
                />
                <img
                    src={diceIcon}
                    className={`${imageKit.absoluteIcons} ${imageKit.diceIcon} ${showModalDice ? imageKit.iconClicked : ''}`}
                    alt='Icône de lancer de dés libres'
                    onClick={() => {setShowModalDice(true)}}
                />
            </div>
            {showModalManoeuver && (
                <Popup
                    open={showModalManoeuver}
                    onClose={() => {setShowModalManoeuver(false)}}
                    contentStyle={{padding: '0', maxWidth: '50vw', maxHeight: '90vw'}}
                    modal
                    nested
                >
                    {areCaracsLoaded() && (
                    <CSPanel
                        titlePanel="Manœuvre"
                        contentPanel={<ManoeuverModalPanel
                            bodyLevel={characterOneBody}
                            mindLevel={characterOneMind}
                            soulLevel={characterOneSoul}
                            martialArtsLevel={characterOneMartial}
                            elementaryArtsLevel={characterOneElement}
                            speakingLevel={characterOneSpeaking}
                            principalTrait={characterOnePrincipal}
                            ascendantTrait={characterOneAscendant}
                            neutralTrait={characterOneNeutral}
                            oppositeTrait={characterOneOpposite}
                        />}
                    />
                        )}
                </Popup>
            )}
            {showModalDice && (
                <Popup
                    open={showModalDice}
                    onClose={() => {setShowModalDice(false)}}
                    contentStyle={{padding: '0', maxWidth: '50vw'}}
                    modal
                    nested
                >
                    <CSPanel
                        titlePanel="Lanceur de dés"
                        contentPanel={<DiceLauncherMini/>} />
                </Popup>
            )}            
        </div>

        )}

export default CharacterSpace