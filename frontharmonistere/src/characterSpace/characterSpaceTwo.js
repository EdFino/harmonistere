import React, { useState, useEffect } from 'react';
import { auth } from '../assets/firebase';
import axios from 'axios';
import { useParams, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import Navbar from '../navbar/navbar';
import './characterSpace.css';
import DiceLauncherMini from '../diceLauncher/diceLauncherMini';
import { useNavigate } from 'react-router-dom';
import SubNavbarCharacter from './subNavbarCharacter';
import titleKit from '../style/modules/global/title.module.css';
import imageKit from '../style/modules/global/image.module.css';
import CaracPanel from './caracPanel';
import ComposantTestOne from './composantTestOne';
import ComposantTestTwo from './composantTestTwo';
import ComposantTestThree from './composantTestThree';
import { CharacterProvider } from '../hooks/CharacterContext';
import SheetSpace from './sheetSpace';
import UpdatingOverlay from './updatingOverlay';
import IconTools from './iconTools';

function CharacterSpaceTwo () {

    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const { id } = useParams();
    const [sheetData, setSheetData] = useState(null);
    const [showFirstDeleteModal, setShowFirstDeleteModal] = useState(false);
    const [showSecondDeleteModal, setShowSecondDeleteModal] = useState(false);
    const [sheetDeleted, setSheetDeleted] = useState(false);
    const [sheetPresented, setSheetPresented] = useState (false);
    const [changeSheet, setChangeSheet] = useState(false);
    const [diceLauncherReady, setDiceLauncherReady] = useState(false);
    const [characterPresentation, setCharacterPresentation] = useState(1);

    const [showModalManoeuver, setShowModalManoeuver] = useState(false);

    const [showModalDice, setShowModalDice] = useState(false);

    useEffect(() => {
        if (!user) return;
        axios
            .get(`http://localhost:5038/api/sheets/getSheet/${id}`)
            .then((response) => {
                setSheetData(response.data.sheetData);
            })
            .catch((error) => {
                console.error("Erreur lors du chargement de la fiche :", error);
            });
    }, [user]);

    function subnavbarPresentation (numberToShow) {
        setCharacterPresentation (numberToShow);
    }

    console.log(characterPresentation);

/*     axios.put(`http://localhost:5038/api/sheets/updateSheet/${id}`, { sheetData: updatedSheet })
        .then(() => {
            console.log("Sauvegarde automatique effectuée.");
        })
        .catch(error => {
            console.error("Erreur lors de la sauvegarde automatique :", error);
        });
};

useEffect(() => {
    const interval = setInterval(() => {
        autoSaveSheet();
    }, 50000);

    return () => clearInterval(interval); // nettoyage à la destruction du composant
}, [
    characterOneName,
    characterOneAge,
    isOneBender,
    characterOneBender,
    characterOnePrincipal,
    characterOneAscendant,
    characterOneNeutral,
    characterOneOpposite,
    specialSkills,
    notes,
    physicalDescription,
    personnalityDescription,
    storyCharacter,
    powerLevel,
    characterOneBody,
    characterOneMind,
    characterOneSoul,
    characterOneMartial,
    characterOneElement,
    characterOneSpeaking,
    focus,
    breath,
    injuries
]); */

/* const handleManualSave = () => {
    autoSaveSheet();
};
 */

    return (

        <CharacterProvider
            initialSheetData={sheetData}
            id={id}
        >

            <div className='layoutPageCS'>
                <UpdatingOverlay />
                <Navbar
                    light={false}
                />            
                <h1 className={`${titleKit.cornerLeftTitle} ${titleKit.cornerLeftBluetTitle}`}>Harmonistère</h1>

                <div id='characterSpaceHeader'>

                    <div id='navbarCharacter'>
                        <SubNavbarCharacter
                            characterInfoPanel = {characterPresentation}
                            setCharacter = {setCharacterPresentation}
                            subnavbarPresentation = {subnavbarPresentation}
                        />
                    </div>

                    <IconTools
                        /* onSaveClick={handleManualSave} *//>
                </div>
                
                {characterPresentation === 1 &&
                <SheetSpace/>}
                {characterPresentation === 2 &&
                <ComposantTestTwo/>}
                {characterPresentation === 3 &&
                <ComposantTestThree/>}
            </div>
        </CharacterProvider>

        )}

export default CharacterSpaceTwo;