import React from 'react';
import cspanelstyle from '../style/modules/components/cspanel.module.css';

function CSPanel ({titlePanel, contentPanel}) {

    return (
        <div className={cspanelstyle.csPanelStyle}>
            <div className={cspanelstyle.csPanelHeader}>
                <p>{titlePanel}</p>
            </div>
            <div className={cspanelstyle.csPanelMain}>
                <h3>{contentPanel}</h3>
            </div>
        </div>
    )
}

export default CSPanel;