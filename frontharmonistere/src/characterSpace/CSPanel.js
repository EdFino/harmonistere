import React from 'react';
import cspanelKit from '../style/modules/components/cspanel.module.css';

function CSPanel ({titlePanel, contentPanel, activablePanel}) {

    return (
        <div className={`${cspanelKit.csPanelStyle} ${activablePanel ? cspanelKit.interactivePanel : ""}`}>
            <div className={cspanelKit.csPanelHeader}>
                <p>{titlePanel}</p>
            </div>
            <div className={cspanelKit.csPanelMain}>
                {contentPanel}
            </div>
        </div>
    )
}

export default CSPanel;