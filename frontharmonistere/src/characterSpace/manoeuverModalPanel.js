import React from 'react';
import { useState, useEffect } from 'react';
import cspanelKit from '../style/modules/components/cspanel.module.css';
import policeKit from '../style/modules/global/police.module.css';
import imageKit from '../style/modules/global/image.module.css';
import generalKit from '../style/kitUI.module.css';
import titleKit from '../style/modules/global/title.module.css';
import buttonKit from '../style/modules/global/button.module.css';
import formKit from '../style/modules/global/form.module.css';
import { launcherDices } from '../utils/dices';
import { useCharacterContext } from '../hooks/CharacterContext';

function ManoeuverModalPanel () {

    const { characterData, focus, setFocus, breath, setBreath } = useCharacterContext();

    const [showingResult, setShowingResult] = useState(Array(3).fill(null));
    const [selectedCaracs, setSelectedCarac] = useState(Array(3).fill(null));
    const [selectedValues, setSelectedValues] = useState(Array(3).fill(null));
    const [checkboxStates, setCheckboxStates] = useState(Array(9).fill(false));
    const [numberFocusLine, setNumberFocusLine] = useState(Array(3).fill(0));
    const [focusedValues, setFocusedValues] = useState(Array(3).fill(null));


    const malusContext = {
        name: "Défavorable",
        value: -1,
        description: "Malus",
        color: '#D5D5D5'
    }
    const neutralContext = {
        name: "Neutre",
        value: 0,
        description: "Neutre",
        color: '#F5DCAB'
    }
    const bonusContext = {
        name: "Favorable",
        value: 1,
        description: "Bonus",
        color: "#96DE9B"
    }
    const critiqueContext = {
        name: "Très favorable",
        value: 2,
        description: "Critique",
        color: "#FFA6A6"
    }

    function handleSelect(carac, rowIndex) {
        const newSelections = [...selectedCaracs];
        const newValues = [...selectedValues];
        const newFocused = [...focusedValues];
        newSelections[rowIndex] = carac;
        newValues[rowIndex] = carac.value;
        const caracWithFocus = applyFocus(carac, numberFocusLine[rowIndex]);
        newFocused[rowIndex] = caracWithFocus.value;
        setSelectedCarac(newSelections);
        setSelectedValues(newValues);
        setFocusedValues(newFocused);
    }

    function selectDice (carac, rowIndex) {

        const isSelected = selectedCaracs[rowIndex]?.name === carac.name;
        const caracWithFocus = isSelected ? applyFocus(carac, numberFocusLine[rowIndex]) : carac;
        return (
            <div
                key={carac.name}
                className={`${buttonKit.diceButtonModal} ${isSelected ? buttonKit.isSelected : ''}`}
                style={{ backgroundColor: caracWithFocus.newColor ?? carac.color }}
                onClick={() => handleSelect(carac, rowIndex)}
                >
                    <p className={policeKit.buttonLauncherTitle}>{carac.name}</p>
                    <p className={policeKit.buttonLauncherPolice}>{caracWithFocus.newDescription ?? caracWithFocus.description}</p>
            </div>
        )
    }

    function craftingCheckbox (checkboxNumber, lineNumber) {
        return (
            <input
                type='checkbox'
                className={formKit.checkboxModal}
                checked={checkboxStates[checkboxNumber]}
                disabled={!selectedCaracs[lineNumber] || displayedFocus <= 0 && !checkboxStates[checkboxNumber]}
                onChange={(e) => {
                    const updated = [...checkboxStates];
                    updated[checkboxNumber] = e.target.checked;
                    setCheckboxStates(updated);
                    setNumberFocusLine(prev => {
                        const newArray = [...prev];
                        newArray[lineNumber] += e.target.checked ? 1 : -1;
                        const updatedFocused = [...focusedValues];
                        if (selectedCaracs[lineNumber]) {
                            const updatedCarac = applyFocus(selectedCaracs[lineNumber], newArray[lineNumber]);
                            updatedFocused[lineNumber] = updatedCarac.value;
                        }
                        setFocusedValues(updatedFocused);
                        return newArray;
                    })
                }}
            />
        )
    }

    console.log (selectedValues[0])
    console.log (selectedValues[1])
    console.log (selectedValues[2])
    console.log (selectedValues[0])

    function applyFocus (myCarac, valueToAdd) {
        const baseValue = parseInt(myCarac.value);
        let newValue = baseValue + valueToAdd;

        let newDescription = myCarac.description;
        let newColor = myCarac.color;

        switch (newValue) {
            case -1:
                newDescription = "Malus";
                newColor = '#D5D5D5';
                break;
            case 0:
                newDescription = "Neutre";
                newColor = '#F5DCAB';
                break;
            case 1:
                newDescription = "Bonus";
                newColor = "#96DE9B";
                break;
            case 2:
            case 3:
            case 4:
            case 5:
                newDescription = "Critique";
                newColor = "#FFA6A6";
                break;
            default:
                break;
        }

        return {
            ...myCarac,
            value: newValue,
            newDescription,
            newColor
        };
    }

    const autorisationToRoll = focusedValues.filter(v => v !== null).length === 3;
    const focusUsed = checkboxStates.filter(Boolean).length;
    const displayedFocus = focus - focusUsed;


    return (
        <div className={cspanelKit.manoeuverModalPanel}>
            <div className={cspanelKit.stepModalPanel}>
                <h3 className={titleKit.manoeuverModalTitle}>Sur quel attribut vous reposez-vous ?</h3>
                <div className={cspanelKit.lineModalDices}>
                    {selectDice(characterData.attributes.body, 0)}
                    {selectDice(characterData.attributes.mind, 0)}
                    {selectDice(characterData.attributes.soul, 0)}
                    {selectDice(characterData.attributes.martial, 0)}
                    {selectDice(characterData.attributes.element, 0)}
                    {selectDice(characterData.attributes.speaking, 0)}

                </div>
                <div className={cspanelKit.checkboxFocusModal}>
                    <p className={policeKit.buttonLauncherTitle}>Point de focus :</p>
                    <div className={cspanelKit.checkboxLine}>
                        {craftingCheckbox(0, 0)}
                        {craftingCheckbox(1, 0)}
                        {craftingCheckbox(2, 0)}
                    </div>
                </div>
            </div>

            <hr className={cspanelKit.hrStyle}/>

            
            <div className={cspanelKit.stepModalPanel}>
                <h3 className={titleKit.manoeuverModalTitle}>Quel est votre état d'esprit ?</h3>
                <div className={cspanelKit.lineModalDices}>
                    {selectDice(characterData.traits.opposite, 1)}
                    {selectDice(characterData.traits.neutral, 1)}
                    {selectDice(characterData.traits.ascendant, 1)}
                    {selectDice(characterData.traits.principal, 1)}
                </div>
                <div className={cspanelKit.checkboxFocusModal}>
                    <p className={policeKit.buttonLauncherTitle}>Point de focus :</p>
                    <div className={cspanelKit.checkboxLine}>
                        {craftingCheckbox(3, 1)}
                        {craftingCheckbox(4, 1)}
                        {craftingCheckbox(5, 1)}
                    </div>
                </div>
            </div>

            <hr className={cspanelKit.hrStyle}/>

            <div className={cspanelKit.stepModalPanel}>
                <h3 className={titleKit.manoeuverModalTitle}>Le contexte vous est-il favorable ?</h3>
                <div className={cspanelKit.lineModalDices}>
                    {selectDice(malusContext, 2)}
                    {selectDice(neutralContext, 2)}
                    {selectDice(bonusContext, 2)}
                    {selectDice(critiqueContext, 2)}
                </div>
                <div className={cspanelKit.checkboxFocusModal}>
                    <p className={policeKit.buttonLauncherTitle}>Point de focus :</p>
                    <div className={cspanelKit.checkboxLine}>
                        {craftingCheckbox(6, 2)}
                        {craftingCheckbox(7, 2)}
                        {craftingCheckbox(8, 2)}
                    </div>
                </div>
            </div>

            <div className={cspanelKit.showDicesSelected}>
                {selectedCaracs.filter(Boolean).map((carac, i, array) => (
                    <React.Fragment key={i}>
                        <div style={{ padding: '0 5px'}}>
                            {carac && <p className={policeKit.showDices}>Dé {carac.description}</p>}
                        </div>
                        {i < array.length - 1 && (
                            <div className={policeKit.verticalLine}></div>
        )}
                    </React.Fragment>
                ))}
            </div>

            <div className={cspanelKit.focusAndRoll}>
                <div className={cspanelKit.focusNumber}>
                    <p className={policeKit.grandFocus}>{displayedFocus}</p><p className={policeKit.focusPoints}>points de focus</p>
                </div>
                <div className={cspanelKit.buttonsLauncher}>
                    <button
                        className={`${buttonKit.rollResetButton} ${buttonKit.rollButton}`}
                        disabled={!autorisationToRoll}
                        onClick={() => {
                            const result = launcherDices(
                                parseInt(focusedValues[0], 10),
                                parseInt(focusedValues[1], 10),
                                parseInt(focusedValues[2], 10)
                            );
                            console.log("DisplayedFocus", displayedFocus)
                            setShowingResult(result);
                            
                            const focusUsed = checkboxStates.filter(Boolean).length;
                            const currentDisplayedFocus = focus - focusUsed;

                            console.log('--- DEBUG ON CLICK ---');
                            console.log('focus (base):', focus);
                            console.log('checkboxStates:', checkboxStates);
                            console.log('focusUsed:', checkboxStates.filter(Boolean).length);


                            setFocus(currentDisplayedFocus);

                            setCheckboxStates(Array(9).fill(false));
                            setSelectedCarac(Array(3).fill(null));
                            setSelectedValues(Array(3).fill(null));
                            setFocusedValues(Array(3).fill(null));
                            setNumberFocusLine(Array(3).fill(0));
                        }}
                    >
                        Lancer
                    </button>
                    <button
                        className={`${buttonKit.rollResetButton} ${buttonKit.resetButton}`}
                        onClick={() => {
                            setSelectedCarac(Array(3).fill(null));
                            setSelectedValues(Array(3).fill(null));
                            setShowingResult(Array(3).fill(null));
                            setFocusedValues(Array(3).fill(null));
                            setNumberFocusLine(Array(3).fill(0));
                            setCheckboxStates(Array(9).fill(false));
                        }}>
                            Réinitialiser
                    </button>
                </div>
            </div>

                <div className={cspanelKit.showResultsSelected}>
                    {showingResult.filter(Boolean).map((result, i, array) => (
                        <React.Fragment key={i}>
                            <div style={{ padding: '0 5px'}}>
                                {result && <p className={policeKit.showResults}>{result}</p>}
                            </div>
                            {i < array.length - 1 && (
                                <div className={policeKit.verticalLine}></div>
                            )}
                        </React.Fragment>
                    ))}
            </div>


        </div>
    )
}

export default ManoeuverModalPanel