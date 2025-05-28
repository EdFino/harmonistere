import React from 'react';
import { useState, useEffect } from 'react';
import cspanelKit from '../style/modules/components/cspanel.module.css';
import policeKit from '../style/modules/global/police.module.css';
import imageKit from '../style/modules/global/image.module.css';

function FacultiesPanel ({breath, setBreath, focus, setFocus, onValuesChange}) {

    const [breathNumber, setBreathNumber] = useState(breath);

    const [focusNumber, setFocusNumber] = useState(focus);

    const [synergyNumber, setSynergyNumber] = useState(0);

    useEffect(() => {
        localStorage.setItem('breath', breathNumber);
    }, [breathNumber]);

    useEffect(() => {
        localStorage.setItem('focus', focusNumber);
    }, [focusNumber]);

    useEffect(() => {
        localStorage.setItem('synergy', synergyNumber);
    }, [synergyNumber]);

    useEffect(() => {
        if (onValuesChange) {
            onValuesChange({
                breath: breathNumber,
                focus: focusNumber,
                synergy: synergyNumber
            });
        }
    }, [breathNumber, focusNumber, synergyNumber, onValuesChange]);


    function changeFaculties (value, setValue, maxValue) {
        return (
            <div className={cspanelKit.numberFaculties}>
                <span
                    className={
                    value === 0
                        ? `${policeKit.iconNumber} ${policeKit.iconNumberLimit}`
                        : `${policeKit.iconNumber} ${policeKit.iconNumberModifiable}`
                    }       
                    onClick={() => setValue(prev => Math.max(0, prev - 1))}
                >
                        −
                    </span>
                    <span className={policeKit.alignCenter}>
                        {value}
                    </span>
                    <span
                        className={
                            value === maxValue
                            ? `${policeKit.iconNumber} ${policeKit.iconNumberLimit}`
                            : `${policeKit.iconNumber} ${policeKit.iconNumberModifiable}`
                        }
                        onClick={() => setValue(prev => Math.min(maxValue, prev + 1))}>
                            +
                    </span>
            </div>
        )
    }


    return (
        <div className={`${cspanelKit.miniPanel} ${policeKit.relationLinePolice}`}>
            <div className={cspanelKit.facultiesInfo}>
                <div className={cspanelKit.facultiesLine}>
                    <p>Souffle</p>
                    {changeFaculties(breathNumber, setBreathNumber, 4)}
                </div>
                <p className={policeKit.lessOpaquePolice}>Max 4</p>
            </div>
            <div className={cspanelKit.facultiesInfo}>
                <div className={cspanelKit.facultiesLine}>
                    <p>Focus</p>
                    {changeFaculties(focusNumber, setFocusNumber, 10)}
                </div>
                <p className={policeKit.lessOpaquePolice}>Base 0</p>
            </div>
            <div className={cspanelKit.facultiesInfo}>
                <div className={cspanelKit.facultiesLine}>
                    <p>Synergie</p>
                    {changeFaculties(synergyNumber, setSynergyNumber, 7)}
                </div>
                <p className={policeKit.lessOpaquePolice}>Base 7</p>
            </div>
        </div>
    )
}

export default FacultiesPanel;