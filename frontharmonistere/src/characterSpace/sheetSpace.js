import React from 'react'
import CSMainPanel from './CSMainPanel';
import CSPanel from './CSPanel';
import RelationPanel from './relationPanel';
import FacultiesPanel from './facultiesPanel';
import AlterationPanel from './alterationPanel';
import CaracPanel from './caracPanel';
import { useCharacterContext } from '../hooks/CharacterContext';

function SheetSpace () {

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
        </div>

)}

export default SheetSpace;

   {/*              </div>
                <div id='CSPanelTwo'>
                    <CSPanel
                        titlePanel="Relations"
                        contentPanel={<RelationPanel
                        relation={falseDB}
                    />}
                        />
                </div>
                {areCaracsLoaded() && (
                <div id='CSPanelThreeFour'>
                    <div className='CSPanelMini'>
                        <CSPanel
                            titlePanel="Facultés"
                            contentPanel={<FacultiesPanel
                                focus={focus}
                                setFocus={setFocus}
                                breath={breath}
                                setBreath={setBreath}
                                onFocusChange={handleFocusChange}
                                onBreathChange={handleBreathChange}
                            />}
                        />
                    </div>
                    <div className='CSPanelMini'>
                        <CSPanel
                            titlePanel="Altérations"
                            contentPanel={<AlterationPanel/>} />
                    </div>
                </div>
                )}
                {areCaracsLoaded() && (
                <div id='CSPanelFive'>
                    <CSPanel
                        titlePanel="Attributs"
                        contentPanel={<CaracPanel
                            bodyLevel={characterOneBody}
                            setBodyLevel={setCharacterOneBody}
                            mindLevel={characterOneMind}
                            setMindLevel={setCharacterOneMind}
                            soulLevel={characterOneSoul}
                            setSoulLevel={setCharacterOneSoul}
                            martialArtsLevel={characterOneMartial}
                            setMartialArtsLevel={setCharacterOneMartial}
                            elementaryArtsLevel={characterOneElement}
                            setElementaryArtsLevel={setCharacterOneElement}
                            speakingLevel={characterOneSpeaking}
                            setSpeakingLevel={setCharacterOneSpeaking}
                            onStartInjurySelection={() => setIsSelectingInjury(!isSelectingInjury)}
                        />}
                        activablePanel={isSelectingInjury}/>
                </div>
                )}
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
                    {areCaracsLoaded() && (
                    <CSPanel
                        titlePanel="Manœuvre"
                        contentPanel={<ManoeuverModalPanel
                            bodyLevel={characterOneBody}
                            mindLevel={characterOneMind}
                            soulLevel={characterOneSoul}
                            martialArtsLevel={characterOneMartial}
                            elementaryArtsLevel={characterOneElement}
                            speakingLevel={characterOneSpeaking}
                            principalTrait={characterOnePrincipal}
                            ascendantTrait={characterOneAscendant}
                            neutralTrait={characterOneNeutral}
                            oppositeTrait={characterOneOpposite}
                            focus={focus}
                            setFocus={setFocus}
                            onFocusChange={handleFocusChange}
                        />}
                    />
                        )}
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
            )} */}