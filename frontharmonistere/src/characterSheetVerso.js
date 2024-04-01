import React from 'react';
import './characterSheetVerso.css';

function CharacterSheetVerso (props) {

    const {name, physicalDescription, personnalityDescription, storyCharacter} = props;

    return (
        <div id='allVersoSheet'>
            <h2>{name}</h2>

            <div id='allCategories'>

                <div id='physicalDescriptionSheet' class='categoryVerso'>
                    <h3>Description physique</h3>
                    <p>{physicalDescription}</p>
                </div>

                <div id='personnalityDescriptionSheet' class='categoryVerso'>
                <h3>Description mentale</h3>
                    <p>{personnalityDescription}</p>
                </div>

                <div id='storySheet' class='categoryVerso'>
                <h3>Histoire</h3>
                    <p>{storyCharacter}</p>
                </div>
            </div>
        </div>)
}

export default CharacterSheetVerso;