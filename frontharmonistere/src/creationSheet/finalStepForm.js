import React from 'react';
import kit from '../style/kitUI.module.css';

const FinalStepForm = ({formData, onFinalSubmit, previousStep, buttonSize}) => {
  return (

    <div id='fifthChapter'>
        <p>Vous êtes sur le point de créer votre fiche.</p>
        <p>Pressez le bouton pour finaliser</p>
        <button type='button' onClick={() => previousStep()}>Retour</button>
        <button type='button' onClick={() => onFinalSubmit(formData)}>Valider</button>

        </div>
  )
}

export default FinalStepForm;