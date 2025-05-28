import React from 'react';
import cspanelKit from '../style/modules/components/cspanel.module.css';
import imageKit from '../style/modules/global/image.module.css';
import titleKit from '../style/modules/global/title.module.css';
import policeKit from '../style/modules/global/police.module.css';
import circleKit from '../style/modules/components/circle.module.css';
import avatarDefault from '../images/avatarDefault.png';
import airIcon from '../images/Air.png';
import waterIcon from '../images/Eau.png';
import earthIcon from '../images/Terre.png';
import fireIcon from '../images/Feu.png';


function CSMainPanel ({characterName, characterAge, benderSelect, powerLevel, principalTrait, ascendantTrait, neutralTrait, oppositeTrait}) {

    function whatHarmonistereType (benderSelect) {

        switch (benderSelect) {
            case "Terre":
                return "Harmonistère de la "
                break;
            case "Feu":
                return "Harmonistère du "
                break;
            case "Air":
            case "Eau":
                return "Harmonistère de l'"
                break;
            default:
                return ""
        }
    }

    const harmonistereType = whatHarmonistereType(benderSelect);

        function getTraitClass(element) {
            if (element === principalTrait.name) return principalTrait.color;
            if (element === ascendantTrait.name) return ascendantTrait.color;
            if (element === neutralTrait.name) return neutralTrait.color;
            if (element === oppositeTrait.name) return oppositeTrait.color;
        return '';
    }

    function getTraitLabel(element) {
            if (element === principalTrait.name) return principalTrait.description;
            if (element === ascendantTrait.name) return ascendantTrait.description;
            if (element === neutralTrait.name) return neutralTrait.description;
            if (element === oppositeTrait.name) return oppositeTrait.description;
        return '';
    }

    return (
        <div className={cspanelKit.csMainPanel}>
            <div className={cspanelKit.characterAvatar}>
                <img
                    src={avatarDefault}
                    className={imageKit.yourAvatar}
                    alt='Avatar de votre personnage'
                />
            </div>
            <div className={cspanelKit.characterInfo}>
                <h2 className={titleKit.avatarName}>{characterName}</h2>
                <p className={policeKit.avatarInfoPolice}>{characterAge} ans</p>
                <p className={policeKit.avatarInfoPolice}>{harmonistereType}{benderSelect}</p>
                <p className={policeKit.avatarInfoPolice}>Niveau {powerLevel}</p>
            </div>
            <div className={circleKit.characterCircle}>
                <div className={`${circleKit.quarter} ${circleKit.quarterTop}`} style={{backgroundColor: getTraitClass('Air')}}>
                    <div className={circleKit.quarterContentTop}>
                        <h4 className={policeKit.avatarPersonnalityTitlePolice}>Air</h4>
                        <p className={policeKit.avatarPersonnalityPolice}>{getTraitLabel('Air')}</p>
                        <img src={airIcon} className={imageKit.iconElement} alt="Icône de l'élément Air"/>
                    </div>
                </div>
                <div className={`${circleKit.quarter} ${circleKit.quarterRight}`} style={{backgroundColor: getTraitClass('Eau')}}>
                    <div className={circleKit.quarterContentRight}>
                        <h4 className={policeKit.avatarPersonnalityTitlePolice}>Eau</h4>
                        <p className={policeKit.avatarPersonnalityPolice}>{getTraitLabel('Eau')}</p>
                        <img src={waterIcon} className={imageKit.iconElement} alt="Icône de l'élément Eau"/>
                    </div>
                </div>
                <div className={`${circleKit.quarter} ${circleKit.quarterBottom}`} style={{backgroundColor: getTraitClass('Terre')}}>
                    <div className={circleKit.quarterContentBottom}>
                        <img src={earthIcon} className={imageKit.iconElement} alt="Icône de l'élément Terre"/>
                        <p className={policeKit.avatarPersonnalityPoliceInversed}>{getTraitLabel('Terre')}</p>
                        <h4 className={policeKit.avatarPersonnalityTitlePoliceInversed}>Terre</h4>

                    </div>
                </div>
                <div className={`${circleKit.quarter} ${circleKit.quarterLeft}`} style={{backgroundColor: getTraitClass('Feu')}}>
                    <div className={circleKit.quarterContentLeft}>
                        <h4 className={policeKit.avatarPersonnalityTitlePolice}>Feu</h4>
                        <p className={policeKit.avatarPersonnalityPolice}>{getTraitLabel('Feu')}</p>
                        <img src={fireIcon} className={imageKit.iconElement} alt="Icône de l'élément Feu"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CSMainPanel;