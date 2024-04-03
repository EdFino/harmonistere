import React, { useState } from 'react';

const DiceLauncher = () => {
  const [selectedDice, setSelectedDice] = useState([]);
  const [results, setResults] = useState([]);
  const [summary, setSummary] = useState('');

  const addDie = (sides) => {
    if (selectedDice.length >= 3) {
      // Ajoutez une logique pour gérer le cas où trop de dés sont sélectionnés
      return;
    }

    let dieName;
    switch (sides) {
      case 6:
        dieName = 'Malus';
        break;
      case 8:
        dieName = 'Neutre';
        break;
      case 10:
        dieName = 'Bonus';
        break;
      case 12:
        dieName = 'Critique';
        break;
      default:
        dieName = 'Inconnu'; // Au cas où
        break;
    }

    setSelectedDice([...selectedDice, dieName]);
  };

  const rollDice = () => {
    const rollResults = selectedDice.map((dieName) => {
      switch (dieName) {
        case 'Malus':
          return Math.ceil(Math.random() * 6);
        case 'Neutre':
          return Math.ceil(Math.random() * 8);
        case 'Bonus':
          return Math.ceil(Math.random() * 10);
        case 'Critique':
          return Math.ceil(Math.random() * 12);
        default:
          return 0; // Cas par défaut si nécessaire
      }
    });

    setResults(rollResults);
    calculateOutcome(rollResults);
  };

  const resetDice = () => {
    setSelectedDice([]);
    setResults([]);
    setSummary('');
  };

  const calculateOutcome = (rollResults) => {
    const successes = rollResults.filter((result, index) => {
      return selectedDice[index] === 'Malus' ? result === 6 : result >= 7;
    }).length;

    const failures = rollResults.filter((result) => result <= 3).length;

    const successIcons = Array(successes).fill(
      <img src="dés/coche.png" alt="Réussite" className="success-icon" />
    );

    const failureIcons = Array(failures).fill(
      <img src="dés/fermer.png" alt="Échec" className="failure-icon" />
    );

    setSummary(
      <div>
        {successIcons}
        {failureIcons}
        <p>Réussites: {successes}, Échecs: {failures}</p>
      </div>
    );
  };

  return (
    <div>
      <button onClick={() => addDie(6)}>Ajouter un dé Malus</button>
      <button onClick={() => addDie(8)}>Ajouter un dé Neutre</button>
      <button onClick={() => addDie(10)}>Ajouter un dé Bonus</button>
      <button onClick={() => addDie(12)}>Ajouter un dé Critique</button>
      <br />
      <button onClick={rollDice}>Lancer les dés</button>
      <button onClick={resetDice}>Réinitialiser les dés</button>
      <p>Dés sélectionnés: {selectedDice.join(', ')}</p>
      <p>Résultats: {results.join(', ')}</p>
      <div id="summary">{summary}</div>
    </div>
  );
};

export default DiceLauncher;