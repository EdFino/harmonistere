import React from 'react';
import { useState, useEffect } from 'react';
import cspanelKit from '../style/modules/components/cspanel.module.css';
import policeKit from '../style/modules/global/police.module.css';
import imageKit from '../style/modules/global/image.module.css';
import generalKit from '../style/kitUI.module.css';
import titleKit from '../style/modules/global/title.module.css'
import buttonKit from '../style/modules/global/button.module.css'
import formKit from '../style/modules/global/form.module.css';
import { launcherDices } from '../utils/dices';

function ManoeuverModalPanel ({
            bodyLevel,
            mindLevel,
            soulLevel,
            martialArtsLevel,
            elementaryArtsLevel,
            speakingLevel,
            principalTrait,
            ascendantTrait,
            neutralTrait,
            oppositeTrait,
            focus,
            setFocus,
            onValuesChange
}) {

    const [focusModal, setFocusModal] = useState(focus);
    const [showingResult, setShowingResult] = useState(Array(3).fill(null));

    const [selectedCaracs, setSelectedCarac] = useState(Array(3).fill(null));
    const [selectedValues, setSelectedValues] = useState(Array(3).fill(null));

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
        newSelections[rowIndex] = carac;
        newValues[rowIndex] = carac.value;
        setSelectedCarac(newSelections);
        setSelectedValues(newValues)
    }

    function selectDice (carac, rowIndex) {

        const isSelected = selectedCaracs[rowIndex]?.name === carac.name;
        return (
            <div
                key={carac.name}
                className={`${buttonKit.diceButtonModal} ${isSelected ? buttonKit.isSelected : ''}`}
                style={{backgroundColor: carac.color}}
                onClick={() => handleSelect(carac, rowIndex)}
                >
                    <p className={policeKit.buttonLauncherTitle}>{carac.name}</p>
                    <p className={policeKit.buttonLauncherPolice}>{carac.description}</p>
            </div>
        )
    }

    console.log (selectedValues[0])
    console.log (selectedValues[1])
    console.log (selectedValues[2])
    console.log (selectedValues[0])

    function onclickCheckbox () {

    }

    return (
        <div className={cspanelKit.manoeuverModalPanel}>
            <div className={cspanelKit.stepModalPanel}>
                <h3 className={titleKit.manoeuverModalTitle}>Sur quel attribut vous reposez-vous ?</h3>
                <div className={cspanelKit.lineModalDices}>
                    {selectDice(bodyLevel, 0)}
                    {selectDice(mindLevel, 0)}
                    {selectDice(soulLevel, 0)}
                    {selectDice(martialArtsLevel, 0)}
                    {selectDice(elementaryArtsLevel, 0)}
                    {selectDice(speakingLevel, 0)}
                </div>
                <div className={cspanelKit.checkboxFocusModal}>
                    <p className={policeKit.buttonLauncherTitle}>Point de focus :</p>
                    <div className={cspanelKit.checkboxLine}>
                        <input type='checkbox' id='checkboxCaracOne' className={formKit.checkboxModal}/>
                        <input type='checkbox' id='checkboxCaracTwo' className={formKit.checkboxModal}/>
                        <input type='checkbox' id='checkboxCaracThree' className={formKit.checkboxModal}/>
                    </div>
                </div>
            </div>

            <hr className={cspanelKit.hrStyle}/>

            
            <div className={cspanelKit.stepModalPanel}>
                <h3 className={titleKit.manoeuverModalTitle}>Quel est votre état d'esprit ?</h3>
                <div className={cspanelKit.lineModalDices}>
                    {selectDice(oppositeTrait, 1)}
                    {selectDice(neutralTrait, 1)}
                    {selectDice(ascendantTrait, 1)}
                    {selectDice(principalTrait, 1)}
                </div>
                <div className={cspanelKit.checkboxFocusModal}>
                    <p className={policeKit.buttonLauncherTitle}>Point de focus :</p>
                    <div className={cspanelKit.checkboxLine}>
                        <input type='checkbox' id='checkboxCaracOne' className={formKit.checkboxModal}/>
                        <input type='checkbox' id='checkboxCaracTwo' className={formKit.checkboxModal}/>
                        <input type='checkbox' id='checkboxCaracThree' className={formKit.checkboxModal}/>
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
                        <input type='checkbox' id='checkboxCaracOne' className={formKit.checkboxModal}/>
                        <input type='checkbox' id='checkboxCaracTwo' className={formKit.checkboxModal}/>
                        <input type='checkbox' id='checkboxCaracThree' className={formKit.checkboxModal}/>
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
                    <p className={policeKit.grandFocus}>{focusModal}</p><p className={policeKit.focusPoints}>points de focus</p>
                </div>
                <div className={cspanelKit.buttonsLauncher}>
                    <button
                        className={`${buttonKit.rollResetButton} ${buttonKit.rollButton}`}
                        onClick={() => {setShowingResult(launcherDices(parseInt(selectedValues[0], 10), parseInt(selectedValues[1], 10), selectedValues[2]))}}
                    >
                        Lancer
                    </button>
                    <button
                        className={`${buttonKit.rollResetButton} ${buttonKit.resetButton}`}
                        onClick={() => {
                            setSelectedCarac(Array(3).fill(null));
                            setSelectedValues(Array(3).fill(null));
                            setShowingResult(Array(3).fill(null));
                        }}>
                            Réinitialiser
                    </button>
                </div>
            </div>

                <div className={cspanelKit.resultDices}>
                    {showingResult.map((result, i) => (
                        <p key={i}>{result}</p>
                    ))}
                </div>

                <div className={cspanelKit.resultDices}>
                    {selectedValues.map((result, i) => (
                        <p key={i}>{result}</p>
                    ))}
                </div>
        </div>
    )
}

export default ManoeuverModalPanel