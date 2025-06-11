import {React, useState} from 'react';
import policeKit from '../style/modules/global/police.module.css';
import cspanelKit from '../style/modules/components/cspanel.module.css';
import imageKit from '../style/modules/global/image.module.css';
import injuredIcon from '../images/injured.png';
import { useCharacterContext } from '../hooks/CharacterContext';

function CaracPanel () {

    const { characterData, isSelectingInjury, setIsSelectingInjury } = useCharacterContext();

    const [checkboxInjury, setCheckboxInjury] = useState (0);

    function onStartInjurySelection() {
        setIsSelectingInjury(!isSelectingInjury)
    }

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
            setIsSelectingInjury(true);
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

    function injuredNow (whatPanel, whatCheckbox) {
        whatPanel(prev => ({
            ...prev,
            isInjured: true,
            checkboxSelected: whatCheckbox
    }));
        onStartInjurySelection();
        setIsSelectingInjury(false);
    }

    function cellulPanelCreation(panelState, setPanelState, titleCarac, caracLevel, caracColor, isInjuredOrNot, detailsCarac) {

        const handleClick = () => {
            if (isSelectingInjury) {
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
            className={`${cspanelKit.cellulPanel} ${isSelectingInjury ? cspanelKit.cellulPanelHover : ''}`}
            onClick={handleClick}
        >
            <div className={cspanelKit.lineCellulPanel}>
                <div className={policeKit.relationLinePolice}>{titleCarac}</div>
                    <div className={cspanelKit.caracValueBackground} style={{ backgroundColor: caracColor }}>
                    <span className={policeKit.caracValuePolice}>{caracLevel}</span>
                </div>
                {isInjuredOrNot && (
                    <img
                    src={injuredIcon}
                    className={imageKit.injuredIcon}
                    alt="Icône blessé"
                    onClick={(e) => {
                        e.stopPropagation();
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
                    {cellulPanelCreation(cellulBody, setCellulBody, characterData.attributes.body.name, characterData.attributes.body.description, characterData.attributes.body.color, cellulBody.isInjured, "Corps très musclé mais légèrement blessé.")}
                    {cellulPanelCreation(cellulMind, setCellulMind, characterData.attributes.mind.name, characterData.attributes.mind.description, characterData.attributes.mind.color, cellulMind.isInjured, "Grande concentration et volonté.")}
                    {cellulPanelCreation(cellulSoul, setCellulSoul, characterData.attributes.soul.name, characterData.attributes.soul.description, characterData.attributes.soul.color, cellulSoul.isInjured, "Grande concentration et volonté.")}
                </div>
                <div className={cspanelKit.columnPanel}>
                    {cellulPanelCreation(cellulMartial, setCellulMartial, characterData.attributes.martial.name, characterData.attributes.martial.description, characterData.attributes.martial.color, cellulMartial.isInjured, "Bonnes bases techniques.")}
                    {cellulPanelCreation(cellulElementary, setCellulElementary, characterData.attributes.element.name, characterData.attributes.element.description, characterData.attributes.element.color, cellulElementary.isInjured, "Maîtrise élémentaire moyenne.")}
                    {cellulPanelCreation(cellulSpeaking, setCellulSpeaking, characterData.attributes.speaking.name, characterData.attributes.speaking.description, characterData.attributes.speaking.color, cellulSpeaking.isInjured, "Maîtrise rhétorique moyenne. Corps très musclé mais légèrement blessé. Corps très musclé mais légèrement blessé. Corps très musclé mais légèrement blessé.")}
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