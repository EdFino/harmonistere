import React from 'react';
import { useCharacterContext } from '../hooks/CharacterContext';

function UpdatingOverlay () {

    const { isSelectingInjury } = useCharacterContext();

    if (!isSelectingInjury) return null;

    return <div className="overlay" />;
};

export default UpdatingOverlay;