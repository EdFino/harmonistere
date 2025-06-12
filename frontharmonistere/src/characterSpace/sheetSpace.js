import {React, useState } from 'react'
import CSMainPanel from './CSMainPanel';
import CSPanel from './CSPanel';
import RelationPanel from './relationPanel';
import FacultiesPanel from './facultiesPanel';
import AlterationPanel from './alterationPanel';
import CaracPanel from './caracPanel';
import { useCharacterContext } from '../hooks/CharacterContext';
import manoeuverIcon from '../images/manoeuverIcon.png';
import diceIcon from '../images/diceIcon.png';
import Popup from 'reactjs-popup';
import modalKit from '../specialComponents/customModal';
import ManoeuverModalPanel from './manoeuverModalPanel';
import imageKit from '../style/modules/global/image.module.css';
import DiceLauncherMini from '../diceLauncher/diceLauncherMini';

function SheetSpace () {

    const [showModalManoeuver, setShowModalManoeuver] = useState(false);
    const [showModalDice, setShowModalDice] = useState(false);


    const { isSelectingInjury } = useCharacterContext();

            const falseDB = [{
            name: 'Arya',
            relationShip : 'Amitié'
        },
        {
            name: 'Finn',
            relationShip : 'Haine'
        },
        {
            name: 'Germain',
            relationShip : 'Indifférence'
        },        {
            name: 'Matth',
            relationShip : 'Amour'
        },        {
            name: 'Maria',
            relationShip : 'Amitié'
        },        {
            name: 'Seb',
            relationShip : 'Amitié'
        },        {
            name: 'Caliméro',
            relationShip : 'Indifférence'
        },        {
            name: 'Last but the Least',
            relationShip : 'Haine'
        },
    ]

    return (
        <div id='characterSpaceMain'>
            <div id='CSPanelOne'>
                    <CSMainPanel/>
            </div>
            <div id='CSPanelTwo'>
                <CSPanel
                    titlePanel="Relations"
                    contentPanel={<RelationPanel
                        relation={falseDB}
                    />}
                />
            </div>
            <div id='CSPanelThreeFour'>
                <div className='CSPanelMini'>
                    <CSPanel
                        titlePanel="Facultés"
                        contentPanel={<FacultiesPanel
                        />}
                    />
                </div>
                <div className='CSPanelMini'>
                    <CSPanel
                        titlePanel="Altérations"
                        contentPanel={<AlterationPanel/>} />
                </div>
            </div>
            <div id='CSPanelFive'>
                <CSPanel
                    titlePanel="Attributs"
                    contentPanel={<CaracPanel
                    />}
                    activablePanel={isSelectingInjury}/>
            </div>
                    <div className='absoluteDices'>
            <img
                src={manoeuverIcon}
                className={`${imageKit.absoluteIcons} ${imageKit.manoeuverIcon} ${showModalManoeuver ? imageKit.iconClicked : ''}`}
                alt='Icône de manoeuvre'
                onClick={() => {setShowModalManoeuver(true)}}
            />
                <img
                    src={diceIcon}
                    className={`${imageKit.absoluteIcons} ${imageKit.diceIcon} ${showModalDice ? imageKit.iconClicked : ''}`}
                    alt='Icône de lancer de dés libres'
                    onClick={() => {setShowModalDice(true)}}
                />
            </div>
            {showModalManoeuver && (
                <Popup
                    open={showModalManoeuver}
                    onClose={() => {setShowModalManoeuver(false)}}
                    contentStyle={{padding: '0', maxWidth: '50vw', maxHeight: '90vw'}}
                    modal
                    nested
                >
                    <CSPanel
                        titlePanel="Manœuvre"
                        contentPanel={<ManoeuverModalPanel
                        />}
                    />
                </Popup>
            )}
            {showModalDice && (
                <Popup
                    open={showModalDice}
                    onClose={() => {setShowModalDice(false)}}
                    contentStyle={{padding: '0', maxWidth: '50vw'}}
                    modal
                    nested
                >
                    <CSPanel
                        titlePanel="Lanceur de dés"
                        contentPanel={<DiceLauncherMini/>} />
                </Popup>
            )}
        </div>

)}

export default SheetSpace;