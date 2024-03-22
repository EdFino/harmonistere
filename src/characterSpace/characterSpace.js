import React from 'react';
import Navbar from '../navbar/navbar';

function CharacterSpace () {
  return (
    <>
    <Navbar/>
    <h1>Espace de votre personnage</h1>
    <div id='columnCRUD'>
      <p>Ici il y aura les valeurs pour modifier sa fiche</p>
    </div>
    <div id='CharacterSheetVisual'>
      <p>Ici, il y aura la fiche !</p>
    </div>
    <div id='columnPlay'>
      <p>Ici, nous aurons la seconde colonne avec les fonctions de la fiche</p></div>
    </>
  )
}

export default CharacterSpace