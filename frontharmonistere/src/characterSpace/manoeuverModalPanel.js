import React from 'react';
import { useState, useEffect } from 'react';
import cspanelKit from '../style/modules/components/cspanel.module.css';
import policeKit from '../style/modules/global/police.module.css';
import imageKit from '../style/modules/global/image.module.css';
import generalKit from '../style/kitUI.module.css';
import titleKit from '../style/modules/global/title.module.css'
import buttonKit from '../style/modules/global/button.module.css'
import formKit from '../style/modules/global/form.module.css';

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

    function selectDice (carac) {
        return (
            <div className={buttonKit.diceButtonModal} style={{backgroundColor: carac.color}}>
                <p className={policeKit.buttonLauncherTitle}>{carac.name}</p>
                <p className={policeKit.buttonLauncherPolice}>{carac.description}</p>
            </div>
        )
    }

    function onclickCheckbox () {

    }

    return (
        <div className={cspanelKit.manoeuverModalPanel}>
            <div className={cspanelKit.stepModalPanel}>
                <h3 className={titleKit.manoeuverModalTitle}>Sur quel attribut vous reposez-vous ?</h3>
                <div className={cspanelKit.lineModalDices}>
                    {selectDice(bodyLevel)}
                    {selectDice(mindLevel)}
                    {selectDice(soulLevel)}
                    {selectDice(martialArtsLevel)}
                    {selectDice(elementaryArtsLevel)}
                    {selectDice(speakingLevel)}
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
                    {selectDice(oppositeTrait)}
                    {selectDice(neutralTrait)}
                    {selectDice(ascendantTrait)}
                    {selectDice(principalTrait)}
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
                    <div className={buttonKit.diceButtonModal} style={{backgroundColor: '#D5D5D5'}}>
                        <p className={policeKit.buttonLauncherTitle}>Défavorable</p>
                    </div>
                    <div className={buttonKit.diceButtonModal} style={{backgroundColor: '#F5DCAB'}}>
                        <p className={policeKit.buttonLauncherTitle}>Neutre</p>
                    </div>
                    <div className={buttonKit.diceButtonModal} style={{backgroundColor: '#96DE9B'}}>
                        <p className={policeKit.buttonLauncherTitle}>Bonus</p>
                    </div>
                    <div className={buttonKit.diceButtonModal} style={{backgroundColor: '#FFA6A6'}}>
                        <p className={policeKit.buttonLauncherTitle}>Critique</p>
                    </div>
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

            <div className={cspanelKit.focusAndRoll}>
                <div className={cspanelKit.focusNumber}>
                    <p className={policeKit.grandFocus}>{focusModal}</p> points de focus
                </div>
                <button className={buttonKit.rollResetButton}>Lancer</button>
                <button className={buttonKit.rollResetButton}>Réinitialiser</button>
                

            </div>
        </div>
    )
}

export default ManoeuverModalPanel