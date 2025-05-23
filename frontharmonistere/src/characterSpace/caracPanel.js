import {React, useState} from 'react';
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
    speakingLevel,
    onStartInjurySelection,
    }) {

    const [injurySelection, setInjurySelection] = useState (false);

    const [checkboxInjury, setCheckboxInjury] = useState (0);

    const [checkboxes, setCheckboxes] = useState({
        1: false,
        2: false,
        3: false
    });

    const [cellulBody, setCellulBody] = useState ({
        isInjured: false,
        checkboxSelected: 0
    })
    const [cellulMind, setCellulMind] = useState ({
        isInjured: false,
        checkboxSelected: 0
    })
    const [cellulSoul, setCellulSoul] = useState ({
        isInjured: false,
        checkboxSelected: 0
    })
    const [cellulMartial, setCellulMartial] = useState ({
        isInjured: false,
        checkboxSelected: 0
    })
    const [cellulElementary, setCellulElementary] = useState ({
        isInjured: false,
        checkboxSelected: 0
    })
    const [cellulSpeaking, setCellulSpeaking] = useState ({
        isInjured: false,
        checkboxSelected: 0
    })

    const handleCheckboxChange = (e, numberCheckbox) => {
        const checked = e.target.checked;

        if (checked) {
            setCheckboxes(prev => ({
                ...prev,
                [numberCheckbox]: checked
            }));
            onStartInjurySelection();
            setInjurySelection(true);
            setCheckboxInjury(numberCheckbox);
        } else {
            const updateIfMatch = (cellul, setCellul) => {
            if (cellul.checkboxSelected === numberCheckbox) {
                setCellul(prev => ({
                    ...prev,
                    isInjured: false,
                    checkboxSelected: 0
                }));
                setCheckboxes(prev => ({
                    ...prev,
                    [numberCheckbox]: false
            }));
            }
        };

        updateIfMatch(cellulBody, setCellulBody);
        updateIfMatch(cellulMind, setCellulMind);
        updateIfMatch(cellulSoul, setCellulSoul);
        updateIfMatch(cellulMartial, setCellulMartial);
        updateIfMatch(cellulElementary, setCellulElementary);
        updateIfMatch(cellulSpeaking, setCellulSpeaking);
        }
    };

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

    function injuredNow (whatPanel, whatCheckbox) {
        whatPanel(prev => ({
            ...prev,
            isInjured: true,
            checkboxSelected: whatCheckbox
    }));
        onStartInjurySelection();
        setInjurySelection(false);
    }

    function cellulPanelCreation(panelState, setPanelState, titleCarac, levelCarac, isInjuredOrNot, detailsCarac) {

        const handleClick = () => {
            if (injurySelection) {
                injuredNow(setPanelState, checkboxInjury);
            }
        };

        const handleRemoveInjury = (panelState, setPanelState) => {
            const checkboxId = panelState.checkboxSelected;

            if (checkboxId === 0) return;

            setCheckboxes(prev => ({
                ...prev,
                [checkboxId]: false
            }));

            setPanelState(prev => ({
                ...prev,
                isInjured: false,
                checkboxSelected: 0
            }));
        };

        return (
        <div
            className={`${cspanelKit.cellulPanel} ${injurySelection ? cspanelKit.cellulPanelHover : ''}`}
            onClick={handleClick}
        >
            <div className={cspanelKit.lineCellulPanel}>
                <div className={policeKit.relationLinePolice}>{titleCarac}</div>
                {translationLevel(levelCarac)}
                {isInjuredOrNot && (
                    <img
                    src={injuredIcon}
                    className={imageKit.injuredIcon}
                    alt="Icône blessé"
                    onClick={(e) => {
                        e.stopPropagation(); // éviter de déclencher handleClick
                        handleRemoveInjury(panelState, setPanelState);
                    }}
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
                    {cellulPanelCreation(cellulBody, setCellulBody, "Corps", bodyLevel, cellulBody.isInjured, "Corps très musclé mais légèrement blessé.")}
                    {cellulPanelCreation(cellulMind, setCellulMind, "Esprit", mindLevel, cellulMind.isInjured, "Grande concentration et volonté.")}
                    {cellulPanelCreation(cellulSoul, setCellulSoul, "Âme", soulLevel, cellulSoul.isInjured, "Grande concentration et volonté.")}
                </div>
                <div className={cspanelKit.columnPanel}>
                    {cellulPanelCreation(cellulMartial, setCellulMartial, "Martial", martialArtsLevel, cellulMartial.isInjured, "Bonnes bases techniques.")}
                    {cellulPanelCreation(cellulElementary, setCellulElementary, "Élémentaire", elementaryArtsLevel, cellulElementary.isInjured, "Maîtrise élémentaire moyenne.")}
                    {cellulPanelCreation(cellulSpeaking, setCellulSpeaking, "Rhétorique", speakingLevel, cellulSpeaking.isInjured, "Maîtrise rhétorique moyenne. Corps très musclé mais légèrement blessé. Corps très musclé mais légèrement blessé. Corps très musclé mais légèrement blessé.")}
                </div>
            </div>

            <hr className={cspanelKit.hrStyle}/>

            <div className={cspanelKit.caracPanelFooter}>
                <span className={policeKit.relationLinePolice}>Blessures :</span>
                <div>
                    <input
                        id='checkBoxInjuryOne'
                        type="checkbox"
                        checked={checkboxes[1]}
                        onChange={(e) => handleCheckboxChange(e, 1)}/>
                    <span className={policeKit.footerCaracPolice}>Légère 1</span>
                </div>
                <div>
                    <input
                        id='checkBoxInjuryTwo'
                        type="checkbox"
                        checked={checkboxes[2]}
                        onChange={(e) => handleCheckboxChange(e, 2)}/>
                    <span className={policeKit.footerCaracPolice}>Légère 2</span>
                </div>
                <div>
                    <input
                        id='checkBoxInjuryThree'
                        type="checkbox"
                        checked={checkboxes[3]}
                        onChange={(e) => handleCheckboxChange(e, 3)}/>
                    <span className={policeKit.footerCaracPolice}>Légère 3</span>
                </div>
                <div>
                    <input id='checkBoxSeriousInjury' type="checkbox"/>
                    <span className={policeKit.footerCaracPolice}>Grave</span>
                </div>
            </div>
        </div>
    );
    }

    export default CaracPanel;