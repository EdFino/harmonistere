import React from 'react';
import Navbar from '../navbar/navbar';
import './characterSpace.css';
import CharacterSheet from './characterSheet';

function CharacterSpace () {

/* Ces valeurs sont fictives, il faudra brancher avec MongoDB pour avoir le reste*/

const characterOneName = "Jean-Dhiëgo";
const characterOneAge = 32;
const isOneBender = true;
const characterOneBender = "Feu";
const characterOnePrincipal = "Eau";
const characterOneAscendant = "Feu";
const characterOneNeutral = "Air";
const characterOneOpposite = "Terre";
const characterOneBody = '0';
const characterOneMind = '1';
const characterOneSoul = '-1';
const characterOneMartial = '-1';
const characterOneElement = '2';
const characterOneSpeaking = '-1'


/*Fin des valeurs fictives*/

    return (
        <>
            <Navbar/>
            <h1>Espace de votre vanille</h1>
            <h2>{characterOneName}</h2>
            <div id='characterSpace'>
                <div id='columnCrud' class='columnSheet'>
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
                <div id='columnPlay' class='columnSheet'>
                    <p>Ici, nous aurons la seconde colonne avec les fonctions de la fiche</p>
                </div>
            </div>
        </>  
    )
}

export default CharacterSpace