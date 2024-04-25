import React, { useState, useEffect } from 'react';
import styles from '../style/kitUI.module.css';
import '../diceLauncher/diceLauncherMini.css';



const DiceLauncherMini = ({ sendResultsToSocket }) => {

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

  const element = document.querySelector('.centerComponent'); // S'assurez que cela cible le conteneur racine correct
    element.classList.add('diceShake');
    setTimeout(() => {
      element.classList.remove('diceShake');
    }, 800);
    
    setTimeout(() => {
      element.classList.remove('diceShake');
  
      // Mettre à jour les résultats après que l'animation soit terminée
      setResults(rollResults);
      calculateOutcome(rollResults);
  
      const successes = rollResults.filter((result, index) => {
        return selectedDice[index] === 'Malus' ? result === 6 : result >= 7;
      }).length;
  
      const failures = rollResults.filter((result) => result <= 3).length;
  
      if (typeof sendResultsToSocket === 'function') {
        const diceResults = {
          results: rollResults,
          successes: successes,
          failures: failures
        };
        sendResultsToSocket(diceResults);
      }
  
    }, 800);
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

    setSummary({
      successIcons,
      failureIcons,                     
      successes,
      failures
    });
  };


  return (
    <div className={`${styles.centerComponent} centerComponent`}>
      <div className={styles.dices} id='dices'>
        <button className={styles.diceButton} onClick={() => addDie(6)} id='malus'>Malus</button>
        <button className={styles.diceButton} onClick={() => addDie(8)} id='neutre'>Neutre</button>
        <button className={styles.diceButton} onClick={() => addDie(10)} id='bonus'>Bonus</button>
        <button className={styles.diceButton} onClick={() => addDie(12)} id='critique'>Critique</button>
      </div>
      <br />
      <p className={styles.selectedDice} id='selectedDices'>
       {selectedDice.map((die, index) => (
         <span className={index < selectedDice.length - 1 ? "dice-text" : ""} key={index}>
          {die}
         </span>
        ))}
      </p>
      <div className={styles.rollReset}>
        <button className={styles.rollResetButton} onClick={rollDice} id='roll'>Lancer</button>
        <button className={styles.rollResetButton} onClick={resetDice} id='reset'>Réinitialiser</button>
      </div>                  
      <br />
      
      
      <>
      <div className={styles.successFailureDiv}>
        <p className={styles.successFailureText}>Résultat :</p>
        <span className={styles.successIcons}>{summary.successIcons}</span>
        <span className={styles.failureIcons}>{summary.failureIcons}</span>
      </div>
      </>
    </div>
  );
};

export default DiceLauncherMini; 