import React, { useState, useEffect } from 'react';
import './characterSheet.css';
import Popup from 'reactjs-popup';
import SelectTest from '../creationSheet/selectTest';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup" ;
import DOMPurify from 'dompurify';
import { useForm } from 'react-hook-form';

const validationSchema = yup.object().shape({
    characterName: yup
        .string()
        .required('Attention : votre personnage doit avoir un nom')
        .max(30, 'Attention : le prénom ne doit pas comporter plus de 30 caractères'),

    characterAge: yup
        .number('Attention, veuillez ne mettre que des chiffres...')
        .integer('Attention, veuillez ne pas mettre de virgule')
        .required('Attention : Vous devez mentionner un âge.'),

    benderOrNot: yup.boolean().required('Le statut de maîtrise est requis'),
    benderSelect: yup.string().oneOf(['Aucune', 'Terre', 'Feu', 'Air', 'Eau'], 'Maîtrise invalide'),
    principalTrait: yup.string().required ("Attention : vous devez choisir un trait principal à votre personnage"),
    ascendantTrait: yup.string().required ("Attention : vous devez choisir un trait ascendant à votre personnage"),
    neutralTrait: yup.string().required ("Attention : vous devez choisir un trait neutre à votre personnage"),
    oppositeTrait: yup.string().required ("Attention : vous devez choisir un trait opposé à votre personnage"),
    bodyLevel: yup.string().required ("Attention : vous devez choisir un niveau pour le corps de votre personnage"),
    mindLevel: yup.string().required ("Attention : vous devez choisir un niveau pour l'esprit de votre personnage"),
    soulLevel: yup.string().required ("Attention : vous devez choisir un niveau pour l'âme de votre personnage"),
    martialArtsLevel: yup.string().required ("Attention : vous devez choisir un niveau pour les arts martiaux de votre personnage"),
    elementaryArtsLevel: yup.string().required ("Attention : vous devez choisir un niveau pour les arts élémentaires de votre personnage"),
    speakingLevel: yup.string().required ("Attention : vous devez choisir un niveau pour l\'éloquence de votre personnage"),
    skills: yup.string().max(1000, 'Les compétences ne peuvent pas dépasser 1000 caractères'),
    notes: yup.string().max(2500, 'Les notes ne peuvent pas dépasser 2500 caractères'),
    physicDescription: yup.string().max(2500, 'La description physique ne peut pas dépasser 2500 caractères'),
    mentalDescription: yup.string().max(2500, 'La description mentale ne peut pas dépasser 2500 caractères'),
    story: yup.string().max(3000, 'L\'histoire ne peut pas dépasser 3000 caractères'),
});

function CharacterSheet (props) {

    const {characterName,
            characterAge,
            benderOrNot,
            benderSelect,
            principalTrait,
            ascendantTrait,
            neutralTrait,
            oppositeTrait,
            bodyLevel,
            mindLevel, 
            soulLevel, 
            martialArtsLevel,
            elementaryArtsLevel,
            speakingLevel,
            skills,
            notes,
            physicDescription,
            mentalDescription,
            story,
            changeSheet} = props;

                const { register, handleSubmit, watch, formState: { errors, isSubmitted, isSubmitSuccessful } } = useForm({
                    mode: 'onSubmit',
                    resolver: yupResolver(validationSchema)
                });

            const { id } = useParams();

            const [characterData, setCharacterData] = useState({
                characterName: '',
                characterAge: '',
                benderOrNot: false,
                benderSelect: 'Aucune',
                skills: '',
                notes: '',
                physicDescription: '',
                mentalDescription: '',
                story: '',
                bodyLevel: '0',
                mindLevel: '0',
                soulLevel: '0',
                martialArtsLevel: '0',
                elementaryArtsLevel: '0',
                speakingLevel: '0',
            });
            
            useEffect(() => {
                setCharacterData({
                    characterName: props.characterName || '',
                    characterAge: props.characterAge || '',
                    benderOrNot: props.benderOrNot || false,
                    benderSelect: props.benderOrNot ? props.benderSelect : 'Aucune',
                    skills: props.skills || '',
                    notes: props.notes || '',
                    physicDescription: props.physicDescription || '',
                    mentalDescription: props.mentalDescription || '',
                    story: props.story || '',
                    bodyLevel: props.bodyLevel || '0',
                    mindLevel: props.mindLevel || '0',
                    soulLevel: props.soulLevel || '0',
                    martialArtsLevel: props.martialArtsLevel || '0',
                    elementaryArtsLevel: props.elementaryArtsLevel || '0',
                    speakingLevel: props.speakingLevel || '0',
                });
            }, [props]); // Met à jour l'état lorsque les props changent

            console.log('Voyons voir characterData au début', characterData);

            const handleChange = (event) => {
                const { name, value } = event.target;
                setCharacterData((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
            };

            const sanitizeData = (data) => {
                const sanitizedData = {};
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        if (typeof data[key] === 'object' && data[key] !== null) {
                            sanitizedData[key] = sanitizeData(data[key]);
                        } else {
                            sanitizedData[key] = DOMPurify.sanitize(data[key]);
                        }
                    }
                }
                return sanitizedData;
            };

            const submitUpdate = async () => {
                try {
                    const sanitizedCharacterData = sanitizeData (characterData);
                    console.log ('Formulaire de changement à envoyer : ', characterData);
                    const response = await axios.put(`http://localhost:5038/api/sheets/updateSheet/${id}`, { sheetData : sanitizedCharacterData});
                    if (response.status === 200) {
                        console.log('Mise à jour réussie !');
                    } else {
                        console.error('Erreur lors de la mise à jour.');
                    }
                } catch (error) {
                    console.error('Erreur lors de la communication avec le backend :', error);
                }
            };

            console.log('Props reçus :', props);
        const elementList = [
            { elementName: 'TERRE', importance: principalTrait === 'Terre' ? 'principalTrait' : ascendantTrait === 'Terre' ? 'ascendantTrait' : neutralTrait === 'Terre' ? 'neutralTrait' : oppositeTrait === 'Terre' ? 'oppositeTrait' : '' },
            { elementName: 'FEU', importance: principalTrait === 'Feu' ? 'principalTrait' : ascendantTrait === 'Feu' ? 'ascendantTrait' : neutralTrait === 'Feu' ? 'neutralTrait' : oppositeTrait === 'Feu' ? 'oppositeTrait' : '' },
            { elementName: 'AIR', importance: principalTrait === 'Air' ? 'principalTrait' : ascendantTrait === 'Air' ? 'ascendantTrait' : neutralTrait === 'Air' ? 'neutralTrait' : oppositeTrait === 'Air' ? 'oppositeTrait' : '' },
            { elementName: 'EAU', importance: principalTrait === 'Eau' ? 'principalTrait' : ascendantTrait === 'Eau' ? 'ascendantTrait' : neutralTrait === 'Eau' ? 'neutralTrait' : oppositeTrait === 'Eau' ? 'oppositeTrait' : '' },
        ];


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

    if (martialArtsLevel === '2') {
        characteristicsAcquisList[0].value = 'Critique';
        characteristicsAcquisList[0].class = 'criticClass';
    } else if (martialArtsLevel === '1') {
        characteristicsAcquisList[0].value = 'Bonus';
        characteristicsAcquisList[0].class = 'bonusClass';
    } else if (martialArtsLevel === '0') {
        characteristicsAcquisList[0].value = 'Neutre';
        characteristicsAcquisList[0].class = 'neutralClass';
    } else if (martialArtsLevel === '-1') {
        characteristicsAcquisList[0].value = 'Malus';
        characteristicsAcquisList[0].class = 'oppositeClass';
    } else {}

    if (elementaryArtsLevel === '2') {
        characteristicsAcquisList[1].value = 'Critique';
        characteristicsAcquisList[1].class = 'criticClass';
    } else if (elementaryArtsLevel === '1') {
        characteristicsAcquisList[1].value = 'Bonus';
        characteristicsAcquisList[1].class = 'bonusClass';
    } else if (elementaryArtsLevel === '0') {
        characteristicsAcquisList[1].value = 'Neutre';
        characteristicsAcquisList[1].class = 'neutralClass';
    } else if (elementaryArtsLevel === '-1') {
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

    const characteristicFields = {
        'CORPS': 'bodyLevel',
        'ESPRIT': 'mindLevel',
        'ÂME': 'soulLevel',
        'ARTS MARTIAUX': 'martialArtsLevel',
        'ARTS ELEMENTAIRES': 'elementaryArtsLevel',
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

    return (
        <>
            {changeSheet ? (
                <div id="allSheet">
                    <div id='headerSheet'>
                        <div id='personnalInformation'>
                            <h3>
                                <input
                                    type='text'
                                    name='characterName' 
                                    value={characterData.characterName}
                                    placeholder={characterName}
                                    onChange={handleChange} 
                                />
                            </h3>

                            <p>
                                Âge : 
                                    <input
                                    type='number'
                                    name='characterAge'
                                    value={characterData.characterAge}
                                    placeholder={characterAge}
                                    onChange={handleChange}
                                />
                            </p>

                            <p>Maîtrise :</p>
                            <select
                                name='benderSelect'
                                value={characterData.benderSelect}
                                onChange={handleChange}
                            >
                                <option value='Aucune'>Aucune</option>
                                <option value='Terre'>Terre</option>
                                <option value='Feu'>Feu</option>
                                <option value='Air'>Air</option>
                                <option value='Eau'>Eau</option>

                            </select>
                        </div>

                        <Popup
                            trigger={
                                <div id='personnalityInformation'>
                                    {elementList.map((element, index) => (
                                        <div
                                            key={index}
                                            className={`elementSheet ${element.importance}`}
                                        >
                                            {element.elementName}
                                        </div>
                                    ))}
                                </div>
                            }
                            position="left center"
                        >

                            <SelectTest/>
                        </Popup>
                    </div>
                    <div id="characteristicsInformation">
                        <div className="columnCarac">
                            <h3>Inné</h3>
                            {['bodyLevel', 'mindLevel', 'soulLevel'].map((carac, index) => (
                                <div className="subtitleSheet" key={index}>
                                    <select
                                        name={carac}
                                        value={characterData[carac]}
                                        onChange={handleChange}
                                    >
                                        <option value="2">Critique</option>
                                        <option value="1">Bonus</option>
                                        <option value="0">Neutre</option>
                                        <option value="-1">Malus</option>
                                    </select>
                                    {carac.toUpperCase()}
                                </div>
                            ))}
                        </div>
                        <div className="columnCarac">
                            <h3>Acquis</h3>
                            {['martialArtsLevel', 'elementaryArtsLevel', 'speakingLevel'].map((carac, index) => (
                                <div className="subtitleSheet" key={index}>
                                    <select
                                        name={carac}
                                        value={characterData[carac]}
                                        onChange={handleChange}
                                    >
                                        <option value="2">Critique</option>
                                        <option value="1">Bonus</option>
                                        <option value="0">Neutre</option>
                                        <option value="-1">Malus</option>
                                    </select>
                                    {carac.toUpperCase()}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div id='bottomSheet'>
{/*                         <div id='skillsNote' className='characterInfoText'>
                            <h3>Compétences de votre personnage</h3> */}
                            <textarea
                                name='skills'
                                placeholder={skills}
                                value={characterData.skills}
                                onChange={handleChange}
                                cols={40}
                            />
{/*                         </div>
                        <div id='notes' className='characterInfoText'> */}
                            <h3>Vos notes</h3>
                            <textarea
                                name='notes'
                                placeholder={notes}
                                value={characterData.notes}
                                onChange={handleChange}
                                cols={40}
                                />
{/*                         </div>
 */}                    </div>
                    <div id="otherCategories">
                        <h3>Votre physique</h3>
                        <textarea
                            name='physicDescription'
                            placeholder={physicDescription}
                            value={characterData.physicDescription}
                            onChange={handleChange}
                            cols={60}
                        />
                        <h3>Votre mental</h3>
                        <textarea
                            name='mentalDescription'
                            placeholder={mentalDescription}
                            value={characterData.mentalDescription}
                            onChange={handleChange}
                            cols={60} />
                        <h3>Votre histoire</h3>
                        <textarea
                            name='story'
                            placeholder={story}
                            value={characterData.story}
                            onChange={handleChange}
                            cols={60} />
                    </div>
                    <button type='button' onClick={submitUpdate}>Envoyez vos changements</button>
                </div>
                
            ) : (
                <div id="allSheet">
                    <div id='headerSheet'>
                        <div id='personnalInformation'>
                            <h3>{characterName}</h3>
                            <p>Âge : {characterAge}</p>
                            <p>Maîtrise : {benderOrNot ? benderSelect : 'Aucune'}</p>
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
                            <p>{skills}</p>
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