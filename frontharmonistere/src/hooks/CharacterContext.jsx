import React, { createContext, useContext, useState, useEffect } from 'react';

export const CharacterContext = createContext(null);

export function CharacterProvider({initialSheetData, id, children}) {

    const [isSelectingInjury, setIsSelectingInjury] = useState(false);

    const [characterData, setCharacterData] = useState({
        name: '',
        age: '',
        isBender: false,
        benderType: '',
        traits: {
            principal: { name: '', value: '2', description: 'Critique', color: '#FFA6A6' },
            ascendant: { name: '', value: '1', description: 'Bonus', color: '#96DE9B' },
            neutral: { name: '', value: '0', description: 'Neutre', color: '#F5DCAB' },
            opposite: { name: '', value: '-1', description: 'Malus', color: '#D5D5D5' }
        },
        attributes: {
            body: { name: '', value: '', description: '', color: '' },
            mind: { name: '', value: '', description: '', color: '' },
            soul: { name: '', value: '', description: '', color: '' },
            martial: { name: '', value: '', description: '', color: '' },
            element: { name: '', value: '', description: '', color: '' },
            speaking: { name: '', value: '', description: '', color: '' }
        },
        specialSkills: '',
        notes: '',
        descriptions: {
            physical: '',
            mental: '',
            story: ''
        },
        powerLevel: 0,
        injuries: []
    });

    const [focus, setFocus] = useState(() => {
        const stored = localStorage.getItem(`focus-${id}`);
        if (stored !== null && !isNaN(Number(stored))) return Number(stored);
        return initialSheetData?.focus ?? 0;
    });

    const [breath, setBreath] = useState(() => {
        const stored = localStorage.getItem(`breath-${id}`);
        if (stored !== null && !isNaN(Number(stored))) return Number(stored);
        return initialSheetData?.breath ?? 0;
    });

    // Synchroniser localStorage quand focus ou breath changent
    useEffect(() => {
        localStorage.setItem(`focus-${id}`, focus);
    }, [focus, id]);

    useEffect(() => {
        localStorage.setItem(`breath-${id}`, breath);
    }, [breath, id]);

    // Charger initial data dans les états dès que initialSheetData change
    useEffect(() => {
        if (!initialSheetData) return;

        setCharacterData(prev => ({
            ...prev,
            name: initialSheetData.characterName,
            age: initialSheetData.characterAge,
            isBender: initialSheetData.benderOrNot,
            benderType: initialSheetData.benderSelect,
            traits: {
                principal: {
                    ...prev.traits.principal,
                    name: initialSheetData.principalTrait
                },
                ascendant: {
                    ...prev.traits.ascendant,
                    name: initialSheetData.ascendantTrait
                },
                neutral: {
                    ...prev.traits.neutral,
                    name: initialSheetData.neutralTrait
                },
                opposite: {
                    ...prev.traits.opposite,
                    name: initialSheetData.oppositeTrait
                }
            },
            skills: initialSheetData.skills,
            notes: initialSheetData.notes,
            description: {
                physical: initialSheetData.physicDescription,
                mental: initialSheetData.mentalDescription,
                story: initialSheetData.story
            },
            powerLevel: initialSheetData.powerLevel,
            injuries: initialSheetData.injuries,
            attributes: {
                body: interpretCarac('Corps', initialSheetData.bodyLevel),
                mind: interpretCarac('Esprit', initialSheetData.mindLevel),
                soul: interpretCarac('Âme', initialSheetData.soulLevel),
                martial: interpretCarac('Martial', initialSheetData.martialArtsLevel),
                element: interpretCarac('Elément', initialSheetData.elementaryArtsLevel),
                speaking: interpretCarac('Rhétorique', initialSheetData.speakingLevel),
            }
        }));
    }, [initialSheetData]);

    function interpretLevel(value) {
        switch (String(value)) {
        case "-1": return { description: "Malus", color: "#D5D5D5" };
        case "0": return { description: "Neutre", color: "#F5DCAB" };
        case "1": return { description: "Bonus", color: "#96DE9B" };
        case "2": return { description: "Critique", color: "#FFA6A6" };
        default: return { description: "Inconnu", color: "#E0E0E0" };
        }
    }

    function interpretCarac(name, value) {
        const { description, color } = interpretLevel(value);
        return { name, value, description, color };
    }

    const contextValue = {
        characterData,
        setCharacterData,
        focus,
        setFocus,
        breath,
        setBreath,
        isSelectingInjury,
        setIsSelectingInjury
    };


    return (
        <CharacterContext.Provider value={contextValue}>
            {children}
        </CharacterContext.Provider>
    );
}

export const useCharacterContext = () => useContext(CharacterContext);