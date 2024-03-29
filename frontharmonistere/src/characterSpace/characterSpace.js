import React, { useState, useEffect } from 'react';
import { auth } from '../assets/firebase';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import Navbar from '../navbar/navbar';
import './characterSpace.css';
import CharacterSheet from './characterSheet';

function CharacterSpace () {

    const [user] = useAuthState(auth);
    const [sheetData, setSheetData] = useState(null);

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
                    }
                })
                .catch(error => {
                    console.log('Erreur lors de la récupération des données : ', error);
                });
        }
    }, [user]); // Déclenchez l'effet chaque fois que la valeur de user change
    

    console.log (sheetData);

/* Ces valeurs sont fictives, il faudra brancher avec MongoDB pour avoir le reste*/


/*Fin des valeurs fictives*/

    return (
        <>
            <Navbar/>
            <h1>Espace de votre vanille</h1>
            <h2>{characterOneName}</h2>
            <div id='characterSpace'>
                <div id='columnCrud' className='columnSheet'>
                    <p>Ici il y aura les valeurs pour modifier sa fiche</p>
                </div>
                <div id='characterSheetVisual'>
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
                        speakingLevel={characterOneSpeaking}/>
                </div>
                <div id='columnPlay' className='columnSheet'>
                    <p>Ici, nous aurons la seconde colonne avec les fonctions de la fiche</p>
                </div>
            </div>
        </>  
    )
}

export default CharacterSpace