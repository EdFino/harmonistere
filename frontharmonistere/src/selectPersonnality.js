import React, { useState } from "react";

const SelectPersonnality = () => {
    const [selectedElements, setSelectedElements] = useState({
        principal: '',
        ascendant: '',
        neutralTrait: '',
        oppositeTrait: ''
    });

    const personnalityElementsList = ['Terre', 'Feu', 'Air', 'Eau'];

    const handleElementChange = (trait, element) => {
        setSelectedElements({ ...selectedElements, [trait]: element });
    }

    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        handleElementChange('oppositeTrait', selectedValue);
    }

    const availableElements = personnalityElementsList.filter(element => !Object.values(selectedElements).includes(element));

    const generateOptions = () => {
        const options = [];
        for (let i = 0; i < availableElements.length; i++) {
            options.push(<option key={i} value={availableElements[i]}>{availableElements[i]}</option>);
        }
        return options;
    }

    return (
        <div id='firstChapterForm'>
            <h2>2/ Personnalité</h2>
            <div>
                <label htmlFor='principal'>Choisissez votre trait principal : </label>
                <select id="principal" name="principal" value={selectedElements.principal} onChange={(e) => handleElementChange('principal', e.target.value)}>
                    <option value=''>Choisissez un élément dans la liste : </option>
                    {generateOptions()}
                </select>
            </div>

            <div>
                <label htmlFor='ascendant'>Choisissez votre ascendant : </label>
                <select id="ascendant" name="ascendant" value={selectedElements.ascendant} onChange={(e) => handleElementChange('ascendant', e.target.value)}>
                    <option value=''>Choisissez un élément dans la liste : </option>
                    {generateOptions()}
                </select>
            </div>

            <div>
                <label htmlFor='neutralTrait'>Choisissez votre trait neutre : </label>
                <select id="neutralTrait" name="neutralTrait" value={selectedElements.neutralTrait} onChange={(e) => handleElementChange('neutralTrait', e.target.value)}>
                    <option value=''>Choisissez un élément dans la liste : </option>
                    {generateOptions()}
                </select>
            </div>

            <div>
                <label htmlFor='oppositeTrait'>Choisissez votre trait contraire : </label>
                <select id="oppositeTrait" name="oppositeTrait" value={selectedElements.oppositeTrait} onChange={handleSelectChange}>
                    <option value=''>Choisissez un élément dans la liste : </option>
                    {generateOptions()}
                </select>
            </div>
        </div>
    );
}

export default SelectPersonnality;