import React from 'react';
import './characterSheet.css';

function CharacterSheet (props) {

    const {name,
            age,
            isBender,
            bending,
            principalTrait,
            ascendantTrait,
            neutralTrait,
            oppositeTrait,
            bodyLevel,
            mindLevel, 
            soulLevel, 
            martialLevel,
            elementLevel,
            speakingLevel,
            specialSkills,
            notes} = props;

    const elementList = [{elementName: 'TERRE', importance: ''},
                        {elementName: 'FEU', importance: ''},
                        {elementName: 'AIR', importance: ''},
                        {elementName: 'EAU', importance: ''},
                        ];

    if (principalTrait === 'Terre') {
        elementList[0].importance = 'principalTrait';
    } else if (principalTrait === 'Feu') {
        elementList[1].importance = 'principalTrait';
    } else if (principalTrait === 'Air') {
        elementList[2].importance = 'principalTrait';
    } else if (principalTrait === 'Eau') {
        elementList[3].importance = 'principalTrait';
    }

    if (ascendantTrait === 'Terre') {
        elementList[0].importance = 'ascendantTrait';
    } else if (ascendantTrait === 'Feu') {
        elementList[1].importance = 'ascendantTrait';
    } else if (ascendantTrait === 'Air') {
        elementList[2].importance = 'ascendantTrait';
    } else if (ascendantTrait === 'Eau') {
        elementList[3].importance = 'ascendantTrait';
    }

    if (neutralTrait === 'Terre') {
        elementList[0].importance = 'neutralTrait';
    } else if (neutralTrait === 'Feu') {
        elementList[1].importance = 'neutralTrait';
    } else if (neutralTrait === 'Air') {
        elementList[2].importance = 'neutralTrait';
    } else if (neutralTrait === 'Eau') {
        elementList[3].importance = 'neutralTrait';
    }

    if (oppositeTrait === 'Terre') {
        elementList[0].importance = 'oppositeTrait';
    } else if (oppositeTrait === 'Feu') {
        elementList[1].importance = 'oppositeTrait';
    } else if (oppositeTrait === 'Air') {
        elementList[2].importance = 'oppositeTrait';
    } else if (oppositeTrait === 'Eau') {
        elementList[3].importance = 'oppositeTrait';
    }

    const characteristicsInnéList = [{caracName:'CORPS', value:'', class:''},
                                    {caracName:'ESPRIT', value:'', class:''},
                                    {caracName:'ÂME', value:'', class:''}];
    
    const characteristicsAcquisList = [{caracName:'ARTS MARTIAUX', value:'', class:''},
                                    {caracName:'ARTS ELEMENTAIRES', value:'', class:''},
                                    {caracName:'ARTS ORATOIRES', value:'', class:''}];

    if (bodyLevel === '2') {
        characteristicsInnéList[0].value = 'Critique';
        characteristicsInnéList[0].class = 'criticClass';
    } else if (bodyLevel === '1') {
        characteristicsInnéList[0].value = 'Bonus';
        characteristicsInnéList[0].class = 'bonusClass';
    } else if (bodyLevel === '0') {
        characteristicsInnéList[0].value = 'Neutre';
        characteristicsInnéList[0].class = 'neutralClass';
    } else if (bodyLevel === '-1') {
        characteristicsInnéList[0].value = 'Malus';
        characteristicsInnéList[0].class = 'oppositeClass';
    } else {}

    if (mindLevel === '2') {
        characteristicsInnéList[1].value = 'Critique';
        characteristicsInnéList[1].class = 'criticClass';
    } else if (mindLevel === '1') {
        characteristicsInnéList[1].value = 'Bonus';
        characteristicsInnéList[1].class = 'bonusClass';
    } else if (mindLevel === '0') {
        characteristicsInnéList[1].value = 'Neutre';
        characteristicsInnéList[1].class = 'neutralClass';
    } else if (mindLevel === '-1') {
        characteristicsInnéList[1].value = 'Malus';
        characteristicsInnéList[1].class = 'oppositeClass';
    } else {}

    if (soulLevel === '2') {
        characteristicsInnéList[2].value = 'Critique';
        characteristicsInnéList[2].class = 'criticClass';
    } else if (soulLevel === '1') {
        characteristicsInnéList[2].value = 'Bonus';
        characteristicsInnéList[2].class = 'bonusClass';
    } else if (soulLevel === '0') {
        characteristicsInnéList[2].value = 'Neutre';
        characteristicsInnéList[2].class = 'neutralClass';
    } else if (soulLevel === '-1') {
        characteristicsInnéList[2].value = 'Malus';
        characteristicsInnéList[2].class = 'oppositeClass';
    } else {}

    if (martialLevel === '2') {
        characteristicsAcquisList[0].value = 'Critique';
        characteristicsAcquisList[0].class = 'criticClass';
    } else if (martialLevel === '1') {
        characteristicsAcquisList[0].value = 'Bonus';
        characteristicsAcquisList[0].class = 'bonusClass';
    } else if (martialLevel === '0') {
        characteristicsAcquisList[0].value = 'Neutre';
        characteristicsAcquisList[0].class = 'neutralClass';
    } else if (martialLevel === '-1') {
        characteristicsAcquisList[0].value = 'Malus';
        characteristicsAcquisList[0].class = 'oppositeClass';
    } else {}

    if (elementLevel === '2') {
        characteristicsAcquisList[1].value = 'Critique';
        characteristicsAcquisList[1].class = 'criticClass';
    } else if (elementLevel === '1') {
        characteristicsAcquisList[1].value = 'Bonus';
        characteristicsAcquisList[1].class = 'bonusClass';
    } else if (elementLevel === '0') {
        characteristicsAcquisList[1].value = 'Neutre';
        characteristicsAcquisList[1].class = 'neutralClass';
    } else if (elementLevel === '-1') {
        characteristicsAcquisList[1].value = 'Malus';
        characteristicsAcquisList[1].class = 'oppositeClass';
    } else {}

    if (speakingLevel === '2') {
        characteristicsAcquisList[2].value = 'Critique';
        characteristicsAcquisList[2].class = 'criticClass';
    } else if (speakingLevel === '1') {
        characteristicsAcquisList[2].value = 'Bonus';
        characteristicsAcquisList[2].class = 'bonusClass';
    } else if (speakingLevel === '0') {
        characteristicsAcquisList[2].value = 'Neutre';
        characteristicsAcquisList[2].class = 'neutralClass';
    } else if (speakingLevel === '-1') {
        characteristicsAcquisList[2].value = 'Malus';
        characteristicsAcquisList[2].class = 'oppositeClass';
    } else {}

    return (
    <div id="allSheet">
            <div id='headerSheet'>

                <div id='personnalInformation'>
                <h3>{name}</h3>
                <p>Âge : {age}</p>
                <p>Maîtrise : {isBender ? bending : 'Aucune'}</p>
                </div>
                
                <div id='personnalityInformation'>
                    {elementList.map((element, index) => (
                        <div key={index} className={`elementSheet ${element.importance}`}>{element.elementName}</div>
                    ))}
                </div>
            </div>
            <div id='characteristicsInformation'>
                <div className='columnCarac'>
                    <h3>Inné</h3>
                    {characteristicsInnéList.map((element, index) => (
                        <div className='subtitleSheet'><div key={index} className={`caracSheet ${element.class}`}>{element.value}</div>
                        {element.caracName} </div>
                    ))}
                </div>
                <div className='columnCarac'>
                    <h3>Acquis</h3>
                    {characteristicsAcquisList.map((element, index) => (
                        <div className='subtitleSheet rightSide'><div key={index} className={`caracSheet ${element.class}`}>{element.value}</div>
                        {element.caracName} </div>
                    ))}
            </div>
        </div>
        <div id='bottomSheet'>
            <div id='skillsNote' class='characterInfoText'>
                <h3>Compétences de votre personnage</h3>
                <p>{specialSkills}</p>
            </div>
            <div id='notes' class='characterInfoText'>
                <h3>Vos notes</h3>
                <p>
                    {notes}
                </p>
            </div>
        </div>
    </div>
    )
}

export default CharacterSheet;