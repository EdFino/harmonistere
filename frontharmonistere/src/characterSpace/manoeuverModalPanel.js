import React from 'react';
import { useState, useEffect } from 'react';
import cspanelKit from '../style/modules/components/cspanel.module.css';
import policeKit from '../style/modules/global/police.module.css';
import imageKit from '../style/modules/global/image.module.css';
import generalKit from '../style/kitUI.module.css';

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
            oppositeTrait
}) {

    function selectDice (levelName, level) {
        return (
            <div className={generalKit.diceButton}>
                <p>{levelName}</p>
                <p>{level}</p>
            </div>
        )
    }

    return (
        <div className={cspanelKit.manoeuverModalPanel}>
            <div className={cspanelKit.stepModalPanel}>
                <h3>Sur quel attribut vous reposez-vous ?</h3>
                <div className={cspanelKit.caracLineProposition}>
                    {selectDice("Corps", bodyLevel.description)}
                    {selectDice("Esprit", mindLevel.description)}
                    {selectDice("Âme", soulLevel.description)}
                    {selectDice("Arts martiaux", martialArtsLevel.description)}
                    {selectDice("Arts élémentaires", elementaryArtsLevel.description)}
                    {selectDice("Arts oratoires", speakingLevel.description)}
                </div>
                <div className='checkboxFocusModal'>
                <p>Point de focus :</p>
                    <input type='checkbox' id='checkboxCaracOne'/>
                    <input type='checkbox' id='checkboxCaracTwo'/>
                    <input type='checkbox' id='checkboxCaracThree'/>
                </div>
            </div>
            <div className={cspanelKit.stepModalPanel}>
                <h3>Quel est votre état d'esprit ?</h3>
                <div className={cspanelKit.caracLineProposition}></div>
            </div>
            <div className={cspanelKit.stepModalPanel}>
                <h3>Le contexte vous est-il favorable ?</h3>
                <div className={cspanelKit.caracLineProposition}></div>
            </div>
        </div>
    )
}

export default ManoeuverModalPanel