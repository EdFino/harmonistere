import React from 'react'
import './accountCreation.css';
import Navbar from '../navbar/navbar';
import harmonistereCharacter from '../images/harmonistereCharacter.jpg';
import harmonistereCharacterTwo from '../images/harmonistereCharacter2.jpg';

function AccountCreation () {

    return (
<div id="accountCreationTotal">
      <div className='columnContainerCharacter'>
       {  <img src={harmonistereCharacter} alt="Harmonistère à la gauche de l'écran" className="characterColumnImg" /> }
      </div>
  
      <div id="contenuAccountCreation">
        <Navbar width="50%" />
        <h1 id="accountCreationTitle">Formulaire de création de compte</h1>
      </div>
  
      <div className='columnContainerCharacter'>
{         <img src={harmonistereCharacterTwo} alt="Harmonistère d'eau à la droite de l'écran" className="characterColumnImg" />
}      </div>
    </div>
  )
}

export default AccountCreation;