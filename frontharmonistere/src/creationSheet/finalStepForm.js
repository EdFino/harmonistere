import React from 'react';

const FinalStepForm = ({formData, onFinalSubmit, previousStep}) => {
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