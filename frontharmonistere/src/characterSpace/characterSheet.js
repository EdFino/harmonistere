import React, { useState } from 'react';
import './characterSheet.css';
import Popup from 'reactjs-popup';
import SelectTest from '../creationSheet/selectTest';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
            notes,
            physicalDescription,
            personnalityDescription,
            storyCharacter,
            changeSheet} = props;

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

    /* Fonctions pour gérer les updates de la fiche */


    const [formDataUpdate, setFormDataUpdate] = useState({});
    const [newName, setNewName] = useState('');
    const [newAge, setNewAge] = useState('');
    const [newSkills, setNewSkills] = useState('');
    const [newNotes, setNewNotes] = useState('');
    const [newPhysic, setNewPhysic] = useState('');
    const [newMental, setNewMental] = useState('');
    const [newStory, setNewStory] = useState('');
    const { id } =useParams();

    console.log('Montre-moi le formulaire : ', formDataUpdate);

    const handleUpdate = (event) => {
        const { name, value } = event.target;
        setFormDataUpdate((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };
    

    const characteristicFields = {
        'CORPS': 'bodyLevel',
        'ESPRIT': 'mindLevel',
        'ÂME': 'soulLevel',
        'ARTS MARTIAUX': 'martialLevel',
        'ARTS ELEMENTAIRES': 'elementaryLevel',
        'ARTS ORATOIRES': 'speakingLevel'
    };

    const handleUpdateCharacteristics = (caracName, selectedValue) => {
        let numericValue = 0;

        switch (selectedValue) {
            case 'Critique':
                numericValue = 2;
                break;
            case 'Bonus':
                numericValue = 1;
                break;
            case 'Neutre':
                numericValue = 0;
                break;
            case 'Malus':
                numericValue = -1;
                break;
            default:
                numericValue = 0;
        }

        const fieldName = characteristicFields[caracName];
        if (fieldName) {
            setFormDataUpdate({ ...formDataUpdate, [fieldName]: numericValue });
        }
    };

    const handleNameChange = (event) => {
        setNewName(event.target.value);
        handleUpdate(event);
    };

    const handleAgeChange = (event) => {
        setNewAge(event.target.value);
        handleUpdate(event);
    };

    const handleSkillsChange = (event) => {
        setNewSkills(event.target.value);
        handleUpdate(event);
    };

    const handleNotesChange = (event) => {
        setNewNotes(event.target.value);
        handleUpdate(event);
    };

    const handlePhysicChange = (event) => {
        setNewPhysic(event.target.value);
        handleUpdate(event);
    };

    const handleMentalChange = (event) => {
        setNewMental(event.target.value);
        handleUpdate(event);
    };

    const handleStoryChange = (event) => {
        setNewStory(event.target.value);
        handleUpdate(event);
    };

    console.log({id});

    const submitUpdate = async () => {
        try {
            // Envoyer les données au backend pour la mise à jour
            const response = await axios.put('/backharmonistere/updateSheet/:id', formDataUpdate);
    
            // Vérifier si la mise à jour a réussi
            if (response.status === 200) {
                console.log('Mise à jour des caractéristiques réussie !');
            } else {
                console.error('Erreur lors de la mise à jour des caractéristiques.');
            }
        } catch (error) {
            console.error('Erreur lors de la communication avec le backend :', error);
        }
    };
    
    


    return (
        <>
            {changeSheet ? (
                <div id="allSheet">
                    <div id='headerSheet'>
                        <div id='personnalInformation'>
                            <h3><input type='text' name='name' value={newName} placeholder={name} onChange={handleNameChange} /></h3>
                            <p>Âge : <input type='number' name='age' value={newAge} placeholder={age} onChange={handleAgeChange} /></p>
                            <p>Maîtrise :</p>
                            <select defaultValue= {isBender ? bending : 'Aucune'}>
                                <option value='Aucune'>Aucune</option>
                                <option value='Terre'>Terre</option>
                                <option value='Feu'>Feu</option>
                                <option value='Air'>Air</option>
                                <option value='Eau'>Eau</option>
                            </select>
                        </div>
                        <Popup trigger={
            <div id='personnalityInformation'>
                {elementList.map((element, index) => (
                    <div key={index} className={`elementSheet ${element.importance}`}>{element.elementName}</div>
                ))}
            </div>
        } position="left center">
            <SelectTest/>
        </Popup>
                    </div>
                    <div id='characteristicsInformation'>
                        <div className='columnCarac'>
                            <h3>Inné</h3>
                            {characteristicsInnéList.map((element, index) => (
                                <div className='subtitleSheet' key={index}>
                                    <div className={`caracSheet ${element.class}`}>
                                        <select defaultValue={element.value} onChange={(event) => handleUpdateCharacteristics(element.caracName, event.target.value)}>
                                            <option value='Malus'>Malus</option>
                                            <option value='Neutre'>Neutre</option>
                                            <option value='Bonus'>Bonus</option>
                                            <option value='Critique'>Critique</option>
                                        </select>
                                    </div>
                                    {element.caracName}
                                </div>
                            ))}
                        </div>
                        <div className='columnCarac'>
                            <h3>Acquis</h3>
                            {characteristicsAcquisList.map((element, index) => (
                                <div className='subtitleSheet rightSide' key={index}>
                                    <div className={`caracSheet ${element.class}`}>
                                    <select defaultValue={element.value} onChange={(event) => handleUpdateCharacteristics(element.caracName, event.target.value)}>
                                            <option value='Malus'>Malus</option>
                                            <option value='Neutre'>Neutre</option>
                                            <option value='Bonus'>Bonus</option>
                                            <option value='Critique'>Critique</option>
                                        </select>
                                    </div>
                                    {element.caracName}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div id='bottomSheet'>
                        <div id='skillsNote' className='characterInfoText'>
                            <h3>Compétences de votre personnage</h3>
                            <textarea
                                name='skills'
                                placeholder={specialSkills}
                                value={newSkills}
                                onChange={handleSkillsChange}
                                cols={40}
                            />
                        </div>
                        <div id='notes' className='characterInfoText'>
                            <h3>Vos notes</h3>
                            <textarea
                                name='notes'
                                placeholder={notes}
                                value={newNotes}
                                onChange={handleNotesChange}
                                cols={40}
                                />
                        </div>
                    </div>
                    <div id="otherCategories">
                        <h3>Votre physique</h3>
                        <textarea
                            name='physicDescription'
                            placeholder={physicalDescription}
                            value={newPhysic}
                            onChange={handlePhysicChange}
                            cols={60}
                        />
                        <h3>Votre mental</h3>
                        <textarea
                            name='mentalDescription'
                            placeholder={personnalityDescription}
                            value={newMental}
                            onChange={handleMentalChange}
                            cols={60} />
                        <h3>Votre histoire</h3>
                        <textarea
                            name='story'
                            placeholder={storyCharacter}
                            value={newStory}
                            onChange={handleStoryChange}
                            cols={60} />
                    </div>
                    <button type='button' onClick={submitUpdate}>Envoyez vos changements</button>
                </div>
                
            ) : (
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
                                <div className='subtitleSheet' key={index}>
                                    <div className={`caracSheet ${element.class}`}>{element.value}</div>
                                    {element.caracName}
                                </div>
                            ))}
                        </div>
                        <div className='columnCarac'>
                            <h3>Acquis</h3>
                            {characteristicsAcquisList.map((element, index) => (
                                <div className='subtitleSheet rightSide' key={index}>
                                    <div className={`caracSheet ${element.class}`}>{element.value}</div>
                                    {element.caracName}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div id='bottomSheet'>
                        <div id='skillsNote' className='characterInfoText'>
                            <h3>Compétences de votre personnage</h3>
                            <p>{specialSkills}</p>
                        </div>
                        <div id='notes' className='characterInfoText'>
                            <h3>Vos notes</h3>
                            <p>{notes}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
    
    }

export default CharacterSheet;