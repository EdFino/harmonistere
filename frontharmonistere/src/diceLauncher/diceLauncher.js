import React, { useState } from 'react';
import Navbar from '../navbar/navbar';

function DiceLauncher() {
    const [selectedDice, setSelectedDice] = useState([]);
    const [results, setResults] = useState([]);
    const [summary, setSummary] = useState('');

    function addDie(sides) {
        setSelectedDice([...selectedDice, sides]);
    }

    function rollDice() {
        const results = selectedDice.map(sides => Math.ceil(Math.random() * sides));
        setResults(results);

        const successes = results.filter(result => result >= 7).length;
        const failures = results.filter(result => result <= 3).length;
        setSummary(`Réussites: ${successes}, Échecs: ${failures}`);
    }

    return (
        <>
            <Navbar />
            <div id="dice-selection">
                <button onClick={() => addDie(6)}>D6</button>
                <button onClick={() => addDie(8)}>D8</button>
                <button onClick={() => addDie(10)}>D10</button>
                <button onClick={() => addDie(12)}>D12</button>
            </div>
            <div id="selected-dice">
                Dés sélectionnés: {selectedDice.join(', ')}
            </div>
            <button onClick={rollDice}>Lancer</button>
            <div id="results">
                Résultats: {results.join(', ')}
            </div>
            <div id="summary">
                {summary}
            </div>
        </>
    );
}

export default DiceLauncher;
