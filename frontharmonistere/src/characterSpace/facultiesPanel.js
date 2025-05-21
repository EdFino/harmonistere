import React from 'react';
import { useState, useEffect } from 'react';
import cspanelKit from '../style/modules/components/cspanel.module.css';
import policeKit from '../style/modules/global/police.module.css';
import imageKit from '../style/modules/global/image.module.css';

function FacultiesPanel () {

const [stamina, setStamina] = useState(() => {
    const stored = localStorage.getItem('stamina');
    return stored !== null ? Number(stored) : 4;
});

const [focus, setFocus] = useState(() => {
    const stored = localStorage.getItem('focus');
    return stored !== null ? Number(stored) : 0;
});

const [synergy, setSynergy] = useState(() => {
    const stored = localStorage.getItem('synergy');
    return stored !== null ? Number(stored) : 7;
});

useEffect(() => {
    setStamina(Number(localStorage.getItem('stamina')) || 4);
    setFocus(Number(localStorage.getItem('focus')) || 0);
    setSynergy(Number(localStorage.getItem('synergy')) || 7);
}, []);


    useEffect(() => {
        localStorage.setItem('stamina', stamina);
    }, [stamina]);

    useEffect(() => {
        localStorage.setItem('focus', focus);
    }, [focus]);

    useEffect(() => {
        localStorage.setItem('synergy', synergy);
    }, [synergy]);


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
                    <p>Stamina</p>
                    {changeFaculties(stamina, setStamina, 4)}
                </div>
                <p className={policeKit.lessOpaquePolice}>Max 4</p>
            </div>
            <div className={cspanelKit.facultiesInfo}>
                <div className={cspanelKit.facultiesLine}>
                    <p>Focus</p>
                    {changeFaculties(focus, setFocus, 10)}
                </div>
                <p className={policeKit.lessOpaquePolice}>Base 0</p>
            </div>
            <div className={cspanelKit.facultiesInfo}>
                <div className={cspanelKit.facultiesLine}>
                    <p>Synergie</p>
                    {changeFaculties(synergy, setSynergy, 7)}
                </div>
                <p className={policeKit.lessOpaquePolice}>Base 7</p>
            </div>
        </div>
    )
}

export default FacultiesPanel