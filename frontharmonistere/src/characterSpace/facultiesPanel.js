import React from 'react';
import { useState, useEffect } from 'react';
import cspanelKit from '../style/modules/components/cspanel.module.css';
import policeKit from '../style/modules/global/police.module.css';
import imageKit from '../style/modules/global/image.module.css';
import { useCharacterContext } from '../hooks/CharacterContext';

function FacultiesPanel() {

    const { focus, setFocus, breath, setBreath } = useCharacterContext();

    const handleChange = (type, delta, max) => {

        const currentValue = type === 'breath' ? breath : focus;
        const newValue = Math.min(Math.max(currentValue + delta, 0), max);

        if (type === 'focus') {
            setFocus(newValue)
        } else if (type === 'breath') {
            setBreath(newValue)
        }
    };


    const renderCounter = (label, value, type, max) => (
        <div className={cspanelKit.facultiesLine}>
            <p>{label}</p>
            <div className={cspanelKit.numberFaculties}>
                <span
                    className={value === 0 ? `${policeKit.iconNumber} ${policeKit.iconNumberLimit}` : `${policeKit.iconNumber} ${policeKit.iconNumberModifiable}`}
                    onClick={() => handleChange(type, -1, max)}
                >
                    −
                </span>
                <span className={policeKit.alignCenter}>{value}</span>
                <span
                    className={value === max ? `${policeKit.iconNumber} ${policeKit.iconNumberLimit}` : `${policeKit.iconNumber} ${policeKit.iconNumberModifiable}`}
                    onClick={() => handleChange(type, 1, max)}
                >
                    +
                </span>
            </div>
        </div>
    );

    return (
        <div className={`${cspanelKit.miniPanel} ${policeKit.relationLinePolice}`}>
            <div className={cspanelKit.facultiesInfo}>
                {renderCounter("Souffle", breath, "breath", 4)}
                <p className={policeKit.lessOpaquePolice}>Max 4</p>
            </div>
            <div className={cspanelKit.facultiesInfo}>
                {renderCounter("Focus", focus, "focus", 10)}
                <p className={policeKit.lessOpaquePolice}>Base 0</p>
            </div>
        </div>
    );
}


export default FacultiesPanel;