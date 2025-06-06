import React, { createContext, useState, useEffect } from 'react';

export const CharacterContext = createContext(null);

export function CharacterProvider({ children, initialSheetData, id }) {
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

        setCharacterOneName(initialSheetData.characterName);
        setCharacterOneAge(initialSheetData.characterAge);
        setIsOneBender(initialSheetData.benderOrNot);
        setCharacterOneBender(initialSheetData.benderSelect);

        setCharacterOnePrincipal(prev => ({ ...prev, name: initialSheetData.principalTrait }));
        setCharacterOneAscendant(prev => ({ ...prev, name: initialSheetData.ascendantTrait }));
        setCharacterOneNeutral(prev => ({ ...prev, name: initialSheetData.neutralTrait }));
        setCharacterOneOpposite(prev => ({ ...prev, name: initialSheetData.oppositeTrait }));

        setSpecialSkills(initialSheetData.skills);
        setNotes(initialSheetData.notes);
        setPhysicalDescription(initialSheetData.physicDescription);
        setPersonnalityDescription(initialSheetData.mentalDescription);
        setStoryCharacter(initialSheetData.story);
        setPowerLevel(initialSheetData.powerLevel);

        setCarac(setCharacterOneBody, initialSheetData.bodyLevel, "Corps");
        setCarac(setCharacterOneMind, initialSheetData.mindLevel, "Esprit");
        setCarac(setCharacterOneSoul, initialSheetData.soulLevel, "Âme");
        setCarac(setCharacterOneMartial, initialSheetData.martialArtsLevel, "Martial");
        setCarac(setCharacterOneElement, initialSheetData.elementaryArtsLevel, "Elément");
        setCarac(setCharacterOneSpeaking, initialSheetData.speakingLevel, "Rhétorique");

        setInjuries(initialSheetData.injuries);

    }, [initialSheetData]);

    // Fonction d'interprétation (tu peux l'extraire si tu préfères)
    function interpretLevel(value) {
        switch (String(value)) {
        case "-1": return { description: "Malus", color: "#D5D5D5" };
        case "0": return { description: "Neutre", color: "#F5DCAB" };
        case "1": return { description: "Bonus", color: "#96DE9B" };
        case "2": return { description: "Critique", color: "#FFA6A6" };
        default: return { description: "Inconnu", color: "#E0E0E0" };
        }
    }

    function setCarac(setter, value, caracName) {
        if (value !== undefined) {
        const interpreted = interpretLevel(value);
        setter({
            name: caracName,
            value,
            description: interpreted.description,
            color: interpreted.color
        });
        }
    }

    // Contexte value à partager
    const contextValue = {
        characterOneName, setCharacterOneName,
        characterOneAge, setCharacterOneAge,
        isOneBender, setIsOneBender,
        characterOneBender, setCharacterOneBender,
        characterOnePrincipal, setCharacterOnePrincipal,
        characterOneAscendant, setCharacterOneAscendant,
        characterOneNeutral, setCharacterOneNeutral,
        characterOneOpposite, setCharacterOneOpposite,
        characterOneBody, setCharacterOneBody,
        characterOneMind, setCharacterOneMind,
        characterOneSoul, setCharacterOneSoul,
        characterOneMartial, setCharacterOneMartial,
        characterOneElement, setCharacterOneElement,
        characterOneSpeaking, setCharacterOneSpeaking,
        specialSkills, setSpecialSkills,
        notes, setNotes,
        physicalDescription, setPhysicalDescription,
        personnalityDescription, setPersonnalityDescription,
        storyCharacter, setStoryCharacter,
        powerLevel, setPowerLevel,
        focus, setFocus,
        breath, setBreath,
        injuries, setInjuries,
    };

    return (
        <CharacterContext.Provider value={contextValue}>
            {children}
        </CharacterContext.Provider>
    );
}