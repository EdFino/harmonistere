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
import { useCharacterContext } from '../hooks/CharacterContext';


function CSMainPanel () {

    const { characterData } = useCharacterContext();

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

    const harmonistereType = whatHarmonistereType(characterData.benderType);

        function getTraitClass(element) {
        if (element === characterData.traits.principal.name) return characterData.traits.principal.color;
        if (element === characterData.traits.ascendant.name) return characterData.traits.ascendant.color;
        if (element === characterData.traits.neutral.name) return characterData.traits.neutral.color;
        if (element === characterData.traits.opposite.name) return characterData.traits.opposite.color;
        return '';
    }

    function getTraitLabel(element) {
        if (element === characterData.traits.principal.name) return characterData.traits.principal.description;
        if (element === characterData.traits.ascendant.name) return characterData.traits.ascendant.description;
        if (element === characterData.traits.neutral.name) return characterData.traits.neutral.description;
        if (element === characterData.traits.opposite.name) return characterData.traits.opposite.description;
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
                <h2 className={titleKit.avatarName}>{characterData.name}</h2>
                <p className={policeKit.avatarInfoPolice}>{characterData.age} ans</p>
                <p className={policeKit.avatarInfoPolice}>{harmonistereType}{characterData.benderType}</p>
                <p className={policeKit.avatarInfoPolice}>Niveau {characterData.powerLevel}</p>
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