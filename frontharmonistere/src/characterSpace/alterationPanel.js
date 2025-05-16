import React from 'react';
import cspanelKit from '../style/modules/components/cspanel.module.css';
import policeKit from '../style/modules/global/police.module.css';
import imageKit from '../style/modules/global/image.module.css';
import { useState, useEffect } from 'react';

function AlterationPanel () {

    return (
        <div className={`${cspanelKit.miniPanel} ${policeKit.relationLinePolice}`}>
            <div className={cspanelKit.alterationInfo}>
                <div className={cspanelKit.alterationLine}>
                    <p>Blessures légères</p>
                </div>
                <p className={policeKit.lessOpaquePolice}>Aucune</p>
            </div>
            <div className={cspanelKit.alterationInfo}>
                <div className={cspanelKit.alterationLine}>
                    <p>Blessures graves</p>
                </div>
                <p className={policeKit.lessOpaquePolice}>Aucune</p>
            </div>
            <div className={cspanelKit.alterationInfo}>
                <div className={cspanelKit.alterationLine}>
                    <p>Trauma</p>
                </div>
                <p className={policeKit.lessOpaquePolice}>Aucun</p>
            </div>
        </div>
    )
}

export default AlterationPanel;