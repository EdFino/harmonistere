import React, { useState} from 'react'
import './accountCreation.css';
import Navbar from '../navbar/navbar';
import harmonistereCharacter from '../images/harmonistereCharacter.jpg';
import harmonistereCharacterTwo from '../images/harmonistereCharacter2.jpg';

function AccountCreation () {

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target)
    formData.append('gender', selectedGender);
    console.log (formData);
  };

  const [selectedGender, setSelectedGender] = useState('');

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };


    return (
      <div id="accountCreationTotal">
        <div className='columnContainerCharacter'>
        {  <img src={harmonistereCharacter} alt="Harmonistère à la gauche de l'écran" className="characterColumnImg" /> }
        </div>
    
        <div id="contenuAccountCreation">
          <Navbar width="50%" />
          <h1 id="accountCreationTitle">Formulaire de création de compte</h1>
          <div id="AccountForm">
            <form onSubmit={handleSubmit}>
              <label htmlFor='pseudoPlayer'>Votre pseudo : </label>
              <input type='text' id='pseudoPlayer' name='pseudo' /><br/>
              <label htmlFor='agePlayer'>Votre âge : </label>
              <input type='text' id='agePlayer' name='age' /><br/>
              <label htmlFor="genderSelect">Votre genre : </label>
              <select id="genderSelect" value={selectedGender} onChange={handleGenderChange}>
                <option value="">Sélectionnez votre genre</option>
                <option value="female">Femme</option>
                <option value="male">Homme</option>
                <option value="other">Autre</option>
              </select><br/>
              <label htmlFor='emailCreation'>Votre email : </label>
              <input type='email' id='emailCreation' name='email' /><br/>
              <label htmlFor='passwordCreation'>Votre mot de passe : </label>
              <input type='password' id='passwordCreation' name='password' /><br/>
                <label htmlFor='passwordCreationConfirm'>Veuillez confirmer votre mot de passe : </label>
                <input type='password' id='passwordCreationConfirm' name='passwordSecond' /><br/>
              <button type='submit'>Créer votre compte</button>
            </form>
          </div>
        </div>
    
        <div className='columnContainerCharacter'>
  {         <img src={harmonistereCharacterTwo} alt="Harmonistère d'eau à la droite de l'écran" className="characterColumnImg" />
  }      </div>
      </div>
    )
  }

export default AccountCreation;