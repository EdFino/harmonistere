import React from 'react';
import cspanelKit from '../style/modules/components/cspanel.module.css';
import policeKit from '../style/modules/global/police.module.css';
import imageKit from '../style/modules/global/image.module.css';
import loupe from '../images/loupe.png';

function RelationPanel ({relation}) {

    return (

        <div className={cspanelKit.scrollPading}>

        <div className={cspanelKit.relationPanel}>

            {relation.map((person, index) => (
                <div className={cspanelKit.scrollWrapper}>
                    <div key={index} className={cspanelKit.relationLine}>
                        <p className={policeKit.relationLinePolice}>{person.name}</p>
                        <p className={policeKit.relationshipPolice}>{person.relationShip}</p>
                        <img src={loupe} className={imageKit.loupeRelation} alt='Icône de recherche'/>
                    </div>
                    {index !== relation.length - 1 && (
                    <hr className={cspanelKit.hrStyle} />
        )}
                </div>
            ))}

        </div>
        </div>
    )
}

export default RelationPanel