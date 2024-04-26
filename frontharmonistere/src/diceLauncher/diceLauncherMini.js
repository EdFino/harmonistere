import React, { useState, useEffect } from 'react';
import styles from '../style/kitUI.module.css';
import '../diceLauncher/diceLauncherMini.css';
import happyIcon from '../images/happy.png';
import sadIcon from '../images/sad.png';
import dMalus from '../images/dMalussvg.svg';
import dNeutre from '../images/dNeutresvg.svg';
import dBonus from '../images/dBonussvg.svg';
import dCritique from '../images/dCritiquesvg.svg';



const DiceLauncherMini = ({ sendResultsToSocket }) => {

  const [selectedDice, setSelectedDice] = useState([]);
  const [results, setResults] = useState([]);
  const [summary, setSummary] = useState('');

  const addDie = (sides) => {
    if (selectedDice.length >= 3) {
      // Ajoutez une logique pour gérer le cas où trop de dés sont sélectionnés
      return;
    }

    let dieInfo;
    switch (sides) {
      case 6:
        dieInfo = { name: 'Malus', icon: dMalus };
        break;
      case 8:
        dieInfo = { name: 'Neutre', icon: dNeutre };
        break;
      case 10:
        dieInfo = { name: 'Bonus', icon: dBonus }; // Ici, vous avez oublié de fermer l'accolade
        break;
      case 12:
        dieInfo = { name: 'Critique', icon: dCritique };
        break;
      default:
        dieInfo = { name: 'Inconnu', icon: '' };
        break;
    }
  

    setSelectedDice([...selectedDice, dieInfo]);
  };

  const rollDice = () => {
    const rollResults = selectedDice.map((die) => {  // `die` est maintenant un objet, pas juste un nom
      switch (die.name) {  // Utiliser `die.name` pour accéder au nom du dé
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
      <img src={happyIcon} alt="Réussite" className="success-icon" />
    );

    const failureIcons = Array(failures).fill(
      <img src={sadIcon} alt="Échec" className="failure-icon" />
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
      <p className={styles.selectedDice} id='selectedDices'>
       {selectedDice.map((die, index) => (
       <img key={index} src={die.icon} alt={die.name} className={`${index < selectedDice.length - 1 ? "dice-icon" : ""}`} />
       ))}
      </p>
      <div className={styles.rollReset}>
        <button className={styles.rollResetButton} onClick={rollDice} id='roll'>Lancer</button>
        <button className={styles.rollResetButton} onClick={resetDice} id='reset'>Réinitialiser</button>
      </div>                  
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