import React, { useState, useEffect } from "react";

const SelectTest = ({onPersonalitySelect}) => {
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

    const handleConfirmSelection = () => {
        onPersonalitySelect(selectedElementsPrincipal, selectedElementsAscendant, selectedElementsNeutral, selectedElementsOpposite);
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
                <label htmlFor='principalTrait'>Choisissez votre trait principal : </label>
                <select id="principalTrait" name="principalTrait" {...register("principalTrait")}>
                    <option value=''>Choisissez un élément dans la liste : </option>
                    {personnalityElementsList.map((element, index) => (
                        <option key={index} value={element}>{element}</option>
                    ))}
                </select>
                {errors.principalTrait && <><span className='invalid-feedback'>{errors.principalTrait.message}</span><br/></>}

            </div>

            <div>
                <label htmlFor='ascendantTrait'>Choisissez votre ascendant : </label>
                <select id="ascendantTrait" name="ascendantTrait" {...register("ascendantTrait")}>
                    <option value=''>Choisissez un élément dans la liste : </option>
                    {availableElementsAscendant.map((element, index) => (
                        <option key={index} value={element}>{element}</option>
                    ))}
                </select>
                {errors.ascendantTrait && <><span className='invalid-feedback'>{errors.ascendantTrait.message}</span><br/></>}
            </div>

            <div>
                <label htmlFor='neutralTrait'>Choisissez votre trait neutre : </label>
                <select id="neutralTrait" name="neutralTrait" {...register("neutralTrait")}>
                    <option value=''>Choisissez un élément dans la liste : </option>
                    {availableElementsNeutral.map((element, index) => (
                        <option key={index} value={element}>{element}</option>
                    ))}
                </select>
                {errors.neutralTrait && <><span className='invalid-feedback'>{errors.neutralTrait.message}</span><br/></>}
            </div>

            <div>
                <label htmlFor='oppositeTrait'>Choisissez votre trait contraire : </label>
                <select id="oppositeTrait" name="oppositeTrait" {...register("oppositeTrait")}>
                    <option value=''>Choisissez un élément dans la liste : </option>
                    {availableElementsOpposite.map((element, index) => (
                        <option key={index} value={element}>{element}</option>
                    ))}
                </select>
                {errors.oppositeTrait && <><span className='invalid-feedback'>{errors.oppositeTrait.message}</span><br/></>}
            </div>

            <button type='button' onClick={handleReset}>Réinitialiser</button>
            <button type='button' onClick={handleConfirmSelection}>Confirmer votre choix</button>
        </div>
    );
}

export default SelectTest;