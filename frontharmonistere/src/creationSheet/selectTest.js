import React, { useState, useEffect } from "react";

const SelectTest = ({onPersonalitySelect, register, errors, watch, setValue}) => {
    const [availableElementsAscendant, setAvailableElementsAscendant] = useState(['Terre', 'Feu', 'Air', 'Eau']);
    const [availableElementsNeutral, setAvailableElementsNeutral] = useState(['Terre', 'Feu', 'Air', 'Eau']);
    const [availableElementsOpposite, setAvailableElementsOpposite] = useState(['Terre', 'Feu', 'Air', 'Eau']);

    useEffect(() => {
        const updatedAvailableElementsAscendant = personnalityElementsList.filter(element => {
            return element !== watch("principalTrait");
        });
        setAvailableElementsAscendant(updatedAvailableElementsAscendant);
        setValue("ascendantTrait", "");
        setValue("neutralTrait", "");
        setValue("oppositeTrait", "");
    }, [watch("principalTrait")]);

    useEffect(() => {
        const updatedAvailableElementsNeutral = availableElementsAscendant.filter(element => {
            return element !== watch("principalTrait") && element !== watch("ascendantTrait");
        });
        setAvailableElementsNeutral(updatedAvailableElementsNeutral);
        setValue("neutralTrait", "");
        setValue("oppositeTrait", "");
    }, [watch("principalTrait"), watch("ascendantTrait")]);

    useEffect(() => {
        const updatedAvailableElementsOpposite = availableElementsNeutral.filter(element => {
            return element !== watch("principalTrait") && element !== watch("ascendantTrait") && element !== watch("neutralTrait");
        });
        setAvailableElementsOpposite(updatedAvailableElementsOpposite);
        setValue("oppositeTrait", "");
    }, [watch("principalTrait"), watch("ascendantTrait"), watch("neutralTrait")]);

    const personnalityElementsList = ['Terre', 'Feu', 'Air', 'Eau'];

    function resetCharac() {
        setValue('principalTrait')
        setValue("ascendantTrait", "");
        setValue("neutralTrait", "");
        setValue("oppositeTrait", "");
    }

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
                </select><br/>
                {errors.principalTrait && <><span className='invalid-feedback'>{errors.principalTrait.message}</span><br/></>}

            </div>

            <div>
                <label htmlFor='ascendantTrait'>Choisissez votre ascendant : </label>
                <select id="ascendantTrait" name="ascendantTrait" {...register("ascendantTrait")}>
                    <option value=''>Choisissez un élément dans la liste : </option>
                    {availableElementsAscendant.map((element, index) => (
                        <option key={index} value={element}>{element}</option>
                    ))}
                </select><br/>
                {errors.ascendantTrait && <><span className='invalid-feedback'>{errors.ascendantTrait.message}</span><br/></>}
            </div>

            <div>
                <label htmlFor='neutralTrait'>Choisissez votre trait neutre : </label>
                <select id="neutralTrait" name="neutralTrait" {...register("neutralTrait")}>
                    <option value=''>Choisissez un élément dans la liste : </option>
                    {availableElementsNeutral.map((element, index) => (
                        <option key={index} value={element}>{element}</option>
                    ))}
                </select><br/>
                {errors.neutralTrait && <><span className='invalid-feedback'>{errors.neutralTrait.message}</span><br/></>}
            </div>

            <div>
                <label htmlFor='oppositeTrait'>Choisissez votre trait contraire : </label>
                <select id="oppositeTrait" name="oppositeTrait" {...register("oppositeTrait")}>
                    <option value=''>Choisissez un élément dans la liste : </option>
                    {availableElementsOpposite.map((element, index) => (
                        <option key={index} value={element}>{element}</option>
                    ))}
                </select><br/>
                {errors.oppositeTrait && <><span className='invalid-feedback'>{errors.oppositeTrait.message}</span><br/></>}
            </div>
            <button type='button' onClick={resetCharac}>Réinitialiser les valeurs</button>
        </div>
    );
}

export default SelectTest;