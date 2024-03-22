import React, { useState, useEffect } from "react";

const SelectTest = () => {
    const [selectedElementsPrincipal, setSelectedElementsPrincipal] = useState('');
    const [selectedElementsAscendant, setSelectedElementsAscendant] = useState('');
    const [selectedElementsNeutral, setSelectedElementsNeutral] = useState('');
    const [selectedElementsOpposite, setSelectedElementsOpposite] = useState('');
    const [availableElementsAscendant, setAvailableElementsAscendant] = useState(['Terre', 'Feu', 'Air', 'Eau']);
    const [availableElementsNeutral, setAvailableElementsNeutral] = useState(['Terre', 'Feu', 'Air', 'Eau']);
    const [availableElementsOpposite, setAvailableElementsOpposite] = useState(['Terre', 'Feu', 'Air', 'Eau']);

    useEffect(() => {
        const updatedAvailableElementsAscendant = personnalityElementsList.filter(element => {
            return element !== selectedElementsPrincipal;
        });
        setAvailableElementsAscendant(updatedAvailableElementsAscendant);
        setSelectedElementsAscendant('');
    }, [selectedElementsPrincipal]);

    useEffect(() => {
        const updatedAvailableElementsNeutral = availableElementsAscendant.filter(element => {
            return element !== selectedElementsPrincipal && element !== selectedElementsAscendant;
        });
        setAvailableElementsNeutral(updatedAvailableElementsNeutral);
        setSelectedElementsNeutral('');
    }, [selectedElementsPrincipal, selectedElementsAscendant]);

    useEffect(() => {
        const updatedAvailableElementsOpposite = availableElementsNeutral.filter(element => {
            return element !== selectedElementsPrincipal && element !== selectedElementsAscendant && element !== selectedElementsNeutral;
        });
        setAvailableElementsOpposite(updatedAvailableElementsOpposite);
        setSelectedElementsOpposite('');
    }, [selectedElementsPrincipal, selectedElementsAscendant, selectedElementsNeutral]);

    const personnalityElementsList = ['Terre', 'Feu', 'Air', 'Eau'];

    const handleSelectChangePrincipal = (e) => {
        const selectedElement = e.target.value;
        setSelectedElementsPrincipal(selectedElement);
    };

    const handleSelectChangeAscendant = (e) => {
        const selectedElement = e.target.value;
        setSelectedElementsAscendant(selectedElement);
    };

    const handleSelectChangeNeutral = (e) => {
        const selectedElement = e.target.value;
        setSelectedElementsNeutral(selectedElement);
    };

    const handleSelectChangeOpposite = (e) => {
        const selectedElement = e.target.value;
        setSelectedElementsOpposite(selectedElement);
    };

    const handleReset = () => {
        setSelectedElementsPrincipal('');
        setSelectedElementsAscendant('');
        setSelectedElementsNeutral('');
        setSelectedElementsOpposite('');
    };

    return (
        <div id='firstChapterForm'>
            <h2>2/ Personnalité</h2>
            <div>
                <label htmlFor='principal'>Choisissez votre trait principal : </label>
                <select id="principal" name="principal" value={selectedElementsPrincipal} onChange={handleSelectChangePrincipal}>
                    <option value=''>Choisissez un élément dans la liste : </option>
                    {personnalityElementsList.map((element, index) => (
                        <option key={index} value={element}>{element}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor='ascendant'>Choisissez votre ascendant : </label>
                <select id="ascendant" name="ascendant" value={selectedElementsAscendant} onChange={handleSelectChangeAscendant}>
                    <option value=''>Choisissez un élément dans la liste : </option>
                    {availableElementsAscendant.map((element, index) => (
                        <option key={index} value={element}>{element}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor='neutralTrait'>Choisissez votre trait neutre : </label>
                <select id="neutralTrait" name="neutralTrait" value={selectedElementsNeutral} onChange={handleSelectChangeNeutral}>
                    <option value=''>Choisissez un élément dans la liste : </option>
                    {availableElementsNeutral.map((element, index) => (
                        <option key={index} value={element}>{element}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor='oppositeTrait'>Choisissez votre trait contraire : </label>
                <select id="oppositeTrait" name="oppositeTrait" value={selectedElementsOpposite} onChange={handleSelectChangeOpposite}>
                    <option value=''>Choisissez un élément dans la liste : </option>
                    {availableElementsOpposite.map((element, index) => (
                        <option key={index} value={element}>{element}</option>
                    ))}
                </select>
            </div>

            <button type='button' onClick={handleReset}>Réinitialiser</button>
        </div>
    );
}

export default SelectTest;
