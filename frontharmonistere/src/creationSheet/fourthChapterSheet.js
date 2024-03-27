import React, { useState } from 'react'

function FourthChapterSheet ({onNotesSheet}) {

    const [specialSkills, setSpecialSkills] = useState('');

    function handleSkillsChange (e) {
        setSpecialSkills(e.target.value);
    }

    const [notes, setNotes] = useState('');

    function handleNotesChange (e) {
        setNotes(e.target.value);
    }

    const [physicDescription, setphysicDescription] = useState('');

    function handlePhysicChange (e) {
        setphysicDescription(e.target.value);
    }

    const [personnalityDescription, setPersonnalityDescription] = useState('');

    function handlePersonnalityChange (e) {
        setPersonnalityDescription(e.target.value);
    }

    const [history, setHistory] = useState('');

    function handleHistoryChange (e) {
        setHistory(e.target.value);
    }

    const handleNotesSelection = () => {
        onNotesSheet(specialSkills, notes, physicDescription, personnalityDescription, history);
    };


    return (
        <div id='textarea-group'>
            <div id='textareaSkills' className='textarea-fourth'>
                <p>Vos compétences :</p>
                <textarea
                    value={specialSkills}
                    onChange={handleSkillsChange}
                    placeholder='Ecrivez ici vos compétences'
                    cols={75}
                    rows={12}
                />
            </div>

            <div id='textareaNotes' className='textarea-fourth'>
                <p>Vos notes :</p>
                <textarea
                    value={notes}
                    onChange={handleNotesChange}
                    placeholder="C'est votre espace, écrivez ce que vous souhaitez dedans...
                    ce que vous souhaitez dedans..."
                    cols={75}
                    rows={12}
                />
            </div>

            <div id='textareaPhysic' className='textarea-fourth'>
                <p>Votre physique :</p>
                <textarea
                    value={physicDescription}
                    onChange={handlePhysicChange}
                    placeholder='Décrivez plus en détail le physique votre personnage'
                    cols={75}
                    rows={12}
                />
            </div>

            <div id='textareaPersonnality' className='textarea-fourth'>
                <p>Votre personnalité :</p>
                <textarea
                    value={personnalityDescription}
                    onChange={handlePersonnalityChange}
                    placeholder='Décrivez ici la personnalité de votre personnage ; cette partie sera cachée par défaut aux autres joueurs'
                    cols={75}
                    rows={12}
                />
            </div>

            <div id='textareaHistory' className='textarea-fourth'>
                <p>Votre histoire :</p>
                <textarea
                    value={history}
                    onChange={handleHistoryChange}
                    placeholder="Cet espace est réservé à l'histoire de votre personnage ; cette partie sera cachée par défaut aux autres joueurs"
                    cols={75}
                    rows={12}
                />
            </div>
            <button type='button' onClick={handleNotesSelection}>Confirmez vos écrits</button>
        </div>
    )
}

export default FourthChapterSheet;