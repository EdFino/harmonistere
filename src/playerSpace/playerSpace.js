import React from 'react';
import Navbar from '../navbar/navbar';
import { Link } from 'react-router-dom';

function PlayerSpace () {
  return (
    <>
    <Navbar/>
    <h1>Votre espace</h1>
    <p>Allons dans l'espace fiche, imaginons que c'est beau ici et allons là = </p>
    <Link to={'/espacefiche'}><button>Votre première fiche : JD, le maître du feu</button></Link>
    </>
  )
}

export default PlayerSpace;