import React from 'react';
import policeKit from '../style/modules/global/police.module.css';
import cspanelKit from '../style/modules/components/cspanel.module.css';
import imageKit from '../style/modules/global/image.module.css';
import injuredIcon from '../images/injured.png';

function CaracPanel ({
    bodyLevel,
    mindLevel,
    soulLevel,
    martialArtsLevel,
    elementaryArtsLevel,
    speakingLevel
    }) {

    function translationLevel(caracLevel) {
        const value = typeof caracLevel === 'string' ? caracLevel : String(caracLevel);

        let carac = "En attente"
        let backgroundColor = "#FFFFFF";
        switch (value) {
        case "-1":
            backgroundColor = "#D5D5D5";
            carac = "Malus";
            break;
        case "0":
            backgroundColor = "#F5DCAB";
            carac = "Neutre";
            break;
        case "1":
            backgroundColor = "#96DE9B";
            carac = "Bonus";
            break;
        case "2":
            backgroundColor = "#FFA6A6";
            carac = "Critique";
            break;
        default:
            backgroundColor = "#E0E0E0";
            carac = "Erreur";
            break;
        }

        return (
        <div className={cspanelKit.caracValueBackground} style={{ backgroundColor }}>
            <span className={policeKit.caracValuePolice}>{carac}</span>
        </div>
        );
    }

    function cellulPanelCreation(titleCarac, levelCarac, isInjuredOrNot, detailsCarac) {
        return (
        <div className={cspanelKit.cellulPanel}>
            <div className={cspanelKit.lineCellulPanel}>
            <div className={policeKit.relationLinePolice}>{titleCarac}</div>
            {translationLevel(levelCarac)}
            {isInjuredOrNot && (
                <img
                src={injuredIcon}
                className={imageKit.injuredIcon}
                alt="Icône blessé"
                />
            )}
            </div>
            <div className={`${cspanelKit.cellulDetailsPanel} ${policeKit.detailsCaracPanel}`}>
            {detailsCarac}
            </div>
        </div>
        );
    }

    return (
        <div className={cspanelKit.caracPanel}>
            <div className={cspanelKit.caracPanelMain}>
                <div className={cspanelKit.columnPanel}>
                    {cellulPanelCreation("Corps", bodyLevel, true, "Corps très musclé mais légèrement blessé.")}
                    {cellulPanelCreation("Esprit", mindLevel, false, "Grande concentration et volonté.")}
                    {cellulPanelCreation("Âme", soulLevel, false, "Grande concentration et volonté.")}
                </div>
                <div className={cspanelKit.columnPanel}>
                    {cellulPanelCreation("Martial", martialArtsLevel, false, "Bonnes bases techniques.")}
                    {cellulPanelCreation("Élémentaire", elementaryArtsLevel, true, "Maîtrise élémentaire moyenne.")}
                    {cellulPanelCreation("Rhétorique", speakingLevel, false, "Maîtrise rhétorique moyenne. Corps très musclé mais légèrement blessé. Corps très musclé mais légèrement blessé. Corps très musclé mais légèrement blessé.")}
                </div>
            </div>

            <hr className={cspanelKit.hrStyle}/>

            <div className={cspanelKit.caracPanelFooter}>
                <span className={policeKit.relationLinePolice}>Blessures :</span>
                <div>
                    <input type="checkbox"/>
                    <span className={policeKit.footerCaracPolice}>Légère 1</span>
                </div>
                <div>
                    <input type="checkbox"/>
                    <span className={policeKit.footerCaracPolice}>Légère 2</span>
                </div>
                <div>
                    <input type="checkbox"/>
                    <span className={policeKit.footerCaracPolice}>Légère 3</span>
                </div>
                <div>
                    <input type="checkbox"/>
                    <span className={policeKit.footerCaracPolice}>Grave</span>
                </div>
            </div>
        </div>
    );
    }

    export default CaracPanel;